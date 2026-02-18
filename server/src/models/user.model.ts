import { compare, genSalt, hash } from "bcrypt";
import crypto from "crypto";
import moment from "moment";
import { model, Schema } from "mongoose";
import { IUser } from "../types/userType";
import { generateToken } from "../utils/generateToken";
import { validation, validationMessage } from "../validators/schemaValidation";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        validation.USERNAME_MIN_LENGTH,
        validationMessage.USERNAME_MIN_LENGTH_MESSAGE,
      ],
      maxlength: [
        validation.USERNAME_MAX_LENGTH,
        validationMessage.USERNAME_MAX_LENGTH_MESSAGE,
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      match: [validation.EMAIL_REGEX, validationMessage.EMAIL_REGEX_MESSAGE],
    },
    password: {
      type: String,
      required: function (this: IUser): boolean {
        return this.provider === "local";
      },
      select: false,
      minlength: [
        validation.PASSWORD_MIN_LENGTH,
        validationMessage.PASSWORD_MIN_LENGTH_MESSAGE,
      ],
      match: [
        validation.PASSWORD_REGEX,
        validationMessage.PASSWORD_REGEX_MESSAGE,
      ],
    },
    avatar: {
      image_url: { type: String, match: /^https?:\/\//, default: undefined },
      public_id: { type: String, default: undefined },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: { type: Boolean, default: true },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      immutable: true,
    },
    refreshToken: { type: String, default: null, index: true, select: false },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false, default: undefined },
    verificationTokenExpires: { type: Date, select: false, default: undefined },
    passwordResetToken: { type: String, select: false, default: undefined },
    passwordResetExpires: { type: Date, select: false, default: undefined },
    lastActiveAt: Date,
    lastLogin: Date,
  },
  { timestamps: true },
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Password check method
userSchema.methods.isMatchPassword = async function (
  password: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await compare(password, this.password);
};

// Prevents { avatar: {} } in DB
userSchema.pre("save", function (next) {
  if (this.avatar && !this.avatar.image_url && !this.avatar.public_id) {
    this.avatar = undefined;
  }
  next();
});

// Set verification token
userSchema.methods.setVerificationToken = function () {
  const rawToken = generateToken();
  const token = crypto
    .createHash("sha256")
    .update(rawToken.trim())
    .digest("hex");
  this.verificationToken = token;
  this.verificationTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
  return rawToken;
};

// Set reset password token
userSchema.methods.setPasswordResetToken = function () {
  const rawToken = generateToken();
  const token = crypto
    .createHash("sha256")
    .update(rawToken.trim())
    .digest("hex");
  this.passwordResetToken = token;
  this.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
  return rawToken;
};

userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

userSchema.pre("save", function (next) {
  if (this.provider !== "local") {
    this.password = "";
  }
  next();
});

// Check if verification code is valid - deprecated
userSchema.methods.isValidVerificationToken = function (token: string) {
  if (!token) return false;
  const tokenExpires = !moment().isAfter(moment(this.verificationTokenExpires));
  console.log(this.verificationToken);
  console.log(this.verificationTokenExpires);
  return this.verificationToken === token && tokenExpires;
};

export const User = model<IUser>("User", userSchema);

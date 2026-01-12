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
      lowercase: true,
      match: [validation.EMAIL_REGEX, validationMessage.EMAIL_REGEX_MESSAGE],
    },
    password: {
      type: String,
      required: true,
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
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String, default: null, index: true, select: false },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false, default: undefined },
    verificationTokenExpires: { type: Date, select: false, default: undefined },
    lastLogin: Date,
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Password check method
userSchema.methods.isMatchPassword = async function (password: string) {
  return await compare(password, this.password);
};

// Set verification code
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

// Check if verification code is valid - deprecated
userSchema.methods.isValidVerificationToken = function (token: string) {
  if (!token) return false;
  const tokenExpires = !moment().isAfter(moment(this.verificationTokenExpires));
  console.log(this.verificationToken);
  console.log(this.verificationTokenExpires);
  return this.verificationToken === token && tokenExpires;
};

export const User = model<IUser>("User", userSchema);

import { compare, genSalt, hash } from "bcrypt";
import { model, Schema } from "mongoose";
import { IUser } from "../types/userType";
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
        validation.PASSWOED_REGEX,
        validationMessage.PASSWORD_REGEX_MESSAGE,
      ],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String, default: null, index: true, select: false },
    lastLogin: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.methods.isMatchPassword = async function (password: string) {
  return await compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);

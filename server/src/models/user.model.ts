import { compare, genSalt, hash } from "bcrypt";
import { model, Schema } from "mongoose";
import { validation, validationMessage } from "../config/schemaValidation";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, validationMessage.EMAIL_MESSAGE],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

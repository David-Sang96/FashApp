import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";

export class UserService {
  static async getUsers() {
    const users = await User.find().select("-__v");
    return users;
  }

  static async getUser(id: string) {
    const user = await User.findById(id).select("-__v");
    return user;
  }

  static async deleteUser(currentUser: IUser, password: string) {
    const user = await User.findOne({
      email: currentUser?.email,
      _id: currentUser?._id,
    }).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);

    user.active = false;
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
  }
}

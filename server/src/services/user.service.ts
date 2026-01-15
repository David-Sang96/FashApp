import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";

export class UserService {
  static async getUsers() {
    const users = await User.find({ active: true }).select("-__v");
    return users;
  }

  static async getUser(id: string) {
    const user = await User.findById(id).select("-__v");
    return user;
  }

  static async updateUser(name: string, currentUser: IUser) {
    const user = await User.findOne({
      email: currentUser.email,
      _id: currentUser._id,
    });
    if (!user) throw new AppError("User not found", 404);

    user.name = name;
    await user.save({ validateBeforeSave: false });

    return user;
  }
}

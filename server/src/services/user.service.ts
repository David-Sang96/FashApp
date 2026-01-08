import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";

export class UserService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("User already exists", 409);
    const newUser = await User.create({ name, email, password });
    return newUser;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AppError("Invalid credentials", 401);
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);
    return user;
  }

  static async getUsers() {
    const users = await User.find().select("-__v");
    return users;
  }

  static async getUser(id: string) {
    const user = await User.findById(id).select("-__v");
    return user;
  }
}

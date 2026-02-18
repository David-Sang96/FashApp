import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";

export class UserService {
  static async getUsers() {
    return await UserRepository.findAllUser();
  }

  static async getUser(id: string) {
    return await UserRepository.findByIdOrEmail({ id });
  }

  static async updateUser(
    name: string,
    email: string,
    role: "admin" | "user",
    currentUser: IUser,
  ) {
    const user = await UserRepository.findByIdOrEmail({
      email: currentUser.email,
      id: currentUser._id,
    });

    if (!user) throw new AppError("User not found", 404);

    user.name = name;
    user.email = email;
    user.role = role;
    await UserRepository.save(user);

    return user;
  }
}

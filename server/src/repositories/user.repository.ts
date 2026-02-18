import { Document, Types } from "mongoose";
import { User } from "../models/user.model";
import { IUser } from "../types/userType";
import { AppError } from "../utils/AppError";

export class UserRepository {
  static async findByIdOrEmail(params: {
    id?: string | Types.ObjectId;
    email?: string;
  }) {
    if (!params.id && !params.email) {
      throw new AppError("Either id or email must be provided", 400);
    }

    const query: Record<string, any> = {};

    if (params.id) query._id = params.id;
    if (params.email) query.email = params.email;

    return User.findOne(query).select("-__v").exec();
  }

  static async findAllUser() {
    return User.find().select("-__v");
  }

  static async save(user: IUser & Document) {
    ``;
    return user.save({ validateBeforeSave: false });
  }
}

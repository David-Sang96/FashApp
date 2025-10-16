export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  isMatchPassword(password: string): Promise<boolean>;
  lastLogin: Date;
}

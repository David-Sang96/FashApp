export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  active: boolean;
  avatarUrl?: string;
  emailVerified: boolean;
  provider: "local" | "google";
  lastLogin?: string;
  createdAt?: string;
}

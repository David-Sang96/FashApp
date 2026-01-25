import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  emailVerified: boolean;
  provider: "local" | "google";
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthState {
  userInfo: User | null;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      state.isCheckingAuth = false;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.isCheckingAuth = false;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;

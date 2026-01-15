import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  provider: "local" | "google";
  lastLogin?: string;
  createdAt?: string;
}

interface AuthState {
  userInfo: User | null;
  forceLogin: boolean;
  isCheckingAuth: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  forceLogin: false,
  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      state.forceLogin = false;
      state.isCheckingAuth = false;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.forceLogin = true;
      state.isCheckingAuth = false;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;

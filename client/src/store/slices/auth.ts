import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../types/user";

export interface AuthState {
  userInfo: UserInfo | null;
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
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
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

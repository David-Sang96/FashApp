import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  createdAt?: string;
}

interface AuthState {
  userInfo: User | null;
  forceLogin: boolean;
}

const initialState: AuthState = {
  userInfo: null,
  forceLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.forceLogin = true;
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;

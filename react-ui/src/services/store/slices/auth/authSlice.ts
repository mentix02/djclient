import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { LoginResponse } from "@/services/api/types/auth";

export interface AuthState {
  token?: string;
  username?: string;
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.auth_token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = undefined;
      state.username = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

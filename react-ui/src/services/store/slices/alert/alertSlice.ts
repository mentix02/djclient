import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum AlertType {
  Info = "info",
  Danger = "danger",
  Success = "success",
  Primary = "primary",
}

export type AlertMessage = {
  message: string;
  type: AlertType;
};

export interface AlertState {
  messages: AlertMessage[];
}

const initialState: AlertState = {
  messages: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertMessage>) => {
      state.messages.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.messages.splice(action.payload, 1);
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;

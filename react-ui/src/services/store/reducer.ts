import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import alertReducer from "./slices/alert/alertSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;

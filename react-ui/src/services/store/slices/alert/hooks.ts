import { useSelector } from "react-redux";

import { RootState } from "../..";
import { AlertMessage } from "./alertSlice";

export const useAlerts = (): AlertMessage[] =>
  useSelector((state: RootState) => state.alert.messages);

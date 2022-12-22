import { useSelector } from "react-redux";

import { RootState } from "../..";

export const useIsAuthenticated = (): boolean =>
  useSelector((state: RootState) => !!state.auth.token);

export const useUsername = (): string | undefined =>
  useSelector((state: RootState) => state.auth.username);

export const useToken = (): string | undefined =>
  useSelector((state: RootState) => state.auth.token);

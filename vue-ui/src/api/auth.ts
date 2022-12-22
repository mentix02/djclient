import configureEndpoint from "@/api/host";
import type {
  Credentials,
  LoginResponse,
  ValueFieldedForm,
  UserRegisterData,
  UserRegisterError,
  UsernameAvailableResponse,
} from "@/api/types/auth";

const BASE_URl = configureEndpoint("api/v1/user");

const valueFieldedFormToJSONString = (data: ValueFieldedForm): string => {
  return JSON.stringify(
    Object.entries(data).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.value }),
      {}
    )
  );
};

export const fetchLoginResponse = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  let response: Response;
  const body = valueFieldedFormToJSONString(credentials);

  try {
    response = await fetch(`${BASE_URl}/token/`, {
      body,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error("Network error");
  }

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json();
};

export const fetchUsernameAvailableResponse = async (
  username: string
): Promise<UsernameAvailableResponse> => {
  let response: Response;
  const urlParams = new URLSearchParams({ username });

  try {
    response = await fetch(`${BASE_URl}/available/?${urlParams.toString()}`);
  } catch (error) {
    throw new Error("Network error");
  }

  if (!response.ok) {
    throw new Error("Username not provided");
  }

  return await response.json();
};

export const fetchRegisterResponse = async (
  data: UserRegisterData
): Promise<LoginResponse> => {
  let resp_data: any;
  let response: Response;

  const body = valueFieldedFormToJSONString(data);

  try {
    response = await fetch(`${BASE_URl}/create/`, {
      body,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw new Error("Network error");
  }

  resp_data = await response.json();

  if (!response.ok) {
    throw resp_data as UserRegisterError;
  }

  return resp_data;
};

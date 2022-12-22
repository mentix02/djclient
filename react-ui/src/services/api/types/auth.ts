export type ValueField = {
  value: string;
  errors: string[];
};

export interface ValueFieldedForm {
  [key: string]: ValueField;
}

export interface Credentials extends ValueFieldedForm {
  username: ValueField;
  password: ValueField;
}

export type LoginResponse = {
  readonly username: string;
  readonly auth_token: string;
};

export type UsernameAvailableResponse = {
  readonly available: boolean;
};

export interface UserRegisterData extends ValueFieldedForm {
  email: ValueField;
  username: ValueField;
  password: ValueField;
  last_name: ValueField;
  first_name: ValueField;
}

export type UserRegisterResponse = {
  username: string;
  auth_token: string;
};

export type UserRegisterError = {
  [key in keyof UserRegisterData]?: string[];
};

export const isUserRegisterError = (error: any): error is UserRegisterError => {
  return (
    (!!error && "email" in error) ||
    "username" in error ||
    "password" in error ||
    "last_name" in error ||
    "first_name" in error
  );
};

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent, FocusEvent, ChangeEvent } from "react";

import BSInput from "@/components/BSInput";
import { login } from "@/services/store/slices/auth/authSlice";
import { isUserRegisterError } from "@/services/api/types/auth";
import type { UserRegisterData } from "@/services/api/types/auth";
import { useIsAuthenticated } from "@/services/store/slices/auth/hooks";
import { addAlert, AlertType } from "@/services/store/slices/alert/alertSlice";
import {
  fetchRegisterResponse,
  fetchUsernameAvailableResponse,
} from "@/services/api/auth";

export default function SignUpView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const [userData, setUserData] = useState<UserRegisterData>({
    email: { value: "", errors: [] },
    username: { value: "", errors: [] },
    password: { value: "", errors: [] },
    last_name: { value: "", errors: [] },
    first_name: { value: "", errors: [] },
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  const generateInputHandler =
    (key: keyof UserRegisterData) => (e: ChangeEvent<HTMLInputElement>) => {
      setUserData({
        ...userData,
        [key]: { value: e.target.value, errors: [] },
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reset errors for all fields to empty arrays
    Object.entries(userData).forEach(([key, value]) => {
      setUserData((prev) => ({
        ...prev,
        [key]: { ...value, errors: [] },
      }));
    });

    try {
      const response = await fetchRegisterResponse(userData);
      dispatch(login(response));
      navigate("/");
    } catch (e: any) {
      if (isUserRegisterError(e)) {
        // set errors for fields that have errors
        Object.entries(e).forEach(([key, value]) => {
          setUserData((prev) => ({
            ...prev,
            // @ts-ignore
            [key]: { ...prev[key], errors: value || [] },
          }));
        });
      } else {
        dispatch(addAlert({ message: e.message, type: AlertType.Danger }));
      }
    }
  };

  const handleUsernameBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const response = await fetchUsernameAvailableResponse(value);
    if (!response.available) {
      setUserData((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          errors: ["Username is already taken."],
        },
      }));
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-xl-6 offset-xl-3">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Sign Up</h1>
            <hr />
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-6 mb-3">
                <BSInput
                  autoFocus
                  id="firstName"
                  label="First Name"
                  value={userData.first_name}
                  onChange={generateInputHandler("first_name")}
                />
              </div>

              <div className="col-6 mb-3">
                <BSInput
                  id="lastName"
                  label="Last Name"
                  value={userData.last_name}
                  onChange={generateInputHandler("last_name")}
                />
              </div>

              <div className="col-12 mb-3">
                <BSInput
                  id="email"
                  type="email"
                  label="Email"
                  value={userData.email}
                  onChange={generateInputHandler("email")}
                />
              </div>

              <div className="col-12 mb-3">
                <BSInput
                  id="username"
                  label="Username"
                  value={userData.username}
                  onBlur={handleUsernameBlur}
                  onChange={generateInputHandler("username")}
                />
              </div>

              <div className="col-12 mb-3">
                <BSInput
                  id="password"
                  type="password"
                  label="Password"
                  value={userData.password}
                  onChange={generateInputHandler("password")}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

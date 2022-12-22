import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

import BSInput from "@/components/BSInput";
import { Credentials } from "@/services/api/types/auth";
import { fetchLoginResponse } from "@/services/api/auth";
import { login } from "@/services/store/slices/auth/authSlice";
import { useIsAuthenticated } from "@/services/store/slices/auth/hooks";
import { addAlert, AlertType } from "@/services/store/slices/alert/alertSlice";

export default function LoginView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [credentials, setCredentials] = useState<Credentials>({
    username: { value: "", errors: [] },
    password: { value: "", errors: [] },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const generateInputHandler =
    (key: keyof Credentials) => (e: ChangeEvent<HTMLInputElement>) => {
      setCredentials({
        ...credentials,
        [key]: { value: e.target.value, errors: [] },
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchLoginResponse(credentials);
      dispatch(login(response));
      navigate("/");
    } catch (e: any) {
      dispatch(addAlert({ message: e.message, type: AlertType.Danger }));
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-xl-6 offset-xl-3">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Sign In</h1>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <BSInput
                  autoFocus
                  id="username"
                  label="Username"
                  value={credentials.username}
                  onChange={generateInputHandler("username")}
                />
              </div>
              <div className="mb-3">
                <BSInput
                  id="password"
                  label="Password"
                  value={credentials.password}
                  onChange={generateInputHandler("password")}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, Outlet, NavLink } from "react-router-dom";

import "bootswatch/dist/yeti/bootstrap.min.css";

import { logout } from "@/services/store/slices/auth/authSlice";
import { useAlerts } from "@/services/store/slices/alert/hooks";
import { removeAlert } from "@/services/store/slices/alert/alertSlice";
import {
  useUsername,
  useIsAuthenticated,
} from "@/services/store/slices/auth/hooks";

export default function BaseLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alerts = useAlerts();
  const username = useUsername();
  const isAuthenticated = useIsAuthenticated();
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleAlertDismiss = (index: number) => {
    dispatch(removeAlert(index));
  };

  const handleNavbarToggle = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DjClient
          </Link>
          <button
            type="button"
            onClick={handleNavbarToggle}
            aria-label="Toggle navigation"
            aria-expanded={navbarExpanded ? "true" : "false"}
            className={`navbar-toggler ${!navbarExpanded && "collapsed"}`}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            onClick={handleNavbarToggle}
            className={`collapse navbar-collapse ${navbarExpanded && "show"}`}
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  home
                </NavLink>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    logout
                  </a>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {isAuthenticated && (
              <span className="navbar-text text-light">
                logged in as <b>{username}</b>
              </span>
            )}
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-xl-6 offset-xl-3">
            <br />
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`alert alert-dismissible alert-${alert.type}`}
              >
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => handleAlertDismiss(idx)}
                />
                {alert.message}
              </div>
            ))}
          </div>
        </div>
      </div>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

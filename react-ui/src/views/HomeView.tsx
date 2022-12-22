import { Link } from "react-router-dom";

import {
  useUsername,
  useIsAuthenticated,
} from "@/services/store/slices/auth/hooks";

export default function HomeView() {
  const username = useUsername();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="p-5 mb-4 bg-light text-dark rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Django &times; React</h1>
        <div className="col-xl-8 fs-4 my-3 py-2">
          DjClient is a full-stack web application built with Django and React.
          It uses the Django REST Framework to provide a RESTful API for the
          frontend, which is built with React and TypeScript.
          <hr />
          Includes a simple authentication system, with user registration,
          login, and logout.
        </div>
        {!isAuthenticated ? (
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started &rarr;
          </Link>
        ) : (
          <button className="btn btn-outline-primary btn-lg" disabled>
            Logged in as <b>{username}</b>
          </button>
        )}
      </div>
    </div>
  );
}

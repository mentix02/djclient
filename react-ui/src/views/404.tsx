import { Link } from "react-router-dom";

export default function FourOhFour() {
  return (
    <main>
      <br />
      <h1 className="text-center">404 - Page Not Found</h1>
      <hr />
      <div className="text-center">
        <Link to="/" className="btn btn-success btn-lg">
          Go Home
        </Link>
      </div>
    </main>
  );
}

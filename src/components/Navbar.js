import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        Car<span>Marketplace</span>
      </Link>
      <nav className="navbar__links">
        <Link to="/">Browse</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {user?.role === "admin" && <Link to="/admin">Admin</Link>}
            <span className="navbar__user">{user?.name}</span>
            <button className="navbar__logout" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="navbar__cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

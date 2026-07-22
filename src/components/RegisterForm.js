import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Create your account</h1>
      {error && <p className="form-error">{error}</p>}
      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      </label>
      <label>
        I want to
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Browse & buy cars</option>
          <option value="seller">Sell cars</option>
        </select>
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Creating account…" : "Sign up"}
      </button>
      <p className="auth-form__footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

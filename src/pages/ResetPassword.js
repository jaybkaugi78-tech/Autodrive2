import { useState } from "react";
import { api } from "../api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.resetPassword({ email });
      setStatus("If that email exists, a reset link has been sent.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page page--centered">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Reset password</h1>
        {status && <p className="form-success">{status}</p>}
        {error && <p className="form-error">{error}</p>}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Send reset link</button>
      </form>
    </section>
  );
}

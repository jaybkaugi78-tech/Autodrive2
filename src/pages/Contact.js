import { useState } from "react";
import { api } from "../api";

const ADMIN_EMAIL = "Jay@Autodrive.com";
const ADMIN_PHONE = "+254 712884341";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("");
    try {
      const res = await api.sendContactMessage(form);
      setStatus(res.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page page--centered" style={{ flexDirection: "column", gap: "24px" }}>
      <div className="auth-form" style={{ textAlign: "center" }}>
        <h1>Contact us</h1>
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>Reach us directly, or send a message below.</p>
        <p style={{ margin: "12px 0 4px" }}>
          <a href={`mailto:${ADMIN_EMAIL}`} style={{ color: "var(--lime)", fontWeight: 600 }}>{ADMIN_EMAIL}</a>
        </p>
        <p style={{ margin: 0 }}>
          <a href={`tel:${ADMIN_PHONE.replace(/\s/g, "")}`} style={{ color: "var(--lime)", fontWeight: 600 }}>{ADMIN_PHONE}</a>
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {status && <p className="form-success">{status}</p>}
        {error && <p className="form-error">{error}</p>}
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
        </label>
        <button type="submit">Send message</button>
      </form>
    </section>
  );
}
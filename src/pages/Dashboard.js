import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token, user } = useAuth();
  const isSeller = user?.role === "seller" || user?.role === "admin";
  const [form, setForm] = useState({ make: "", model: "", year: "", price: "", mileage: "", image_url: "" });
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
      await api.createCar(
        {
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
        },
        token
      );
      setStatus("Listing posted.");
      setForm({ make: "", model: "", year: "", price: "", mileage: "", image_url: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="page">
      <h1>Welcome back{user?.name ? `, ${user.name}` : ""}</h1>

      {isSeller ? (
        <>
          <h2>Post a car</h2>
          {status && <p className="form-success">{status}</p>}
          {error && <p className="form-error">{error}</p>}

          <form className="car-form" onSubmit={handleSubmit}>
            <label>
              Make
              <input name="make" value={form.make} onChange={handleChange} required />
            </label>
            <label>
              Model
              <input name="model" value={form.model} onChange={handleChange} required />
            </label>
            <label>
              Year
              <input name="year" type="number" value={form.year} onChange={handleChange} required />
            </label>
            <label>
              Price
              <input name="price" type="number" value={form.price} onChange={handleChange} required />
            </label>
            <label>
              Mileage
              <input name="mileage" type="number" value={form.mileage} onChange={handleChange} required />
            </label>
            <label>
              Photo URL
              <input name="image_url" type="url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
            </label>
            <button type="submit">Post listing</button>
          </form>
        </>
      ) : (
        <p className="empty-state">
          Your account is set up for browsing and favoriting cars. To post
          listings, register a seller account instead.
        </p>
      )}
    </section>
  );
}

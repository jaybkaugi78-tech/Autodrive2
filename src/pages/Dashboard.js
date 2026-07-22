import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token, user } = useAuth();
  const isSeller = user?.role === "seller" || user?.role === "admin";
  const emptyForm = {
    make: "", model: "", year: "", price: "", mileage: "", image_url: "",
    fuel_type: "", transmission: "", horsepower: "", engine: "", drivetrain: "",
    seats: "", zero_to_hundred: "", weight_kg: "", fuel_consumption: "", description: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toNullableNumber(value) {
    return value === "" ? null : Number(value);
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
          horsepower: toNullableNumber(form.horsepower),
          seats: toNullableNumber(form.seats),
          zero_to_hundred: toNullableNumber(form.zero_to_hundred),
          weight_kg: toNullableNumber(form.weight_kg),
          image_url: form.image_url || null,
          fuel_type: form.fuel_type || null,
          transmission: form.transmission || null,
          engine: form.engine || null,
          drivetrain: form.drivetrain || null,
          fuel_consumption: form.fuel_consumption || null,
          description: form.description || null,
        },
        token
      );
      setStatus("Listing posted.");
      setForm(emptyForm);
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

            <p className="car-form__divider">Specs (optional)</p>

            <div className="car-form__row">
              <label>
                Fuel type
                <select name="fuel_type" value={form.fuel_type} onChange={handleChange}>
                  <option value="">—</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </label>
              <label>
                Transmission
                <select name="transmission" value={form.transmission} onChange={handleChange}>
                  <option value="">—</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </label>
            </div>

            <div className="car-form__row">
              <label>
                Horsepower
                <input name="horsepower" type="number" value={form.horsepower} onChange={handleChange} />
              </label>
              <label>
                Seats
                <input name="seats" type="number" value={form.seats} onChange={handleChange} />
              </label>
            </div>

            <label>
              Engine
              <input name="engine" value={form.engine} onChange={handleChange} placeholder="e.g. 3.0L Twin-Turbo Inline-6" />
            </label>

            <div className="car-form__row">
              <label>
                Drivetrain
                <select name="drivetrain" value={form.drivetrain} onChange={handleChange}>
                  <option value="">—</option>
                  <option value="AWD">AWD</option>
                  <option value="RWD">RWD</option>
                  <option value="FWD">FWD</option>
                </select>
              </label>
              <label>
                0–100 km/h (sec)
                <input name="zero_to_hundred" type="number" step="0.1" value={form.zero_to_hundred} onChange={handleChange} />
              </label>
            </div>

            <div className="car-form__row">
              <label>
                Weight (kg)
                <input name="weight_kg" type="number" value={form.weight_kg} onChange={handleChange} />
              </label>
              <label>
                Fuel consumption
                <input name="fuel_consumption" value={form.fuel_consumption} onChange={handleChange} placeholder="e.g. 9.6L/100km" />
              </label>
            </div>

            <label>
              Description
              <textarea name="description" rows={3} value={form.description} onChange={handleChange} placeholder="A short pitch for this car…" />
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
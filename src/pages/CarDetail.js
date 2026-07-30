import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

function Spec({ label, value }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="spec-chip">
      <div className="spec-chip__value">{value}</div>
      <div className="spec-chip__label">{label}</div>
    </div>
  );
}

export default function CarDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [msgForm, setMsgForm] = useState({ name: "", email: "", message: "" });
  const [msgStatus, setMsgStatus] = useState("");

  useEffect(() => {
    api
      .getCar(id)
      .then(setCar)
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleFavorite() {
    try {
      await api.addFavorite(id, token);
      setFavorited(true);
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleFavorite() {
    try {
      await api.addFavorite(id, token);
      setFavorited(true);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    try {
      const res = await api.sendCarMessage(id, msgForm);
      setMsgStatus(res.message);
      setMsgForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p className="form-error" style={{ padding: "40px" }}>{error}</p>;

  if (error) return <p className="form-error" style={{ padding: "40px" }}>{error}</p>;
  if (!car) return <p className="empty-state" style={{ padding: "40px" }}>Loading…</p>;

  return (
    <section className="detail">
      <div className="detail__card">
        {car.image_url ? (
          <img className="detail__photo" src={car.image_url} alt={`${car.year} ${car.make} ${car.model}`} />
        ) : (
          <div className="detail__photo detail__photo--placeholder">{car.year}</div>
        )}

        <div className="detail__body">
          <div className="detail__heading">
            <div>
              <p className="detail__eyebrow">{car.make}</p>
              <h1>{car.model}</h1>
              <p className="detail__subtitle">
                {[car.year, car.fuel_type, car.transmission].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="detail__price">
              <p className="detail__price-label">Asking price</p>
              <p className="detail__price-value">${Number(car.price).toLocaleString()}</p>
            </div>
          </div>

          {(car.horsepower || car.mileage || car.zero_to_hundred || car.engine || car.drivetrain ||
            car.seats || car.weight_kg || car.fuel_consumption) && (
            <>
              <p className="detail__section-label">Full specifications</p>
              <div className="spec-grid">
                <Spec label="Power" value={car.horsepower ? `${car.horsepower}HP` : null} />
                <Spec label="Mileage" value={`${Number(car.mileage).toLocaleString()} mi`} />
                <Spec label="0–100 km/h" value={car.zero_to_hundred ? `${car.zero_to_hundred} sec` : null} />
                <Spec label="Engine" value={car.engine} />
                <Spec label="Drive" value={car.drivetrain} />
                <Spec label="Seats" value={car.seats} />
                <Spec label="Transmission" value={car.transmission} />
                <Spec label="Weight" value={car.weight_kg ? `${(car.weight_kg / 1000).toFixed(1)} tonnes` : null} />
                <Spec label="Fuel" value={car.fuel_consumption} />
              </div>
            </>
          )}

          {car.description && <p className="detail__description">{car.description}</p>}

         <div className="detail__actions">
  {token && (
    <button className="detail__save" onClick={handleFavorite} disabled={favorited}>
      {favorited ? "Saved to favorites" : "Save to favorites"}
    </button>
  )}

  <p className="detail__section-label" style={{ marginTop: "18px" }}>Message the seller</p>
  {msgStatus && <p className="form-success">{msgStatus}</p>}
  <form className="car-form" onSubmit={handleSendMessage} style={{ maxWidth: "none", padding: 0, background: "none", border: "none" }}>
    <label>
      Your name
      <input value={msgForm.name} onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })} required />
    </label>
    <label>
      Your email
      <input type="email" value={msgForm.email} onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })} required />
    </label>
    <label>
      Message
      <textarea rows={3} value={msgForm.message} onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })} required />
    </label>
    <button type="submit" className="detail__cta">Send message</button>
  </form>
</div> 
        </div>
      </div>
    </section>
  );
}
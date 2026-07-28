import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import CarList from "../components/CarList";

export default function Home() {
  const { token, user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function loadCars() {
    setLoading(true);
    api
      .getCars()
      .then(setCars)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadCars, []);

  async function handleDelete(carId) {
    try {
      await api.deleteCar(carId, token);
      loadCars();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">Car Marketplace</p>
        <h1>
          Find your
          <br />
          dream car
          <br />
          today
        </h1>
        <p>
          Browse listings from verified sellers, save the ones you like, and
          reach out when you're ready to buy.
        </p>
      </section>

      <div className="listings-header">
        <h2>Cars on sale</h2>
      </div>

      <section>
        {loading && <p className="empty-state">Loading listings…</p>}
        {error && <p className="form-error" style={{ padding: "0 40px" }}>{error}</p>}
        {!loading && !error && (
          <CarList
            cars={cars}
            currentUserId={user?.id}
            isAdmin={user?.role === "admin"}
            onDelete={handleDelete}
          />
        )}
      </section>
    </>
  );
}
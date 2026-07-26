import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import CarList from "../components/CarList";

export default function Favorites() {
  const { token } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getFavorites(token)
      .then(setCars)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <section className="page">
      <h1>Your favorites</h1>
      {loading && <p className="empty-state">Loading…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && cars.length === 0 && (
        <p className="empty-state">
          You haven't favorited any cars yet — browse listings and tap "Enquire now" to save one here.
        </p>
      )}
      {!loading && !error && cars.length > 0 && <CarList cars={cars} />}
    </section>
  );
}
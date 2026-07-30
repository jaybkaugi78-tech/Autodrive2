import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import CarList from "../components/CarList";

export default function Home() {
  const { token, user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  const filteredCars = cars.filter((car) => {
    const haystack = `${car.make} ${car.model} ${car.year}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

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
        <input
          type="text"
          className="search-input"
          placeholder="Search make, model, year…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section>
        {loading && <p className="empty-state">Loading listings…</p>}
        {error && <p className="form-error" style={{ padding: "0 40px" }}>{error}</p>}
        {!loading && !error && query && filteredCars.length === 0 && (
          <p className="empty-state">No cars match "{query}".</p>
        )}
        {!loading && !error && (
          <CarList
            cars={filteredCars}
            currentUserId={user?.id}
            isAdmin={user?.role === "admin"}
            onDelete={handleDelete}
          />
        )}
      </section>
    </>
  );
}
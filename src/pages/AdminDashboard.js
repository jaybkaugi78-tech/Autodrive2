import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function loadData() {
    setLoading(true);
    Promise.all([api.adminGetUsers(token), api.getCars()])
      .then(([u, c]) => {
        setUsers(u);
        setCars(c);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadData, [token]);

  async function handleDeleteUser(id) {
    if (!window.confirm("Delete this user? This also removes their listings.")) return;
    try {
      await api.adminDeleteUser(id, token);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCar(id) {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.adminDeleteCar(id, token);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="empty-state" style={{ padding: "40px" }}>Loading admin data…</p>;

  return (
    <section className="page">
      <h1>Admin dashboard</h1>
      {error && <p className="form-error">{error}</p>}

      <h2 style={{ color: "var(--lime)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Users ({users.length})
      </h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "admin" && (
                  <button className="admin-table__delete" onClick={() => handleDeleteUser(u.id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ color: "var(--lime)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "36px" }}>
        Listings ({cars.length})
      </h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>Seller ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c.id}>
              <td>{c.year} {c.make} {c.model}</td>
              <td>${Number(c.price).toLocaleString()}</td>
              <td>{c.seller_id}</td>
              <td>
                <button className="admin-table__delete" onClick={() => handleDeleteCar(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

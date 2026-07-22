const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }
  return data;
}

export const api = {
  // auth
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  resetPassword: (payload) => request("/auth/reset-password", { method: "POST", body: payload }),

  // cars
  getCars: () => request("/cars"),
  getCar: (id) => request(`/cars/${id}`),
  createCar: (payload, token) => request("/cars", { method: "POST", body: payload, token }),
  deleteCar: (id, token) => request(`/cars/${id}`, { method: "DELETE", token }),

  // favorites
  addFavorite: (car_id, token) => request("/favorites", { method: "POST", body: { car_id }, token }),

  // admin
  adminGetUsers: (token) => request("/admin/users", { token }),
  adminDeleteUser: (id, token) => request(`/admin/users/${id}`, { method: "DELETE", token }),
  adminDeleteCar: (id, token) => request(`/admin/cars/${id}`, { method: "DELETE", token }),
};

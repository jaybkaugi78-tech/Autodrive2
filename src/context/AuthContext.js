import { createContext, useContext, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Kept in memory only (no localStorage) — resets on refresh.
  // Swap to a persisted store later if your rubric requires "stay logged in".
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const data = await api.login({ email, password });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  }

  async function register(name, email, password, role) {
    const data = await api.register({ name, email, password, role });
    setToken(data.access_token);
    setUser(data.user);
    return data;
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

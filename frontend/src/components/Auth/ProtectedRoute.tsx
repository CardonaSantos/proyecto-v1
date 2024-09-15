import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("authToken") !== null;
  return isAuth ? children : <Navigate to="/login" />;
}

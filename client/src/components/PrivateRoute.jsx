// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { fakeAuth } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  return fakeAuth.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

// src/components/ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Unauthorized from "./Unauthorized";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, roles = ["user"] }) => {
  const { auth } = useContext(AuthContext);

  const userHasRequiredRole = auth && roles.includes(auth.role) ? true : false;

  if (!(auth && auth.loggedIn)) {
    return <Navigate to="/login" />;
  }

  if (auth && !userHasRequiredRole) {
    return <Unauthorized />; // build your won access denied page (sth like 404)
  }

  return children;
};

export default ProtectedRoute;

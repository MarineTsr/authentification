import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

function RestrictedAccess({ children }) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/auth/connexion" />;
}

export default RestrictedAccess;

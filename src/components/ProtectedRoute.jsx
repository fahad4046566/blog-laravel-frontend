import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useGlobalContext();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;

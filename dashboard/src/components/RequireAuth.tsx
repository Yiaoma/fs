import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;

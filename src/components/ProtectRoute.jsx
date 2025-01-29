/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useGetUserDetails from "../hooks/useGetUserDetails";
import Loader from "./Loader";

const ProtectRoute = ({ children }) => {
  const { user, loading, error } = useGetUserDetails();
  //   console.log(user);

  if (loading) {
    return <Loader />;
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;

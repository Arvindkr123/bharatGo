/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useGetUserDetails from "../hooks/useGetUserDetails";

const ProtectRoute = ({ children }) => {
  const { user, loading, error } = useGetUserDetails();
  //   console.log(user);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;

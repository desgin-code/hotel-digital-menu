import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const hotel = useSelector((state) => state.hotel.hotel);

  if (!hotel) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;

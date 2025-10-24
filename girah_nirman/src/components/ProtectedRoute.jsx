import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, tokenKey, redirectTo }) {
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

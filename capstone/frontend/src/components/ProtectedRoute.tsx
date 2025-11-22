import type React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "../slice/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useSelector(getToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

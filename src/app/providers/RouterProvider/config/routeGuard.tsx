import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { Loader } from "@/shared/ui/Loader";

import { useAuthContext } from "../../../../features/Auth/model/services/authContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loading, user } = useAuthContext();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

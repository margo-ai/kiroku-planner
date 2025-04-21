import { ReactNode } from "react";
import { Navigate, RouteProps } from "react-router-dom";

import { Boards } from "../../../Pages/Boards/ui/Boards";
import { Home } from "../../../Pages/Home";
import { Login } from "../../../Pages/Login";
import { Registration } from "../../../Pages/Registration";
import { useAuthContext } from "../../../features/Auth/authContext";

export enum AppRoutes {
  LOGIN = "login",
  REGISTRATION = "registration",
  HOME = "home",
  BOARDS = "boards",
  NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTRATION]: "registration",
  [AppRoutes.HOME]: "/",
  [AppRoutes.BOARDS]: "/boards",
  [AppRoutes.NOT_FOUND]: "*"
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { loading } = useAuthContext();
  const userUid = localStorage.getItem("uid");

  if (loading) {
    return <div>LOADING</div>;
  }
  console.log(userUid, loading);

  if (userUid) {
    return children;
  }

  return <Navigate to="/login" />;
};

const userUid = localStorage.getItem("uid");

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: userUid ? <Navigate replace to="/" /> : <Login />
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: userUid ? <Navigate replace to="/" /> : <Registration />
  },
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  [AppRoutes.BOARDS]: {
    path: RoutePath.boards,
    element: (
      <ProtectedRoute>
        <Boards />
      </ProtectedRoute>
    )
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <div>error</div>
  }
};

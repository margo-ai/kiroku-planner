import { RouteProps } from "react-router-dom";

import { BoardPage } from "@/Pages/BoardPage";
import { HomePage } from "@/Pages/HomePage";
import { Login } from "@/Pages/Login";
import { NotFoundPage } from "@/Pages/NotFoundPage";
import { Registration } from "@/Pages/Registration";

import { ProtectedRoute } from "./routeGuard";

export enum AppRoutes {
  LOGIN = "login",
  REGISTRATION = "registration",
  HOME = "home",
  BOARD = "board",
  NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTRATION]: "registration",
  [AppRoutes.HOME]: "/",
  [AppRoutes.BOARD]: "/board",
  [AppRoutes.NOT_FOUND]: "*"
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <Login />
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <Registration />
  },
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    )
  },
  [AppRoutes.BOARD]: {
    path: RoutePath.board,
    element: (
      <ProtectedRoute>
        <BoardPage />
      </ProtectedRoute>
    )
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};

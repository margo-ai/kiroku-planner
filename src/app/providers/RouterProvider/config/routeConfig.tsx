import { RouteProps } from "react-router-dom";

import { BoardPage } from "@/pages/BoardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegistrationPage } from "@/pages/RegistrationPage";

import { ProtectedRoute } from "./routeGuard";

export enum AppRoutes {
  LOGIN = "login",
  REGISTRATION = "registration",
  HOME = "home",
  BOARD = "board",
  PROFILE = "profile",
  NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTRATION]: "registration",
  [AppRoutes.HOME]: "/",
  [AppRoutes.BOARD]: "/board",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.NOT_FOUND]: "*"
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />
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
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
};

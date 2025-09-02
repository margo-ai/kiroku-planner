import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routeConfig } from "../config/routeConfig";

export const RouterProvider = () => {
  return (
    <Suspense fallback={""}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route element={element} key={path} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
};

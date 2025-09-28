import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./app/providers/AuthProvider/AuthProvider";
import { ErrorBoundary } from "./app/providers/ErrorBoundary/ErrorBoundary";
import { StoreProvider } from "./app/providers/StoreProvider/StoreProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider/ThemeProvider";
import "./app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </AuthProvider>
);

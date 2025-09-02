import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./app/providers/AuthProvider/AuthProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider/ThemeProvider";
import "./app/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);

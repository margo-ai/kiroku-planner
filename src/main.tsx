import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./shared/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

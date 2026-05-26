import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-pro/js/all.min.js";
import "./index.css";
import App from "./App";

document.documentElement.setAttribute("data-theme", "1doc");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import "@1doc/1ds-tokens/dist/css/primitives.css";
import "@1doc/1ds-tokens/dist/css/semantic.css";
import "@1doc/1ds-tokens/dist/css/theme-1doc.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setTheme } from "@1doc/1ds-react";
import "@fortawesome/fontawesome-pro/js/all.min.js";
import "./index.css";
import App from "./App";

setTheme("1doc");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

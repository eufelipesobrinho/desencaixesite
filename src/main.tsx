import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { initAnalytics, initScrollTracking } from "@/lib/analytics";
import { applySiteUrl } from "@/lib/seo";
import "@/styles/index.css";

applySiteUrl();
initAnalytics();
initScrollTracking();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

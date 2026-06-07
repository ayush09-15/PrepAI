import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111927",
            color: "#f0f4ff",
            border: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "DM Sans, sans-serif",
          },
          success: {
            iconTheme: {
              primary: "#22d3a0",
              secondary: "#111927",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#111927",
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </StrictMode>
);
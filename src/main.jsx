import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1067728799940-qjvem5mijnb1gu76oqtt4ger0el0jis1.apps.googleusercontent.com">
        <App />
        <ToastContainer position="bottom-center" />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);

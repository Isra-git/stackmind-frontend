import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Solo necesitamos el BrowserRouter aquí
import { AuthProvider } from "./context/AuthContext"; // Importamos a nuestro Guardián
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter -> lee la URL del navegador */}
    <BrowserRouter>
      {/*  envolvemos la App -> con el AuthProvider  */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

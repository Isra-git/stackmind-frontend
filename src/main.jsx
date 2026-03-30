import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importamos el sistema de rutas
import "./index.css";
import App from "./App.jsx";
import Prueba from "./Prueba.jsx"; // Importamos tu componente de prueba

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: http://localhost:5173/ */}
        <Route path="/" element={<App />} />

        {/* Tu página de prueba: http://localhost:5173/prueba */}
        <Route path="/prueba" element={<Prueba />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

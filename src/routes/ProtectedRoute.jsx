/* protege las rutas que solo pueden ser accedidas por usuarios autenticados
 */

// src/routes/ProtectedRoute.jsx

// dependencias
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

// componente que protege la ruta
const ProtectedRoute = () => {
  // sacamos el token del contexto de autenticacion
  const { token } = useContext(AuthContext);

  // Comprobamos si NO hay token -> a /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // si hay token -> Renderizamos las rutas hijas con Outlet
  return <Outlet />;
};

export default ProtectedRoute;

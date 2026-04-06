/* Navegacion de stackmind
 */

// src/routes/index.jsx

// dependencias
import React, { useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

// simulamos un login , true / false session
const routes = (isLoggedIn) => [
  {
    // devolvemos los {children} de MainLayout
    element: <MainLayout />,
    children: [
      // ruta publica
      {
        path: "/",
        element: <Home />,
      },

      // ruta protegida
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/new",
            element: (
              <div className="p-10 text-xl font-bold">
                Formulario para nueva pregunta (Próximamente)
              </div>
            ),
          },
        ],
      },
    ],
  },

  // rutas sin MainLayout (no login/sidebar)
  {
    path: "/login",
    element: isLoggedIn ? (
      <Navigate to="/" replace />
    ) : (
      <div className="p-10 text-xl font-bold">
        Página de Login (Próximamente)
      </div>
    ),
  },

  // resto rutas -> capturamos errores 404
  {
    path: "*",
    element: <Navigate to="/error404" replace />,
  },
  {
    path: "/error404",
    element: (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        404 - ¡Ups! Página no encontrada
      </div>
    ),
  },
];

// exportamos el enRutador
export default function AppRouter() {
  //const {token} = useAuth(); -> De momento true
  const { token } = useContext(AuthContext);
  const routing = useRoutes(routes(!!token));
  return routing;
}

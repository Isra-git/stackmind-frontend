/* 

    Navegacion de stackmind

*/

// src/routes/index.jsx

// dependencias
import React, { Children } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import { LogIn } from "lucide-react";

// simmulamos un login , true / false session
const routes = (isLoggedIn) => [
  {
    // devolvemos los {childre} de MainLayout
    element: <MainLayout />,
    children: [
      // ruta publica
      {
        path: "/",
        element: <Home />,
      },

      // ruta protegida
      {
        path: "/new",
        element: isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />,
      },
    ],
  },

  // rutas sin MainLayout (no login/sidebar)
  {
    path: "/login",
    element: isLoggedIn ? <Navigate to="/" replace /> : <LogIn />,
  },

  // resto rutas -> capturamos errores 404
  {
    path: "*",
    element: <Navigate to="/error404" replace />,
  },
];

// exportamos el enRutador
export default function AppRouter() {
  //const {token} = useAuth(); -> De momento true
  const routing = useRoutes(routes(true));
  return routing;
}

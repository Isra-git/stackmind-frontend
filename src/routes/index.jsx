/* Navegacion de stackmind */

// src/routes/index.jsx

// dependencias
import React, { useContext } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

// publicas
import Home from "../pages/Home";
import Questions from "../pages/Questions";
import Tags from "../pages/Tags";
import TopQuestions from "../components/shared/TopQuestions";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import History from "../pages/History";
import Logout from "../pages/Logout";
import Error404 from "../pages/Error404";

// protegidas
import Me from "../pages/Me";
import MyQuestions from "../components/questions/MyQuestions";
import MyAnswers from "../components/answers/MyAnswers";
import Support from "../pages/Support";
import NewQuestion from "../pages/NewQuestion";
import NewAnswer from "../components/answers/NewAnswer";
import EditAnswer from "../components/answers/EditAnswer";

import QuestionDetail from "../pages/QuestionDetail";

// temporal ->
import StackMindEditor from "../components/editor/StackMindEditor";
// contexto de Autenticacion
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

// pasamos el estado de sesion
const routes = (isLoggedIn) => [
  {
    // devolvemos los {children} de MainLayout
    element: <MainLayout />,
    children: [
      // --- RUTAS PÚBLICAS ---
      { path: "/", element: <Home /> },
      { path: "/questions", element: <Questions /> },
      { path: "/tags", element: <Tags /> },
      { path: "/topquestions", element: <TopQuestions /> },
      { path: "/search", element: <Search /> },
      { path: "/history", element: <History /> },
      { path: "/logout", element: <Logout /> },

      // --- RUTAS PROTEGIDAS ---
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/newanswer", element: <NewAnswer /> },
          { path: "/edit-answer/:id", element: <EditAnswer /> },
          { path: "/me", element: <Me /> },
          { path: "/newquestion", element: <NewQuestion /> },
          { path: "/edit-question/:id", element: <NewQuestion /> },
          { path: "/support", element: <Support /> },
          { path: "/myanswers", element: <MyAnswers /> },
          { path: "/myquestions", element: <MyQuestions /> },
          { path: "/questions/:id/:slug", element: <QuestionDetail /> },
          { path: "/questions/:id", element: <QuestionDetail /> }, // fallback por si no viene el slug
          { path: "/editor", element: <StackMindEditor /> }, // ruta probisional para probar el editor
        ],
      },
    ],
  },

  // --- RUTAS SIN MAINLAYOUT (Pantalla completa, sin sidebar) ---
  {
    path: "/login",
    // Si ya está logueado lo mandamos a la home, si no, le enseñamos el Login
    element: isLoggedIn ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: "/register",
    element: isLoggedIn ? <Navigate to="/" replace /> : <Register />,
  },

  // --- RESTO DE RUTAS -> ERRORES 404 ---
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "/error404",
    element: <Error404 />,
  },
];

// exportamos el enRutador
export default function AppRouter() {
  const { token } = useContext(AuthContext);
  // Convertimos el token a booleano
  const routing = useRoutes(routes(!!token));
  return routing;
}

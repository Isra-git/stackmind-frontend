/* 
    Componente para hacer Logout y redirigir a home

*/

// src/pages/Logout.jsx (o la ruta donde lo tengas)
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  // instancia para la navegacion
  const navigate = useNavigate();

  // contexto de autenticacion
  const { logout } = useAuth();

  // creamos una Referencia para disparar el Logout y evitar errores
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    // creamos un temporizador
    let timer;

    // funcion para cerrar sesión y gestionar la asincronia
    const performLogout = async () => {
      // Si ya intentamos cerrar , no lo repetimos
      if (hasLoggedOut.current) return;
      hasLoggedOut.current = true;

      try {
        // gestionamos la llamada al bk de forma asincrona
        await logout();
      } catch (error) {
        // Si  responde 401 , lo ignoramos -> Ya logout
        console.warn(
          "Sesión cerrada localmente, pero el servidor devolvió un error:",
          error,
        );
      } finally {
        // Iniciamos timer solo despues de intentar el logout
        timer = setTimeout(() => {
          navigate("/");
        }, 3500);
      }
    };

    performLogout();

    // Limpiamos el temporizador si el usuario navega manualmente antes de los 3.5s
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-base-100">
      <div className="max-w-md w-full bg-base-200 p-10 rounded-3xl shadow-xl border border-base-300 transform transition-all duration-500 hover:scale-105">
        {/* Icono  */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <HiOutlineHandRaised className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-base-content mb-4">
          ¡Hasta pronto!
        </h1>

        <p className="text-lg text-base-content/70 leading-relaxed mb-8">
          Sentimos que te marches, pero esperamos haberte sido de gran ayuda en
          tu camino por la Inteligencia Artificial.
        </p>

        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-dots loading-md text-primary"></span>
          <span className="text-sm font-medium text-base-content/50 uppercase tracking-widest">
            Cerrando sesión de forma segura...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logout;

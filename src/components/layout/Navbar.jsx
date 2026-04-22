/* Barra de Navegacion

*/

// dependencias
import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

// Importamos nuestro componente
import MobileMenu from "./MobileMenu";

//  iconos de la vista de escritorio
import { HiSearch } from "react-icons/hi";
import { HiChatBubbleLeftRight, HiTag, HiUsers } from "react-icons/hi2";

const Navbar = () => {
  // extraemos el token y usuario del contexto de autenticación
  const { token, user } = useAuth();

  // Logica de Avatares (1- solo admin), fallback 2 por seguridad
  let avatarPath = "/img/avatars/avatar2.png";

  // 2. Solo si el usuario existe, hacemos las comprobaciones
  if (user) {
    if (user.is_admin) {
      avatarPath = "/img/avatars/avatar1.jpeg";
    } else if (user.avatar_url) {
      avatarPath = `/img/avatars/${user.avatar_url}`;
    }
  }

  return (
    <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50 px-2 md:px-8 shadow-sm">
      {/* SECCIÓN IZQUIERDA */}
      <div className="navbar-start w-auto lg:w-1/4 flex items-center gap-2">
        {/* Aquí inyectamos el menú móvil */}
        <MobileMenu />

        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tight ml-2 flex items-center  "
        >
          StackMind
          <img
            src="/img/logo/logo_stackmind.png"
            alt="StackMind"
            width="65"
            height="50"
            fetchPriority="high"
            loading="eager"
          />
        </Link>
      </div>

      {/* SECCIÓN CENTRAL: Navegación de Escritorio */}
      <div className="navbar-center hidden lg:flex flex-1 justify-center">
        <nav className="flex gap-1 bg-base-200/50 p-1 rounded-full px-2">
          <Link
            to="/questions"
            className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2"
          >
            <HiChatBubbleLeftRight className="text-lg text-primary" /> Preguntas
          </Link>
          <Link
            to="/tags"
            className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2"
          >
            <HiTag className="text-lg text-secondary" /> Etiquetas
          </Link>
          <Link
            to="/topquestions"
            className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2"
          >
            <HiUsers className="text-lg text-accent" /> Top Preguntas
          </Link>
        </nav>
      </div>

      {/* SECCIÓN DERECHA: Acciones -> Segun la session (token?) */}
      <div className="navbar-end w-auto lg:w-1/4 flex gap-2 justify-end items-center">
        <Link to="/search" className="btn btn-ghost btn-circle md:hidden">
          <HiSearch className="h-5 w-5" />
        </Link>

        {/* ToKen ? Avatar : Login / Register */}
        {token && user ? (
          <div className="flex items-center gap-3 bg-base-200/50 py-1 px-2 pr-4 rounded-full border border-base-300">
            <Link
              to="/me"
              className="avatar hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-8 md:w-9 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1">
                <img
                  src={avatarPath}
                  alt={`Avatar de ${user.username}`}
                  title={user.username}
                />
              </div>
            </Link>
            <div className="flex flex-col">
              <span className="font-bold text-sm md:text-base leading-tight">
                <span className="text-[#6499DC]">{user.username}</span>
              </span>
              {/* <span className="text-xs text-warning font-semibold flex items-center gap-1">🏆 {user.reputation || 0}</span> */}
            </div>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm hidden md:inline-flex font-medium"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm px-6 shadow-lg shadow-primary/10"
            >
              Unirse
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

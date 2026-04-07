/* 

  Barra de Navegacion

*/

// dependencias
import React from "react";
import { Link } from "react-router-dom";

// Importamos nuestro nuevo componente
import MobileMenu from "./MobileMenu";

// Aquí ya solo necesitamos los iconos de la vista de escritorio
import { HiSearch } from "react-icons/hi";
import { HiChatBubbleLeftRight, HiTag, HiUsers } from "react-icons/hi2";

const Navbar = () => {
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
            <HiUsers className="text-lg text-accent" /> Respuestas Top
          </Link>
        </nav>
      </div>
      {/* questions tags topquestions search login register*/}
      {/* SECCIÓN DERECHA: Acciones */}
      <div className="navbar-end w-auto lg:w-1/4 flex gap-2 justify-end">
        <Link to="/search" className="btn btn-ghost btn-circle md:hidden">
          <HiSearch className="h-5 w-5" />
        </Link>
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
      </div>
    </header>
  );
};

export default Navbar;

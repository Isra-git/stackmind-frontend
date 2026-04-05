import React from "react";
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
        {/* Aquí inyectamos el menú móvil limpio */}
        <MobileMenu />

        <span className="text-xl md:text-2xl font-extrabold tracking-tight ml-2 flex items-center  ">
          StackMind
          <img
            src="../../../public/img/logo/logo_stackmind.png"
            alt="StackMind"
            width="65"
            height="50"
            fetchpriority="high"
            loading="eager"
          />
        </span>
      </div>

      {/* SECCIÓN CENTRAL: Navegación de Escritorio */}
      <div className="navbar-center hidden lg:flex flex-1 justify-center">
        <nav className="flex gap-1 bg-base-200/50 p-1 rounded-full px-2">
          <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2">
            <HiChatBubbleLeftRight className="text-lg text-primary" /> Preguntas
          </a>
          <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2">
            <HiTag className="text-lg text-secondary" /> Etiquetas
          </a>
          <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-base-300 hover:shadow-sm transition-all flex items-center gap-2">
            <HiUsers className="text-lg text-accent" /> Respuestas Top
          </a>
        </nav>
      </div>

      {/* SECCIÓN DERECHA: Acciones */}
      <div className="navbar-end w-auto lg:w-1/4 flex gap-2 justify-end">
        <button className="btn btn-ghost btn-circle md:hidden">
          <HiSearch className="h-5 w-5" />
        </button>
        <button className="btn btn-ghost btn-sm hidden md:inline-flex font-medium">
          Entrar
        </button>
        <button className="btn btn-primary btn-sm px-6 shadow-lg shadow-primary/10">
          Unirse
        </button>
      </div>
    </header>
  );
};

export default Navbar;

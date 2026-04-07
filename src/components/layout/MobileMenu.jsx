/* 

  Menu del icono de Hamburguesa

*/

// dependencias
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { HiMenu, HiSun, HiLogout } from "react-icons/hi";
import {
  HiChatBubbleLeftRight,
  HiUsers,
  HiUserCircle,
  HiCog,
  HiQuestionMarkCircle,
  HiMiniPencilSquare,
} from "react-icons/hi2";

const MobileMenu = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("stackmind-theme") || "dark",
  );

  // cerramos el menu al hacer Clik en cualquier opcion
  const closeMenu = () => {
    const element = document.activeElement;
    if (element) {
      element.blur(); // Desactivamos el foco del elemento activo
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("stackmind-theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="dropdown dropdown-bottom">
      {/* Botón disparador (Icono Hamburguesa) */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-primary text-white hover:scale-105 transition-transform"
      >
        <HiMenu className="h-6 w-6" />
      </div>

      {/* Contenido del Menú */}
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-72 mt-2 border border-base-200"
      >
        {/* Control de Tema */}
        <li className="mb-2 pb-2 border-b border-base-200">
          <label
            className="flex cursor-pointer gap-2 items-center justify-between active:bg-base-200"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex items-center gap-3 font-semibold">
              <HiSun className="h-5 w-5 text-warning" />
              Modo Oscuro
            </span>
            <input
              type="checkbox"
              className="toggle bg-base-content"
              checked={theme === "dark"}
              onChange={handleToggleTheme}
            />
          </label>
        </li>

        {/* Enlaces de navegación */}
        <li>
          <Link to="/Me" onClick={closeMenu} className="py-3">
            <HiUserCircle className="h-5 w-5 opacity-70" /> Mi Perfil
          </Link>
        </li>
        <li>
          <Link to="/MyQuestions" onClick={closeMenu} className="py-3">
            <HiChatBubbleLeftRight className="h-5 w-5 opacity-70" /> Mis
            Preguntas
          </Link>
        </li>

        <li>
          <Link to="/MyAnswers" onClick={closeMenu} className="py-3">
            <HiMiniPencilSquare className="h-5 w-5 opacity-70" /> Mis Respuestas
          </Link>
        </li>
        <li>
          <Link to="/History" onClick={closeMenu} className="py-3">
            <HiUsers className="h-5 w-5 opacity-70" /> Nuestra Historia
          </Link>
        </li>
        <li>
          <Link to="/Support" onClick={closeMenu} className="py-3">
            <HiQuestionMarkCircle className="h-5 w-5 opacity-70" /> Ayuda y
            Soporte
          </Link>
        </li>

        {/* Botón de salida */}
        <li className="mt-2 pt-2 border-t border-base-200">
          <Link
            to="/Logout"
            onClick={closeMenu}
            className="text-error hover:bg-error/10 font-medium"
          >
            <HiLogout className="h-5 w-5" /> Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;

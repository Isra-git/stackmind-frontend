/* 

    Componente para Mostrar Error 404, y dar posibilidad de volver a la portada o al contacto


*/

// src/pages/Error404.jsx
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineEnvelope } from "react-icons/hi2";

export const Error404 = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100 text-center px-4 font-sans">
      {/* Emoji animado */}
      <div className="text-8xl md:text-9xl mb-6 animate-bounce">🤖</div>

      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-error mb-2">
        404
      </h1>

      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-base-content">
        ¡Ups! Cortocircuito temporal
      </h2>

      <p className="text-lg text-base-content/70 max-w-lg mb-8 leading-relaxed">
        Nuestra IA es capaz de predecir muchas cosas, pero definitivamente no
        calculó que acabarías en esta ruta. Parece que la página que buscas ha
        sido abducida por un agujero negro digital.
      </p>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
        <Link to="/" className="btn btn-primary shadow-lg">
          <HiOutlineHome className="w-5 h-5" />
          Volver al Inicio
        </Link>

        <a
          href="mailto:stackmind.app@gmail.com?subject=Encontré%20un%20agujero%20negro%20(Error%20404)"
          className="btn btn-outline btn-secondary"
        >
          <HiOutlineEnvelope className="w-5 h-5" />
          Avisar a los técnicos
        </a>
      </div>
    </div>
  );
};

export default Error404;

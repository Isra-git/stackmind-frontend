/* 

    pie de pagina

*/

// src/components/layout/Footer.jsx

// dependencias
import React from "react";

// iconos sociales de FontAwesome
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t border-base-300 px-4 py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-around gap-4">
        {/* LADO IZQUIERDO: Copyright y Licencia */}
        <div className="flex flex-col items-center w-full md:flex-row md:justify-around md:items-center text-sm text-base-content/70">
          <p className="font-semibold">© 2026 israDev. StackMind.</p>
          <p>
            Distribuido bajo la{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              Licencia MIT
            </a>
            .
          </p>
        </div>

        {/* LADO DERECHO: Redes Sociales y Contacto */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Isra-git"
            target="_blank"
            rel="noreferrer"
            className="text-base-content/60 hover:text-primary transition-colors tooltip"
            data-tip="GitHub"
          >
            <FaGithub className="text-2xl" />
          </a>

          <a
            href="#" // Pon aquí tu URL de LinkedIn real cuando la tengas
            target="_blank"
            rel="noreferrer"
            className="text-base-content/60 hover:text-primary transition-colors tooltip"
            data-tip="LinkedIn"
          >
            <FaLinkedin className="text-2xl" />
          </a>

          <a
            href="mailto:stackmind.app@gmail.com"
            className="text-base-content/60 hover:text-primary transition-colors tooltip"
            data-tip="Email"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

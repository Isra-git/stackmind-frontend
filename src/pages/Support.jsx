/* 

    Pagina Support

*/
// src/pages/support.jsx

// dependencias
import React from "react";

//iconos
import {
  HiOutlineEnvelope,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export const support = () => {
  return (
    <div className="min-h-[80vh] bg-base-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* CABECERA */}
      <div className="max-w-3xl w-full text-center space-y-4 mb-12">
        <span className="badge badge-primary badge-outline badge-lg font-bold tracking-wider uppercase mb-2">
          Soporte StackMind
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary pb-2">
          Estamos aquí para ayudarte
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          Nuestra misión es hacer que la Inteligencia Artificial sea accesible
          para todos en tu día a día. Si algo no funciona como debería o tienes
          dudas, hablemos. De humanos a humanos.
        </p>
      </div>

      {/* TARJETA PRINCIPAL DE CONTACTO */}
      <div className="w-full max-w-2xl card bg-base-200 shadow-xl border border-base-300 mb-16 hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body items-center text-center p-8 sm:p-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <HiOutlineEnvelope className="w-8 h-8 text-primary" />
          </div>

          <h2 className="card-title text-2xl mb-2">Contáctanos por Correo</h2>
          <p className="text-base-content/70 mb-6">
            Para cualquier duda, problema con tu cuenta, o sugerencia para
            mejorar la comunidad, escríbenos directamente y te responderemos lo
            antes posible.
          </p>

          <a
            href="mailto:stackmind.app@gmail.com"
            className="text-2xl sm:text-3xl font-bold text-accent hover:text-primary transition-colors duration-300 break-all select-all"
          >
            stackmind.app@gmail.com
          </a>

          <div className="card-actions mt-8 w-full">
            <a
              href="mailto:stackmind.app@gmail.com?subject=Ayuda%20con%20StackMind"
              className="btn btn-primary btn-lg w-full sm:w-auto mx-auto shadow-md"
            >
              Enviar un correo ahora
            </a>
          </div>
        </div>
      </div>

      {/* SECCIoN DE MOTIVOS */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
          <HiOutlineWrenchScrewdriver className="w-8 h-8 mx-auto text-info mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-2">Problemas Técnicos</h3>
          <p className="text-sm text-base-content/60">
            ¿Un error en la página o en el editor? Cuéntanos qué pasó y nuestro
            equipo lo investigará.
          </p>
        </div>

        <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
          <HiOutlineLightBulb className="w-8 h-8 mx-auto text-warning mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-2">Sugerencias</h3>
          <p className="text-sm text-base-content/60">
            ¿Tienes una idea brillante para la comunidad? Nos encanta escuchar
            cómo podemos mejorar.
          </p>
        </div>

        <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200">
          <HiOutlineHeart className="w-8 h-8 mx-auto text-error mb-3 opacity-80" />
          <h3 className="font-bold text-lg mb-2">Confianza y Seguridad</h3>
          <p className="text-sm text-base-content/60">
            Reporta comportamientos inadecuados o dudas sobre privacidad. Tu
            tranquilidad es prioridad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default support;

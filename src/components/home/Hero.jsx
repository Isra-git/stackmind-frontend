import React from "react";
// Importamos solo el icono de la lupa que necesita este componente
import { HiSearch } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="bg-base-100 pt-6 pb-12 md:pt-10 md:pb-20 px-4 border-b border-base-300 relative overflow-hidden">
      {/* --- HERO SECTION --- */}
      {/* Aplicamos el padding asimétrico (pt-6 y pb-12) que discutimos para acercarlo al menú */}
      {/* Decoración de fondo sutil (Glow radial de Tailwind) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-base-100 to-base-100 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3">
          Comunidad de IA en Español
        </span>

        <h1 className="text-4xl md:text-6xl font-black mt-2 mb-6 leading-tight tracking-tight">
          Resuelve tus dudas sobre <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Inteligencia Artificial
          </span>
        </h1>

        <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Únete a la red más grande de desarrolladores de ML, Data Scientists y
          expertos en LLMs. Comparte código, debate sobre modelos y aprende.
        </p>

        {/* Buscador Principal */}
        <div className="relative max-w-full md:max-w-xl mx-auto px-2 md:px-0 group">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-5 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="¿Cómo hacer fine-tuning a Llama 3?..."
            className="input input-bordered w-full pl-10 md:pl-12 pr-24 py-6 shadow-sm hover:shadow-md focus:shadow-lg transition-shadow border-base-300 bg-base-100 rounded-2xl"
          />
          <button className="btn btn-primary absolute top-1.5 right-1.5 md:right-2 rounded-xl h-[calc(100%-12px)] min-h-0">
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

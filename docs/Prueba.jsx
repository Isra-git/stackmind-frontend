import React from "react";

const Prueba = () => {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#ededed] selection:bg-blue-500/30 font-sans overflow-hidden relative"
      data-theme="dark"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tighter hover:opacity-80 cursor-pointer">
              StackMind
            </span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Explorar
              </a>
              <a href="#" className="hover:text-white transition-colors">
                IA
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Comunidad
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-ghost btn-sm text-sm font-medium normal-case">
              Entrar
            </button>
            <button className="btn btn-white btn-sm bg-white text-black hover:bg-gray-200 border-none px-4 normal-case">
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8 animate-pulse">
          <span>✨ Nuevo: Refina tus preguntas con Llama 3</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          IA de humanos <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            para humanos.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          La comunidad en español donde aprender a usar la Inteligencia
          Artificial es tan fácil como tener una charla entre amigos.
        </p>

        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="¿Cómo puedo usar IA en mi trabajo?"
              className="w-full bg-[#111111] border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition-all text-white shadow-2xl"
            />
          </div>
          <button className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-none text-white px-8">
            Preguntar
          </button>
        </div>

        <div className="mt-24 text-left bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
            Guía Rápida: Primeros Pasos
          </h3>

          <ul className="steps steps-vertical space-y-4">
            <li className="step step-primary" data-content="1">
              <div className="text-left ml-4">
                <h4 className="font-bold">Escribe tu duda</h4>
                <p className="text-sm text-gray-400">
                  No importa si no es técnica, nosotros te entendemos.
                </p>
              </div>
            </li>
            <li className="step step-primary" data-content="2">
              <div className="text-left ml-4">
                <h4 className="font-bold">Usa el botón de "Magia"</h4>
                <p className="text-sm text-gray-400">
                  Nuestra IA reformulará tu pregunta para obtener mejores
                  respuestas.
                </p>
              </div>
            </li>
            <li className="step" data-content="3">
              <div className="text-left ml-4">
                <h4 className="font-bold">Recibe ayuda humana</h4>
                <p className="text-sm text-gray-400">
                  Expertos te guiarán paso a paso sin tecnicismos raros.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 py-10 text-center text-gray-600 text-sm">
        &copy; 2026 StackMind - Tu comunidad de IA en español.
      </footer>
    </div>
  );
};

export default Prueba;

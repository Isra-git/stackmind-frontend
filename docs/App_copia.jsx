import React from "react";
// Importamos los iconos necesarios de Heroicons (v1 y v2)
import { HiMenu, HiSearch, HiSun, HiMoon, HiLogout } from "react-icons/hi";
import {
  HiChatBubbleLeftRight,
  HiTag,
  HiUsers,
  HiUserCircle,
  HiCog,
  HiBookmark,
  HiQuestionMarkCircle,
} from "react-icons/hi2";

function App() {
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content">
      {/* --- NAVBAR --- */}
      <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50 px-2 md:px-8 shadow-sm">
        {/* SECCIÓN IZQUIERDA: Menú Hamburguesa y Logo */}
        <div className="navbar-start w-auto lg:w-1/4 flex items-center gap-2">
          {/* Dropdown del Menú Principal */}
          <div className="dropdown dropdown-bottom">
            {/* Botón disparador (Icono Hamburguesa) */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-primary text-white hover:scale-105 transition-transform"
            >
              <HiMenu className="h-6 w-6" />
            </div>

            {/* Contenido del Menú (8 Opciones) */}
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-72 mt-2 border border-base-200"
            >
              {/* OPCIÓN 1: Control de Tema (Light/Dark) */}
              <li className="mb-2 pb-2 border-b border-base-200">
                <label className="flex cursor-pointer gap-2 items-center justify-between active:bg-base-200">
                  <span className="flex items-center gap-3 font-semibold">
                    <HiSun className="h-5 w-5 text-warning" />
                    Modo Oscuro
                  </span>
                  {/* Controller de DaisyUI: cambia el tema automáticamente */}
                  <input
                    type="checkbox"
                    value="dark"
                    className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
                  />
                </label>
              </li>

              {/* Opciones Standard */}
              <li>
                <a className="py-3">
                  <HiUserCircle className="h-5 w-5 opacity-70" /> Mi Perfil
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HiChatBubbleLeftRight className="h-5 w-5 opacity-70" /> Mis
                  Preguntas
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HiBookmark className="h-5 w-5 opacity-70" /> Guardados
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HiUsers className="h-5 w-5 opacity-70" /> Comunidades
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HiCog className="h-5 w-5 opacity-70" /> Configuración
                </a>
              </li>
              <li>
                <a className="py-3">
                  <HiQuestionMarkCircle className="h-5 w-5 opacity-70" /> Ayuda
                  y Soporte
                </a>
              </li>

              {/* Opción 8: Cerrar Sesión (Roja) */}
              <li className="mt-2 pt-2 border-t border-base-200">
                <a className="text-error hover:bg-error/10 font-medium">
                  <HiLogout className="h-5 w-5" /> Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>

          {/* Logo / Nombre del Sitio */}
          <span className="text-xl md:text-2xl font-extrabold tracking-tight ml-2">
            AIStack
          </span>
        </div>

        {/* SECCIÓN CENTRAL: Navegación de Escritorio (Oculta en móvil) */}
        <div className="navbar-center hidden lg:flex flex-1 justify-center">
          <nav className="flex gap-1 bg-base-200/50 p-1 rounded-full px-2">
            <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
              <HiChatBubbleLeftRight className="text-lg text-primary" />{" "}
              Preguntas
            </a>
            <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
              <HiTag className="text-lg text-secondary" /> Etiquetas
            </a>
            <a className="btn btn-ghost btn-sm font-normal text-base hover:bg-white hover:shadow-sm transition-all flex items-center gap-2">
              <HiUsers className="text-lg text-accent" /> Usuarios
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
          <button className="btn btn-primary btn-sm px-6 shadow-lg shadow-primary/30">
            Unirse
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-base-100 py-12 md:py-20 px-4 border-b border-base-300 relative overflow-hidden">
        {/* Decoración de fondo sutil */}
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
            Únete a la red más grande de desarrolladores de ML, Data Scientists
            y expertos en LLMs. Comparte código, debate sobre modelos y aprende.
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

      {/* --- MAIN CONTENT (GRID) --- */}
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 md:py-12 px-4">
        {/* COLUMNA IZQUIERDA: Lista de Preguntas (8 columnas) */}
        <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
          {/* Cabecera de la lista */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-base-300 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <HiChatBubbleLeftRight className="text-primary" />
              Preguntas Recientes
            </h2>
            <div className="tabs tabs-boxed bg-base-100 border border-base-200 p-1">
              <a className="tab tab-active bg-primary text-white rounded-lg">
                Nuevas
              </a>
              <a className="tab hover:text-primary transition-colors">
                Sin responder
              </a>
              <a className="tab hover:text-primary transition-colors">
                Populares
              </a>
            </div>
          </div>

          {/* LISTA DE CARDS */}
          <div className="flex flex-col gap-4">
            {/* --- COMPONENTE CARD: PREGUNTA 1 --- */}
            <div className="card bg-base-100 shadow-sm border border-base-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
              <div className="card-body p-5 flex flex-col sm:flex-row gap-5">
                {/* Bloque Estadísticas (Votos/Respuestas) */}
                {/* Móvil: Fila horizontal. PC: Columna vertical a la izquierda */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-20 border-b sm:border-b-0 sm:border-r border-base-200 pb-4 sm:pb-0 sm:pr-4 shrink-0">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-base-content">
                      15
                    </span>
                    <span className="text-[10px] uppercase font-bold text-base-content/50">
                      Votos
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-success/10 text-success rounded px-2 py-1 border border-success/20">
                    <span className="text-lg font-bold">3</span>
                    <span className="text-[10px] uppercase font-bold">
                      Resp.
                    </span>
                  </div>
                  {/* Fecha visible solo en móvil aquí */}
                  <span className="text-xs text-base-content/40 sm:hidden ml-auto">
                    2h
                  </span>
                </div>

                {/* Bloque Contenido */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary-focus transition-colors leading-tight mb-2">
                    ¿Cómo implementar fine-tuning en un modelo LLM con datos
                    personalizados?
                  </h3>
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                    Estoy intentando hacer fine-tuning de un modelo GPT con mis
                    propios datos. He probado con LoRA pero los resultados no
                    son los esperados en cuanto a precisión...
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-outline badge-sm border-blue-200 text-blue-600 bg-blue-50">
                        fine-tuning
                      </span>
                      <span className="badge badge-outline badge-sm border-purple-200 text-purple-600 bg-purple-50">
                        LLM
                      </span>
                      <span className="badge badge-outline badge-sm border-orange-200 text-orange-600 bg-orange-50">
                        LoRA
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-base-content/60">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-5">
                          <span className="text-xs">M</span>
                        </div>
                      </div>
                      <span className="font-medium text-base-content">
                        mario_dev
                      </span>
                      <span className="hidden sm:inline">• hace 2 horas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* --- FIN CARD --- */}

            {/* --- CARD EJEMPLO 2 (Para ver la lista) --- */}
            <div className="card bg-base-100 shadow-sm border border-base-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
              <div className="card-body p-5 flex flex-col sm:flex-row gap-5">
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-20 border-b sm:border-b-0 sm:border-r border-base-200 pb-4 sm:pb-0 sm:pr-4 shrink-0">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-base-content">
                      42
                    </span>
                    <span className="text-[10px] uppercase font-bold text-base-content/50">
                      Votos
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-base-200 text-base-content/70 rounded px-2 py-1">
                    <span className="text-lg font-bold">0</span>
                    <span className="text-[10px] uppercase font-bold">
                      Resp.
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary-focus transition-colors leading-tight mb-2">
                    Error de memoria CUDA al entrenar PyTorch en Docker
                  </h3>
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                    Al intentar correr el script de entrenamiento dentro del
                    contenedor, recibo un OOM error a pesar de tener 24GB de
                    VRAM...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-outline badge-sm border-red-200 text-red-600 bg-red-50">
                      pytorch
                    </span>
                    <span className="badge badge-outline badge-sm border-gray-200 text-gray-600 bg-gray-50">
                      docker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Sidebar (4 columnas) */}
        <aside className="order-1 lg:order-2 lg:col-span-4 space-y-6">
          {/* Card: Llamada a la acción */}
          <div className="card bg-primary text-primary-content shadow-xl shadow-primary/20 overflow-hidden relative">
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

            <div className="card-body p-6 relative z-10">
              <h2 className="card-title text-lg flex gap-2">
                <HiQuestionMarkCircle className="h-6 w-6" />
                ¿Tienes una duda?
              </h2>
              <p className="text-sm opacity-90">
                No te quedes atascado. Comparte tu problema y obtén ayuda de
                expertos.
              </p>
              <button className="btn btn-secondary btn-block mt-4 border-none shadow-lg">
                Hacer una Pregunta
              </button>
            </div>
          </div>

          {/* Card: Etiquetas */}
          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <HiTag className="text-secondary" /> Etiquetas Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-lg badge-ghost hover:bg-base-200 cursor-pointer">
                  machine-learning
                </span>
                <span className="badge badge-lg badge-ghost hover:bg-base-200 cursor-pointer">
                  python
                </span>
                <span className="badge badge-lg badge-ghost hover:bg-base-200 cursor-pointer">
                  nlp
                </span>
                <span className="badge badge-lg badge-ghost hover:bg-base-200 cursor-pointer">
                  huggingface
                </span>
                <span className="badge badge-lg badge-ghost hover:bg-base-200 cursor-pointer">
                  openai
                </span>
              </div>
            </div>
          </div>

          {/* Card: Top Usuarios */}
          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <HiUsers className="text-accent" /> Top Contribuidores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">D</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">DevMaster</span>
                    <span className="text-xs text-base-content/50">
                      1.2k puntos
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">A</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">AI_Wizard</span>
                    <span className="text-xs text-base-content/50">
                      980 puntos
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;

import React from "react";
// Importamos  icono layout base
import { HiChatBubbleLeftRight } from "react-icons/hi2";

// Importamos componentes
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import QuestionCard from "./components/shared/QuestionCard";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-base-200 font-sans text-base-content">
      <Navbar />
      <Hero />

      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 md:py-12 px-4">
        {/* COLUMNA IZQUIERDA: Lista de Preguntas */}
        <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
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

          <div className="flex flex-col gap-4">
            {/* Reutilizamos componente QuestionCard. */}
            <QuestionCard />
            <QuestionCard />
          </div>
        </div>

        {/* COLUMNA DERECHA: Sidebar */}
        <Sidebar />
      </main>
    </div>
  );
}

export default App;

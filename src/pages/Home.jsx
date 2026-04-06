/* 

    contenido exclusivo de la portada

*/

// src/pages/Home.jsx

// dependencias
import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import Hero from "../components/home/Hero";
import QuestionCard from "../components/shared/QuestionCard";

// contenido Exclusivo de la Portada (Home)
const Home = () => {
  return (
    <>
      <div className="space-y-6">
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
          <QuestionCard />
          <QuestionCard />
        </div>
      </div>
    </>
  );
};

// exportamos el Componente Home
export default Home;

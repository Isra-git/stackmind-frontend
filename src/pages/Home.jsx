/* contenido exclusivo de la portada

*/

// src/pages/Home.jsx

// dependencias
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { HiChatBubbleLeftRight } from "react-icons/hi2";

import QuestionCard from "../components/shared/QuestionCard";
import { useQuestions } from "../hooks/useQuestions";

// contenido Exclusivo de la Portada (Home)
const Home = () => {
  // estados del componente
  const [activeTab, setActiveTab] = useState("new");
  const { questions, loading, error } = useQuestions(activeTab);

  // funcion para Renderizar el TItulo de la TAB
  const getTitle = () => {
    if (activeTab == "new") return "Preguntas Recientes";
    if (activeTab == "unanswered") return "Sin Responder";
    if (activeTab == "top") return "Mas Populares";
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-base-300 pb-4">
          <h2 className="text-xl font-mono font-bold flex items-center gap-2">
            <HiChatBubbleLeftRight className="text-primary" />
            {""}
            {getTitle()}
          </h2>
          <div className="tabs tabs-boxed bg-base-100 border border-base-200 p-1">
            <span
              className={`tab ${activeTab === "new" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => setActiveTab("new")}
            >
              Nuevas
            </span>
            <span
              className={`tab ${activeTab === "unanswered" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => setActiveTab("unanswered")}
            >
              Sin responder
            </span>
            <span
              className={`tab ${activeTab === "top" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => setActiveTab("top")}
            >
              Populares
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {error ? (
            <div className="alert alert-error shadow-lg">
              <span>¡Ups! {error}</span>
            </div>
          ) : loading ? (
            <div className="py-20 flex justify-center items-center">
              <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-10 opacity-50 font-medium">
              No hay preguntas en esta categoría todavía.
            </div>
          ) : (
            questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

// exportamos el Componente Home
export default Home;

/* contenido exclusivo de la portada

*/

// src/pages/Home.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { HiChatBubbleLeftRight } from "react-icons/hi2";

import QuestionCard from "../components/shared/QuestionCard";

// contenido Exclusivo de la Portada (Home)
const Home = () => {
  // direccion del backend

  // estados del componente
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("new");

  // funcion para realizar la seleccion de preguntas en base al TAB componente
  const fetchQuestions = async (tipo) => {
    // mostramos spinner + limpiamos errores cuando cambia pestaña de TAB
    setLoading(true);
    setError(null);
    setActiveTab(tipo); // actualizamos el estado de la pestaña activa

    // direccion de la peticion del componente TAB
    let question_endpoint =
      "https://stackmind-api.onrender.com/questions/?skip=0&limit=20";

    try {
      switch (tipo) {
        case "new":
          question_endpoint =
            "https://stackmind-api.onrender.com/questions/?skip=0&limit=20";
          break;

        case "unanswered":
          question_endpoint =
            "https://stackmind-api.onrender.com/questions/unanswered";
          break;
        case "top":
          question_endpoint =
            "https://stackmind-api.onrender.com/questions/top";
          break;
        default:
          question_endpoint =
            "https://stackmind-api.onrender.com/questions/?skip=0&limit=20";
          break;
      }
      // realizamos la peticion
      const response = await fetch(question_endpoint);

      // si Respuesta != ok
      if (!response.ok) {
        throw new Error("Error al obtener las preguntas");
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ejecutamos -> Al cargar la pagina ¡¡
  useEffect(() => {
    fetchQuestions("new");
  }, []);

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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HiChatBubbleLeftRight className="text-primary" />
            {""}
            {getTitle()}
          </h2>
          <div className="tabs tabs-boxed bg-base-100 border border-base-200 p-1">
            <span
              className={`tab ${activeTab === "new" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => fetchQuestions("new")}
            >
              Nuevas
            </span>
            <span
              className={`tab ${activeTab === "unanswered" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => fetchQuestions("unanswered")}
            >
              Sin responder
            </span>
            <span
              className={`tab ${activeTab === "top" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary transition-colors"}`}
              onClick={() => fetchQuestions("top")}
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

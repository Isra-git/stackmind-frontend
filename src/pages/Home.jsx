/* contenido exclusivo de la portada

*/

// src/pages/Home.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import Hero from "../components/home/Hero";
import QuestionCard from "../components/shared/QuestionCard";

// contenido Exclusivo de la Portada (Home)
const Home = () => {
  // direccion del backend
  const question_endpoint =
    "https://stackmind-api.onrender.com/questions/?skip=0&limit=20";

  // estados del componente
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ejecutamos -> Al cargar la pagina ¡¡
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // realizamos la peticion
        const response = await fetch(question_endpoint);

        // si Respuesta != ok
        if (!response.ok) {
          throw new Error("Error al obtener las preguntas");
        }

        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Renderizados Condicionales (mostrar mientras carga o  falla)
  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center gap-4">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

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
          {questions.length === 0 ? (
            <div className="text-center py-10 opacity-50">
              No hay preguntas todavía.
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

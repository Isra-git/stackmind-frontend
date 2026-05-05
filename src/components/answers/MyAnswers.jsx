/* 

    Pagina de My Answers

*/
// src/components/answers/MyAnswers.jsx
import React from "react";
import { useUserAnswers } from "../../hooks/useUserAnswers"; // Ajusta la ruta a tu hook
import { MyAnswersList } from "./MyAnswersList";

export const MyAnswers = () => {
  // Usamos el hook. De momento pedimos 20.
  // (Aquí luego podrías añadir lógica para un paginador si quieres)
  const { answers, loading, error, total } = useUserAnswers(0, 20);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error al cargar tus respuestas: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <span className="w-full flex items-center justify-center mb-10">
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3 self-start">
          StackMind - Comunidad de IA
        </span>
      </span>

      <div className="flex items-center justify-between mb-6 pb-2 border-b border-base-200">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Mis Respuestas
          </h2>
          <p className="text-lg text-base-content/60 mt-1">
            Has contribuido con un total de:
            <span className="font-bold text-primary text-xl">
              {" "}
              {total}{" "}
            </span>{" "}
            respuestas.
          </p>
        </div>
      </div>

      <MyAnswersList answers={answers} />
    </div>
  );
};
export default MyAnswers;

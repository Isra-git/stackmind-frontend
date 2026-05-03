/* 

  Muestra las Preguntas que ha hecho un usuario

*/

// src/components/questions/MyQuestions.jsx

// dependencias
import React from "react";

import { useQuestions } from "../../hooks/useUserQuestions";
import MyQuestionList from "./MyQuestionList";

const MyQuestions = () => {
  // extraemos la lista de Mis PReguntas
  const { questions, setQuestions, loading, error } =
    useQuestions("my_questions");

  if (questions) console.log("Preguntas cargadas:", questions);

  // Funcion que Actualiza el estado -> cuando se Borra una Pregunta
  const handleDeleteFromState = (idDeleted) => {
    // Verificamos si  existe
    if (setQuestions) {
      setQuestions((prevQuestions) =>
        // Si hay preguntas previas, filtramos y quitamos la borrada
        prevQuestions ? prevQuestions.filter((q) => q.id !== idDeleted) : [],
      );
    } else {
      console.warn("Error al Actualizar la Lista de Preguntas");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mb-6 min-h-[60vh] p-8 bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
      <span className="w-full flex items-center justify-center mb-10">
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3 self-start">
          StackMind - Comunidad de IA
        </span>
      </span>

      <h1 className="w-full max-w-2xl mx-auto text-2xl font-bold text-base-content mb-6 text-start">
        Has Realizado estas Preguntas:
      </h1>

      {error && (
        <div className="alert alert-error mb-4">
          <span>Ha habido un error: {error.message || error}</span>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center my-10">
          <div className="loading loading-dots loading-lg text-primary"></div>
          <p className="mt-2">Cargando tus consultas...</p>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto">
        <MyQuestionList
          questions={questions}
          loading={loading}
          error={error}
          onDelete={handleDeleteFromState}
        />
      </div>
    </div>
  );
};

export default MyQuestions;

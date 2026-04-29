/* 

    Pagina de My QUestions

*/

// dependencias
import React from "react";

import { useQuestions } from "../hooks/useUserQuestions";

const MyQuestions = () => {
  // recupertamos las preguntas
  const { questions, loading, error } = useQuestions("my_questions");

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 min-h-[60vh] p-8 text-center bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
      <span className="text-6xl mb-4 animate-bounce">👋</span>

      <h1 className="text-3xl font-bold text-base-content mb-2">¡Hola!</h1>
      {error && <div>Ha habido un error {error}</div>}
      {loading && <div>Cargando...</div>}
      {questions && questions.length > 0 ? (
        <ul className="list-disc list-inside p-2">
          {questions.map((question) => (
            <li key={question.id}>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay preguntas disponibles.</div>
      )}
    </div>
  );
};

export default MyQuestions;

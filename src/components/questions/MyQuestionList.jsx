/* 

    SubComponente de MyQuestions -> Recibe una Lista con las Preguntas del User

*/

//  src/components/questions/MyQuestionList.jsx

// dependencias
import React from "react";

import MyQuestionItem from "../questions/MyQuestionItem";

export default function MyQuestionList({
  questions,
  loading,
  error,
  onDelete,
}) {
  // si hay preguntas
  if (questions && questions.length > 0) {
    return (
      <div className="flex flex-col gap-5">
        {questions.map((question) => (
          <MyQuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  // si no hay Preguntas
  if (!loading && !error) {
    return (
      <div className="text-center opacity-50 mt-10">
        Todavía no has lanzado ninguna pregunta a la comunidad.
      </div>
    );
  }
  // si hay un error
  if (loading || error) {
    return (
      <div className="text-center opacity-50 mt-10">
        Ha ocurrido un error al cargar las preguntas. Por favor, inténtalo de
        nuevo más tarde.
      </div>
    );
  }
}

import React from "react";

import { truncateText } from "../api/helpers";

import { useQuestions } from "../hooks/useUserQuestions";

const MyQuestions = () => {
  const { questions, loading, error } = useQuestions("my_questions");
  console.log(questions);

  // Opcional: Log de depuración fuera del JSX
  if (questions) console.log("Preguntas cargadas:", questions);

  return (
    <div className="flex flex-col w-full mt-6 min-h-[60vh] p-8 bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
      <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3 self-start">
        StackMind - Comunidad de IA
      </span>

      <h1 className="text-2xl font-bold text-base-content mb-6 text-start">
        Has Realizado estas Preguntas:
      </h1>

      {/* Gestion de Errores */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>Ha habido un error: {error.message || error}</span>
        </div>
      )}

      {/* Estado de Carga */}
      {loading && (
        <div className="flex flex-col items-center my-10">
          <div className="loading loading-dots loading-lg text-primary"></div>
          <p className="mt-2">Cargando tus consultas...</p>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto">
        {questions && questions.length > 0 ? (
          <div className="flex flex-col gap-3">
            {questions.map((questions) => (
              <div
                key={questions.id}
                className="collapse collapse-plus bg-base-200 border border-base-300"
              >
                <input type="checkbox" className="peer" />

                <div className="collapse-title text-xl font-medium peer-checked:bg-primary peer-checked:text-primary-content transition-colors">
                  {truncateText(questions.title, 35)}
                </div>

                <div className="collapse-content peer-checked:bg-primary peer-checked:text-primary-content transition-colors">
                  <p className="pt-4 opacity-90">
                    {questions.description || "Sin descripción adicional."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center opacity-50 mt-10">
              Todavía no has lanzado ninguna pregunta a la comunidad.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyQuestions;

/* 

  Muestra las Preguntas que ha hecho un usuario

*/

// src/components/questions/MyQuestions.jsx

// dependencias
import React, { useState } from "react";

import { useQuestions } from "../../hooks/useUserQuestions";
import MyQuestionList from "./MyQuestionList";

const MyQuestions = () => {
  // Estados para Paginar
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  // extraemos la lista de Mis PReguntas
  const { questions, total, loading, error, deleteQuestion } = useQuestions(
    "my_questions",
    skip,
    limit,
  );

  // calculamos el N Pages Total
  const totalPages = Math.ceil((total || 0) / limit);

  // Funciones para Manejar la Paginacion
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  //if (questions) console.log("Preguntas cargadas:", questions);

  // // Funcion que Actualiza el estado -> cuando se Borra una Pregunta
  // const handleDeleteFromState = (idDeleted) => {
  //   // Verificamos si  existe
  //   if (setQuestions) {
  //     setQuestions((prevQuestions) =>
  //       // Si hay preguntas previas, filtramos y quitamos la borrada
  //       prevQuestions ? prevQuestions.filter((q) => q.id !== idDeleted) : [],
  //     );
  //   } else {
  //     console.warn("Error al Actualizar la Lista de Preguntas");
  //   }
  // };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <span className="w-full flex items-center justify-center mb-10">
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3 self-start">
          StackMind - Comunidad de IA
        </span>
      </span>

      <h1 className="w-full  mx-auto text-2xl font-bold text-base-content mb-6 text-start">
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

      <div className="w-full  mx-auto min-h-[400px]">
        <MyQuestionList
          questions={questions}
          loading={loading}
          error={error}
          onDelete={deleteQuestion}
        />
      </div>
      {/*  CONTROLES DE PAGINACIoN DE DAISYUI */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center w-full mt-8">
          <div className="join shadow-sm border border-base-300">
            <button
              className="join-item btn btn-sm hover:bg-base-300"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              « Anterior
            </button>

            <button className="join-item btn btn-sm no-animation bg-base-200 pointer-events-none">
              Página {currentPage} de {totalPages}
            </button>

            <button
              className="join-item btn btn-sm hover:bg-base-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuestions;

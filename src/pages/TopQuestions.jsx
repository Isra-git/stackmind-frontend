/* Página de Preguntas Populares (mas views) con Paginación Dinámica
 */

// src/pages/TopQuestions.jsx

import React, { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import QuestionCard from "../components/shared/QuestionCard";
import {
  HiOutlineTrophy,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const TopQuestions = () => {
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Cálculo matemático para el backend: (página - 1) * cantidad
  const skip = (currentPage - 1) * limit;

  // Extraemos el total para calcular las páginas disponibles
  const { questions, total, loading, error } = useQuestions("top", skip, limit);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 py-6">
      <div className="border-b border-base-300 pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <HiOutlineTrophy className="text-warning" />
          Respuestas Top
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          Explora las {total} consultas con más impacto en la comunidad.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>

          {/* Controles de Paginación con DaisyUI */}
          {total > limit && (
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="join border border-base-300 shadow-sm">
                <button
                  className="join-item btn btn-sm btn-ghost"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <HiOutlineChevronLeft />
                </button>

                <button className="join-item btn btn-sm no-animation bg-base-100">
                  Página {currentPage} de {totalPages}
                </button>

                <button
                  className="join-item btn btn-sm btn-ghost"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <HiOutlineChevronRight />
                </button>
              </div>
              <span className="text-xs opacity-50 italic">
                Mostrando de {skip + 1} a {Math.min(skip + limit, total)} de{" "}
                {total} registros
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TopQuestions;

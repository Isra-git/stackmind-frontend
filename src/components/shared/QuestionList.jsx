/* 

    Subcomponente que Muestra Lista de Respuestas + Tab

*/

// src/components/shared/QuestionList.jsx

//dependencias
import React from "react";
import { Link } from "react-router-dom";

import QuestionCard from "./QuestionCard";

// iconos
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";

const QuestionList = ({
  // Datos y estados
  questions,
  total,
  loading,
  error,

  // Paginación
  currentPage,
  onPageChange,
  limit = 10,

  // Textos e Iconos
  title = "Preguntas Recientes",
  subtitle = "Explora las consultas de la comunidad.",
  Icon = HiOutlineChatBubbleLeftRight,

  // Filtros
  showFilters = false,
  activeFilter = "new",
  onFilterChange = () => {},
}) => {
  // Calculo  para el backend y frontend
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      {/* Cabecera y Filtros */}
      <div className="border-b border-base-300 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <Icon className="text-primary font-mono font-bold text-3xl" />
            {title}
          </h2>
          <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>
        </div>

        {/* Filtros de DaisyUI Tabs*/}
        {showFilters && (
          <div
            role="tablist"
            className="tabs tabs-boxed bg-base-200/50 p-1 shadow-sm"
          >
            <span
              role="tab"
              className={`tab font-medium transition-colors ${activeFilter === "new" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary"}`}
              onClick={() => onFilterChange("new")}
            >
              Nuevas
            </span>

            <span
              role="tab"
              className={`tab font-medium transition-colors ${activeFilter === "unanswered" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary"}`}
              onClick={() => onFilterChange("unanswered")}
            >
              Sin Respuesta
            </span>
            <span
              role="tab"
              className={`tab font-medium transition-colors ${activeFilter === "top" ? "tab-active bg-primary text-white rounded-lg" : "hover:text-primary"}`}
              onClick={() => onFilterChange("top")}
            >
              Populares
            </span>
          </div>
        )}
      </div>

      {/* Manejo de Estados -> Cargando, Error, Vacío, Resultados */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error shadow-sm">
          <span>{error}</span>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
          <p className="text-lg text-color-info/50 italic flex items-center gap-2 justify-center">
            Lo sentimos, No se han encontrado resultados.
          </p>
          <p className="text-lg text-base-content/50 italic flex flex-col items-center gap-2 justify-center">
            Realizar una nueva Busqueda
            <Link to="/">
              <HiMagnifyingGlass className="text-5xl text-primary" />
            </Link>
          </p>
        </div>
      ) : (
        <>
          {/* Mapeo de Tarjetas */}
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
                  className="join-item btn btn-sm btn-ghost hover:bg-base-200"
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <HiOutlineChevronLeft />
                </button>

                <button className="join-item btn btn-sm no-animation bg-base-100 cursor-default">
                  Página {currentPage} de {totalPages}
                </button>

                <button
                  className="join-item btn btn-sm btn-ghost hover:bg-base-200"
                  onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
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

export default QuestionList;

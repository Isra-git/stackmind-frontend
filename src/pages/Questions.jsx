/* 

Página de Preguntas Recientes con Paginación Dinámica


 */
// src/pages/Questions.jsx

// dependencias
import React, { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import QuestionList from "../components/shared/QuestionList";

// iconos
import { HiOutlineFire } from "react-icons/hi2";

const Questions = () => {
  // Estados de Paginación y Filtro
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("new");

  const limit = 10;
  const skip = (currentPage - 1) * limit;

  // Extraemos los datos del hook  pasando el filtro actual
  const { questions, total, loading, error } = useQuestions(
    filter,
    skip,
    limit,
  );

  // Función para manejar el cambio de pestañas (filtros)
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Volvemos a la página 1
  };

  // Textos dinámicos según el filtro
  const getSubtitle = () => {
    switch (filter) {
      case "top":
        return "Viendo las consultas con más participación e interés.";
      case "unanswered":
        return "Sé el primero en ayudar respondiendo estas dudas.";
      default:
        return `Explora las ${total || 0} consultas más recientes de la comunidad.`;
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4">
      <QuestionList
        // Datos
        questions={questions}
        total={total}
        loading={loading}
        error={error}
        // Paginación
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        limit={limit}
        // Textos y Diseño
        title="Explora la Comunidad"
        subtitle={getSubtitle()}
        icon={HiOutlineFire}
        // Filtros activados
        showFilters={true}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Questions;

/*

Página de Búsqueda con Paginación Dinámica 


*/
// src/pages/Search.jsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ENDPOINTS } from "../api/constantes";
import QuestionList from "../components/shared/QuestionList";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Search = () => {
  // Extraer query de la URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Estados de Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  // Estados de Datos
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Volver a la página 1 si el usuario busca una palabra nueva
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Hacer la petición a FastAPI
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          ENDPOINTS.QUESTIONS_SEARCH(query, skip, limit),
        );

        if (!response.ok)
          throw new Error("Error al conectar con la base de datos");

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError(
            "El servidor no devolvió un JSON válido. Revisa la URL.",
          );
        }

        const data = await response.json();
        setResults(data.items || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error de búsqueda:", err);
        setError("No hemos podido cargar los resultados. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, skip, limit]);

  return (
    <div className="container mx-auto max-w-5xl px-4">
      <QuestionList
        // Datos
        questions={results}
        total={total}
        loading={loading}
        error={error}
        // Paginacion
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        limit={limit}
        // Textos y Diseño
        title={
          <>
            Resultados para: <span className="text-info">"{query}"</span>
          </>
        }
        subtitle={`Hemos encontrado ${total} discusiones relacionadas con tu búsqueda.`}
        icon={HiOutlineMagnifyingGlass}
        // En la busqueda quitamos y desactivamos los filtros
        showFilters={false}
      />
    </div>
  );
};

export default Search;

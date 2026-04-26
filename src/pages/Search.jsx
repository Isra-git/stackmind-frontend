/* 

    Pagina Search

*/
// src/pages/Search.jsx

// dependencias
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ENDPOINTS } from "../api/constantes";

// Iconos
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye,
  HiOutlineFaceFrown,
} from "react-icons/hi2";

const Search = () => {
  // Extraemos la palabra buscada de la URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  //  Estados para la información del Backend
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Efecto que llama a FastAPI cada vez que cambia la URL
  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // Le pedimos 20 resultados reales a la API.
        const response = await fetch(ENDPOINTS.QUESTIONS_SEARCH(query, 0, 20));

        if (!response.ok)
          throw new Error("Error al conectar con la base de datos");

        const data = await response.json();

        // Guardamos los datos que  mandó FastAPI
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
  }, [query]);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 animate-fade-in">
      {/* Cabecera  */}
      <div className="mb-8 border-b border-base-200 pb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-base-content">
          <HiOutlineMagnifyingGlass className="text-primary text-4xl" />
          Resultados para: <span className="text-primary">"{query}"</span>
        </h1>
        <p className="mt-2 text-base-content/60 font-medium">
          Hemos encontrado {total} discusiones en la comunidad
        </p>
      </div>

      {/* Manejo de Estados -> Cargando, Error, Vacío, Resultados*/}
      <div className="space-y-4">
        {/* Cargando */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="skeleton h-32 w-full rounded-2xl opacity-50"
              ></div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="alert alert-error shadow-sm rounded-xl">
            <span>{error}</span>
          </div>
        )}

        {/*  Sin Resultados */}
        {!loading && !error && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300 text-center">
            <HiOutlineFaceFrown className="text-6xl text-base-content/20 mb-4" />
            <h3 className="text-xl font-bold text-base-content mb-2">
              No hay resultados exactos
            </h3>
            <p className="text-base-content/60 max-w-md">
              No hemos encontrado preguntas que coincidan con "{query}". Prueba
              a usar términos más generales o busca por etiquetas tecnológicas.
            </p>
          </div>
        )}

        {/*  Mostrar Resultados Reales */}
        {!loading &&
          !error &&
          results.length > 0 &&
          results.map((question) => (
            <Link
              to={`/preguntas/${question.id}`} // O '/preguntas/${question.slug}'
              key={question.id}
              className="card bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="card-body p-6">
                {/* Título de la pregunta */}
                <h2 className="card-title text-xl text-base-content group-hover:text-primary transition-colors line-clamp-2">
                  {question.title}
                </h2>

                {/* Cuerpo de la pregunta -> Trunc a 2 líneas para que no ocupe mucho */}
                <p className="text-base-content/70 mt-2 line-clamp-2 text-sm">
                  {question.body}
                </p>

                {/* Footer de la tarjeta con métricas y autor */}
                <div className="flex flex-wrap items-center justify-between mt-4 gap-4 border-t border-base-200 pt-4">
                  {/* Métricas */}
                  <div className="flex items-center gap-4 text-sm font-medium text-base-content/60">
                    <span className="flex items-center gap-1">
                      <HiOutlineChatBubbleLeftRight className="text-lg" />
                      {question.answers_count} respuestas
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineEye className="text-lg" />
                      {question.views} vistas
                    </span>
                  </div>

                  {/* Info del Autor y Fecha */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-base-content/50">
                      {new Date(question.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full">
                      {/* Avatar placeholder */}
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                      <span className="text-xs font-bold text-base-content">
                        {question.author?.username || "Usuario"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;

/* 

    Pagina Tags

*/

// src/pages/Tags.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ENDPOINTS } from "../api/constantes";

const Tags = () => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);

        // pedir los tags (formato: ia,prompt,pdf..)
        const [popularRes, recentRes] = await Promise.all([
          fetch(ENDPOINTS.TAGS_POPULAR(10)),
          fetch(ENDPOINTS.TAGS_RECENT(12)),
        ]);

        const popularData = popularRes.ok ? await popularRes.json() : [];
        const recentData = recentRes.ok ? await recentRes.json() : [];
        const rawData = [...popularData, ...recentData];

        //  Separar por comas y acumular contadores
        const tagMap = {};

        rawData.forEach((row) => {
          if (row.name) {
            // Separamos por "," y limpiamos espacios
            const palabras = row.name.split(",").map((word) => word.trim());

            palabras.forEach((palabra) => {
              if (palabra) {
                // Sumamos el contador si existe, si no, inicializamos
                tagMap[palabra] = (tagMap[palabra] || 0) + (row.counter || 1);
              }
            });
          }
        });

        //  Convertir a array, ordenar y limitar a los más importantes
        const processedTags = Object.keys(tagMap)
          .map((key) => ({ name: key, counter: tagMap[key] }))
          .sort((a, b) => b.counter - a.counter)
          .slice(0, 20); // Mostramos hasta 20 para que la nube se vea llena

        processedTags.forEach((tag, index) => {
          setTimeout(() => {
            setVisibleTags((prev) => [...prev, tag]);
          }, index * 1600); // 1s entre cada etiqueta para que sea muy visual
        });
      } catch (err) {
        console.error("Error en el procesado de etiquetas:", err);
        setError("Error al conectar con la comunidad.");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Función para redirigir a la busqueda
  const handleTagClick = (tagName) => {
    navigate(`/search?query=${tagName}`);
  };

  // Array de colores soft de DaisyUI -> varia aleatoriamente
  const badgeStyles = [
    "badge-primary",
    "badge-secondary",
    "badge-accent",
    "badge-info",
    "badge-success",
    "badge-warning",
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mt-6 min-h-[60vh] p-10 text-center bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
        {/* Cabecera del componente */}
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3">
          Comunidad de IA en Español
        </span>

        <div className="z-10 mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Explora Temas
          </h1>
          <p className="text-lg text-base-content/70">
            Haz clic en cualquier etiqueta para ver qué está pasando en{" "}
            <span className="font-semibold text-primary">StackMind</span>.
          </p>
        </div>

        {/* Contenedor de las Tags con efecto de aparición */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
          {loading && visibleTags.length === 0 ? (
            <span className="loading loading-dots loading-lg text-primary"></span>
          ) : (
            visibleTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag.name)}
                className={`
          badge badge-lg py-5 px-8 border-2 cursor-pointer transition-all duration-700
          ${badgeStyles[index % badgeStyles.length]} 
          badge-outline hover:badge-ghost hover:scale-110 shadow-sm
          animate-in fade-in zoom-in slide-in-from-bottom-4 // Animación de entrada
        `}
                style={{
                  // Ya no necesitamos animationDelay porque el setTimeout maneja el tiempo
                  transform: `translateY(${index % 2 === 0 ? "15px" : "-15px"})`,
                }}
              >
                # {tag.name}
              </button>
            ))
          )}
        </div>

        {/* Marca de agua  de fondo */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] text-9xl font-black flex items-center justify-center select-none">
          TAGS STACKMIND
        </div>
      </div>
    </>
  );
};

export default Tags;

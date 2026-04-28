/* 

    Pagina Tags

*/

// src/pages/Tags.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ENDPOINTS } from "../api/constantes";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);

        // 1. Pedimos las populares
        const popularRes = await fetch(ENDPOINTS.TAGS_POPULAR(10));
        const popularData = popularRes.ok ? await popularRes.json() : [];

        // 2. Pedimos las recientes (solo cuando termine la anterior)
        const recentRes = await fetch(ENDPOINTS.TAGS_RECENT(10));
        const recentData = recentRes.ok ? await recentRes.json() : [];

        // 3. Combinamos y limpiamos
        const combined = [...popularData, ...recentData];

        // Usamos un Map para asegurar que no haya nombres repetidos
        const uniqueTags = Array.from(
          new Map(combined.map((tag) => [tag.name, tag])).values(),
        );

        setTags(uniqueTags);
      } catch (error) {
        console.error("Error cargando etiquetas:", error);
        setError("No se pudieron cargar las etiquetas");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Función para redirigir a la busqueda
  const handleTagClick = (tagName) => {
    navigate(`/search?q=${tagName}`);
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
    <div className="flex flex-col items-center justify-center w-full mt-6 min-h-[60vh] p-10 text-center bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
      {/* Cabecera del componente */}
      <div className="z-10 mb-8">
        <span className="text-6xl mb-4 block animate-bounce">🏷️</span>
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
        {loading ? (
          <span className="loading loading-dots loading-lg text-primary"></span>
        ) : (
          tags.map((tag, index) => (
            <button
              key={tag.id || index}
              onClick={() => handleTagClick(tag.name)}
              className={`
                badge badge-lg py-4 px-6 border-2 cursor-pointer transition-all duration-500
                ${badgeStyles[index % badgeStyles.length]} 
                badge-outline hover:badge-ghost hover:scale-110
                animate-in fade-in zoom-in duration-1000
              `}
              style={{
                // Simulamos parallax/desorden variando el delay de entrada y un pequeño desplazamiento
                animationDelay: `${index * 150}ms`,
                transform: `translateY(${index % 2 === 0 ? "10px" : "-10px"})`,
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
  );
};

export default Tags;

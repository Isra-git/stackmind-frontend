/* 


    SubComponente de /tags -> Muestra las etiquetas disponibles en la 
     casilla main_concept de bd -> auto-generada por tagUtils.py

*/

// src/components/shared/tagsComponent.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { ENDPOINTS } from "../../api/constantes";

// iconos
import { HiTag } from "react-icons/hi2";

export default function TagsComponent() {
  // estados para-> Datos, Carga, Errores
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // al inciarse, pedimos los datos
  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        // Hacemos la petición  endpoint
        const response = await fetch(ENDPOINTS.TAGS_POPULAR());

        if (!response.ok) {
          throw new Error("No se pudieron cargar las etiquetas");
        }

        const data = await response.json();
        setTags(data);
      } catch (err) {
        console.error("Error cargando tags:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Quitamos el estado de carga ¡¡
      }
    };

    fetchPopularTags(); // ejecutamos la peticion
  }, []);

  return (
    <div className="card bg-base-200 border border-base-300 shadow-sm overflow-hidden flex flex-col animate-fade-in">
      {/* Cabecera verdosa (Accent) */}
      <div className="bg-accent/10 border-b border-accent/10 px-6 py-4 flex items-center gap-2 w-full">
        <HiTag className="h-6 w-6 text-base-content" />
        <h3 className="text-lg font-bold text-accent m-0">
          Etiquetas Populares
        </h3>
      </div>

      {/* Contenedor de las etiquetas */}
      <div className="p-6 w-full flex flex-col min-h-[120px]">
        {/* Cargando Mostramos spinner de DaisyUI*/}
        {loading && (
          <div className="flex flex-wrap gap-2 opacity-50">
            <div className="skeleton h-8 w-24 rounded-full"></div>
            <div className="skeleton h-8 w-20 rounded-full"></div>
            <div className="skeleton h-8 w-28 rounded-full"></div>
            <div className="skeleton h-8 w-16 rounded-full"></div>
          </div>
        )}

        {/* Error Mensaje si el servidor está apagado */}
        {error && !loading && (
          <div className="text-sm text-error/80 italic text-center py-4">
            No pudimos conectar con el motor de etiquetas.
          </div>
        )}

        {/*  Datos ->  Mapeamos el array del backend*/}
        {!loading && !error && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tagObj, index) => (
              <span
                key={index}
                className="badge badge-lg badge-ghost hover:bg-base-300 hover:text-primary transition-colors cursor-pointer border border-base-300 shadow-sm"
                title={`Mencionada ${tagObj.count || 0} veces`} // Tooltip con la frecuencia
              >
                {tagObj.name || tagObj.tag || tagObj}

                {/*  Mostrar el contador al lado de la etiqueta */}
                {tagObj.count && (
                  <span className="ml-2 text-xs opacity-50">
                    ({tagObj.count})
                  </span>
                )}
              </span>
            ))}
          </div>
        )}

        {/*  Vacío -> si la base de datos aún no tiene respuestas */}
        {!loading && !error && tags.length === 0 && (
          <div className="text-sm text-base-content/60 italic text-center py-4">
            Aún no hay etiquetas generadas. ¡Sé el primero en responder!
          </div>
        )}
      </div>
    </div>
  );
}

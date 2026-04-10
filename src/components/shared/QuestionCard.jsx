/* componente de Tarjeta de Pregunta

*/

// src/components/shared/QuestionCard.jsx

// dependencias
import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronUp,
  HiOutlineEye,
} from "react-icons/hi2";

const QuestionCard = ({ question }) => {
  // extraemos las propiedades
  const { id, title, slug, body, views, author_id, created_at, author } =
    question || {};

  // formateamos la fecha
  const formattedDate = new Date(created_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // avatar del author
  let authorAvatar = "/img/avatars/avatar2.png";
  if (author) {
    if (author.is_admin) {
      authorAvatar = "/img/avatars/avatar1.png";
    } else if (author.avatar_url) {
      authorAvatar = `/img/avatars/${author.avatar_url}`;
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md hover:border-primary/30 transition-all duration-200 mb-4 rounded-xl">
      <div className="card-body p-4 sm:p-5 flex-col sm:flex-row gap-4 sm:gap-6">
        {/* LADO IZQUIERDO: Contadores  */}
        <div className="flex sm:flex-col gap-4 sm:gap-2 items-center justify-start sm:min-w-[70px] shrink-0 text-center border-b sm:border-b-0 sm:border-r border-base-200 pb-3 sm:pb-0 sm:pr-4">
          {/* Votos */}
          <div className="flex sm:flex-col items-center gap-1 sm:gap-0">
            <span className="font-semibold text-lg flex items-center gap-1">
              <HiOutlineChevronUp className="text-xl text-base-content/50 hidden sm:block" />
              0
            </span>
            <span className="text-[11px] text-base-content/60 uppercase tracking-wider hidden sm:block">
              votos
            </span>
          </div>

          {/* Respuestas (Verde -> respuestas, gris ->  vacía) */}
          <div className="flex sm:flex-col items-center gap-1 sm:gap-0 px-2 sm:px-0 py-1 rounded sm:rounded-none sm:mt-1 text-base-content/50">
            <span className="font-semibold text-lg sm:text-md flex items-center gap-1">
              <HiOutlineChatBubbleLeftRight className="sm:hidden" />0
            </span>
            <span className="text-[11px] uppercase tracking-wider hidden sm:block">
              respuestas
            </span>
          </div>
        </div>

        {/* LADO DERECHO: Contenido de la Pregunta */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Título enlazado al detalle de la pregunta */}
          <Link
            to={`/questions/${slug || id}`}
            className="text-lg sm:text-xl font-bold text-base-content hover:text-primary transition-colors leading-tight line-clamp-2"
          >
            {title}
          </Link>

          {/* Extracto del contenido (line-clamp-2 corta el texto con ... si es muy largo) */}
          <p className="text-sm text-base-content/70 line-clamp-2">{body}</p>

          {/* Footer de la tarjeta: Tags y Meta del Autor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3 sm:gap-0">
            {/* Lista de Etiquetas */}
            <div className="flex flex-wrap gap-2"></div>

            {/* Información del Autor y Fecha */}
            <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto text-xs text-base-content/60 bg-base-200/50 px-3 py-1.5 rounded-full">
              <div className="avatar hidden sm:block">
                <div className="w-5 h-5 rounded-full ring-1 ring-base-300">
                  <img src={authorAvatar} alt={author?.username || "Anónimo"} />
                </div>
              </div>

              <span className="font-medium text-base-content/80">
                {author?.username || "Usuario Anónimo"}
              </span>

              <span className="hidden sm:inline opacity-50">•</span>

              <span className="opacity-70">preguntó el {formattedDate}</span>

              <span className="hidden sm:inline opacity-50">•</span>
              <span className="opacity-70 flex items-center gap-1">
                <HiOutlineEye className="text-sm" /> {views || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

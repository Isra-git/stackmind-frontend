/* 

SubComponente de My Answers

*/

// src/components/answers/MyAnswerItem.jsx
import React from "react";
import { Link } from "react-router-dom";

import { Preview } from "../editor/Preview";
import { format_date } from "../../api/helpers";
import { HiMiniPencilSquare } from "react-icons/hi2";

export const MyAnswerItem = ({ answer }) => {
  //  Extraemos y validamos el body
  const bodyArray = Array.isArray(answer.body) ? answer.body : [];

  // Cortamos para mostrar solo una vista previa -> las 2 primeras entradas
  const previewSteps = bodyArray.slice(0, 2);
  const remainingSteps = bodyArray.length - 2;

  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-200 mb-4 shadow-sm hover:border-primary/30 transition-colors">
      <input type="checkbox" name={`accordion-answer-${answer.id}`} />

      {/* CABECERA COLLAPSE */}
      <div className="collapse-title text-xl font-medium flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-lg">
              <HiMiniPencilSquare className="h-5 w-5 opacity-70" /> Respuesta
            </span>
            <span className="text-sm opacity-60 font-normal">
              {format_date(new Date(answer.created_at))}
            </span>
          </div>
          {/* Si la respuesta fue aceptada por el autor de la pregunta */}
          {answer.is_accepted && (
            <span className="badge badge-success badge-sm gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Aceptada
            </span>
          )}
        </div>

        {/* Mostramos a q pregunta pertenece  */}
        <p className="text-base font-semibold leading-tight">
          Re: {answer.question?.title || "Pregunta original no disponible"}
        </p>
      </div>

      {/* CONTENIDO DEL COLLAPSE -> al desplegar) */}
      <div className="collapse-content bg-base-200/30 pt-4 border-t border-base-200">
        <div className="pl-2">
          <p className="text-xs text-base-content/60 font-semibold mb-4 uppercase tracking-wider">
            Vista previa de tu respuesta:
          </p>

          {/* Reutilizamos  componente Preview pero  solo los 2 primeros steps */}
          <Preview steps={previewSteps} />

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200 border-dashed">
            <span className="text-sm text-base-content/60 italic">
              {remainingSteps > 0
                ? `+ ${remainingSteps} paso(s) oculto(s)`
                : "Respuesta completa mostrada"}
            </span>

            {/* Boton para ir a ver la respuesta completa  */}
            {answer.question_id && (
              <Link
                to={`/questions/${answer.question_id}#answer-${answer.id}`}
                className="btn btn-sm btn-outline btn-primary"
              >
                Ver en la pregunta
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 

SubComponente de My Answers

*/

// src/components/answers/MyAnswerItem.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Preview } from "../editor/Preview";
import { format_date, truncateText } from "../../api/helpers";

// servicions y contexto
import { useAuth } from "../../context/AuthContext";
import { deleteAnswers } from "../../services/answerService";

import {
  HiMiniPencilSquare,
  HiOutlineArrowRightCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

export const MyAnswerItem = ({ answer, onDelete }) => {
  // instanciamos la navegacion
  const navigate = useNavigate();

  // recuperamos el contexto de Auth
  const { token } = useAuth();

  // estado para mostrar la vista Previa
  const [showPreview, setShowPreview] = useState(false);

  //  Extraemos y validamos el body
  const bodyArray = Array.isArray(answer.body) ? answer.body : [];

  // Cortamos para mostrar solo una vista previa -> las 2 primeras entradas
  const previewSteps = bodyArray.slice(0, 2);
  const remainingSteps = bodyArray.length - 2;

  // Manejamos la Edicion de la Respuesta
  const handleAnswerEdit = () => {
    navigate(`/edit-answer/${answer.id}`);
  };

  // Manejamos el Borrado de la Pregunta
  const handleAnswerDelete = async () => {
    // TODO CONFIRAMACION y Modal
    if (window.confirm("¿Estás seguro de querer eliminar esta respuesta?")) {
      try {
        await deleteAnswers(answer.id, token);
        if (onDelete) onDelete(answer.id); // Avisamos a MyAnswersList
      } catch (error) {
        console.error("Error al borrar:", error.message);
        alert("No se pudo borrar la respuesta: " + error.message);
      }
    }
  };

  // Manejamos mostrar la respuesta
  const handleAnswerSee = () => {
    setShowPreview(!showPreview);
  };
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
          Re:
          {truncateText(answer.question?.title, 80) ||
            "Pregunta original no disponible"}
        </p>
      </div>

      {/* CONTENIDO DEL COLLAPSE -> al desplegar) */}

      <div className="collapse-content bg-base-200/30 pt-4 border-t border-base-200">
        {/* BARRA DE ACCIONES  */}
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 divide-y sm:divide-y-0 sm:divide-x divide-base-300/30 bg-base-100 rounded-lg p-1 border border-base-200/50">
          {/* Ver */}
          <div className="flex justify-center px-1 py-2 sm:py-0">
            <button
              className="btn btn-sm btn-ghost w-full text-accent hover:bg-success/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
              title="Ver en la Pregunta"
              onClick={handleAnswerSee}
              disabled={!answer.question_id}
            >
              <HiOutlineArrowRightCircle className="text-lg" />
              <span className="hidden sm:inline">Ver</span>
            </button>
          </div>

          {/* Editar */}
          <div className="flex justify-center px-1 py-2 sm:py-0">
            <button
              className="btn btn-sm btn-ghost w-full text-info hover:bg-info/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
              title="Editar en StackMindEditor"
              onClick={handleAnswerEdit}
            >
              <HiOutlinePencilSquare className="text-lg" />
              <span className="hidden sm:inline">Editar</span>
            </button>
          </div>

          {/* Borrar */}
          <div className="flex justify-center px-1 py-2 sm:py-0">
            <button
              className="btn btn-sm btn-ghost w-full text-error hover:bg-error/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
              title="Borrar"
              onClick={handleAnswerDelete}
            >
              <HiOutlineTrash className="text-lg" />
              <span className="hidden sm:inline">Borrar</span>
            </button>
          </div>
        </div>
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

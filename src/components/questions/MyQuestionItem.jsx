/* 

    SubComponente de MyQuestions -> Recibe una Pregunta del User y la Muestra 

*/

// src/components/questions/MyQuestionItem.jsx

// dependencias
import React from "react";
import { useNavigate } from "react-router-dom";

import { truncateText, format_date } from "../../api/helpers";

// iconos
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiChatBubbleLeftRight,
  HiOutlineArrowRightCircle,
} from "react-icons/hi2";

const MyQuestionItem = ({ question }) => {
  // Instancia Navegar
  const navigate = useNavigate();

  // maneja Ver Pregunta
  const handleQuestionSee = () => {
    navigate(`/questions/${question.id}`);
  };

  return (
    <div className="collapse collapse-plus mb-4bg-base-300 border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
      <input type="checkbox" className="peer" />
      {/* PREGUNTA ->  */}
      <div className="collapse-title text-xl font-medium peer-checked:bg-base-300 peer-checked:text-secondary-content-content flex justify-between items-center">
        <span className="flex items-center gap-2">
          <span>
            <HiChatBubbleLeftRight className="h-5 w-5 opacity-70" />
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {" "}
            {truncateText(question.title, 35)}
          </span>
        </span>
        <span className="text-sm text-[var(--color-secondary)]">
          {format_date(new Date(question.created_at))}
        </span>
      </div>
      {/* PARTE COLAPSADA -> VISTO / RESPUESTAS / VER /EDITAR / BORRAR  */}
      <div className="collapse-content peer-checked:bg-base-300 peer-checked:text-primary-content">
        <span className="pt-4 opacity-90">
          <div className="grid grid-cols-1 sm:grid-cols-5 items-center mt-3 pt-3 border-t border-base-300/50 divide-x divide-base-300/30">
            <div
              className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-1"
              title="Veces visto"
            >
              <HiOutlineEye className="text-lg text-success" />
              <span>{question.views || 0}</span>
            </div>

            <div
              className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-1"
              title="Respuestas"
            >
              <HiOutlineChatBubbleLeftRight className="text-lg text-warning" />
              <span>{question.answers || 0}</span>
            </div>

            <div className="flex justify-center px-1">
              <button
                className="btn btn-sm btn-ghost w-full text-accent hover:bg-success/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                title="Ver Pregunta"
                onClick={handleQuestionSee}
              >
                <HiOutlineArrowRightCircle className="text-lg" />
                <span className="hidden sm:inline">Ver</span>
              </button>
            </div>

            <div className="flex justify-center px-1">
              <button
                className="btn btn-sm btn-ghost w-full text-info hover:bg-info/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                title="Editar"
              >
                <HiOutlinePencilSquare className="text-lg" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            </div>

            <div className="flex justify-center px-1">
              <button
                className="btn btn-sm btn-ghost w-full text-error hover:bg-error/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                title="Borrar"
              >
                <HiOutlineTrash className="text-lg" />
                <span className="hidden sm:inline">Borrar</span>
              </button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default MyQuestionItem;

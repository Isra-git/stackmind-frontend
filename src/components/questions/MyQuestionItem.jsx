/* 

    SubComponente de MyQuestions -> Recibe una Pregunta del User y la Muestra 

*/

// src/components/questions/MyQuestionItem.jsx

// dependencias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { ENDPOINTS } from "../../api/constantes";
import Modal from "../shared/Modal";

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
import { SiProcessingfoundation } from "react-icons/si";

const MyQuestionItem = ({ question, onDelete }) => {
  // contexto de autenticacion
  const { token, user } = useAuth();

  // Instancia Navegar
  const navigate = useNavigate();

  // estados

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success", // o error
    message: "",
    questionId: null, // para Redirigir¡
  });

  // maneja Ver Pregunta
  const handleQuestionSee = () => {
    navigate(`/questions/${question.id}`);
  };

  // maneja la Edicion de una Pregunta
  const handleQuestionEdit = () => {
    navigate(`/edit-question/${question.id}`);
  };

  // maneja la eliminacion de una pregunta
  const handleQuestionDelete = async () => {
    // Confirmamos ELiminacion por seguridad
    const isConfirmed = window.confirm(
      "¿Estas seguro de querer ELiminar esta Pregunta,  esta accion no se puede deshacer?",
    );
    if (!isConfirmed) return;

    // si el usuario es el dueño o el admin
    if (user.id === question.author_id || user.isAdmin) {
      if (onDelete) {
        const result = await onDelete(question.id);

        if (result.success) {
          setModal({
            isOpen: true,
            type: "success",
            message: "Pregunta eliminada de la comunidad StackMind",
          });
        } else {
          setModal({
            isOpen: true,
            type: "error",
            message: result.error || "Error al intentar eliminar la pregunta",
          });
        }
      }
    } else {
      // Intento borrar sin permiso
      setModal({
        isOpen: true,
        type: "error",
        message: "No tienes Permisos para borrar esta pregunta",
      });
    }
  };

  return (
    <div className="collapse collapse-arrow mb-4 bg-base-100 border border-base-200 shadow-sm  hover:border-primary/30 transition-colors">
      <input type="checkbox" className="peer" />
      {/* PREGUNTA ->  */}
      {/* CABECERA COLLAPSE */}
      <div className="collapse-title text-xl font-medium flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {/* BADGE "PREGUNTA"  */}
            <span className="badge badge-accent badge-lg gap-1">
              <HiChatBubbleLeftRight className="h-5 w-5 opacity-70" /> Pregunta
            </span>
            <span className="text-sm opacity-60 font-normal">
              {format_date(new Date(question.created_at))}
            </span>
          </div>
        </div>

        {/* TÍTULO DE LA PREGUNTA */}
        <p className="text-base font-semibold leading-tight mt-1">
          {truncateText(question.title, 60)}
        </p>
      </div>

      {/* CONTENIDO DEL COLLAPSE  */}
      <div className="collapse-content pl-2 bg-base-200/30 pt-4 border-t border-base-200">
        <div className="pl-2">
          {/* BARRA DE ACCIONES  */}
          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-2 divide-y sm:divide-y-0 sm:divide-x divide-base-300/30">
            {/* Vistas */}
            <div
              className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-2 sm:py-0"
              title="Veces visto"
            >
              <HiOutlineEye className="text-lg text-success" />
              <span>{question.views || 0}</span>
            </div>

            {/* Respuestas */}
            <div
              className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-2 sm:py-0"
              title="Respuestas"
            >
              <HiOutlineChatBubbleLeftRight className="text-lg text-warning" />
              <span>{question.answers_count || 0}</span>
            </div>

            {/* Ver */}
            <div className="flex justify-center px-1 py-2 sm:py-0">
              <button
                className="btn btn-sm btn-ghost w-full text-accent hover:bg-success/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                title="Ver Pregunta"
                onClick={handleQuestionSee}
              >
                <HiOutlineArrowRightCircle className="text-lg" />
                <span className="hidden sm:inline">Ver</span>
              </button>
            </div>

            {/* Editar */}
            <div className="flex justify-center px-1 py-2 sm:py-0">
              <button
                className="btn btn-sm btn-ghost w-full text-info hover:bg-info/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                title="Editar"
                onClick={handleQuestionEdit}
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
                onClick={handleQuestionDelete}
              >
                <HiOutlineTrash className="text-lg" />
                <span className="hidden sm:inline">Borrar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQuestionItem;

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
      try {
        // eliminamos la pregunta
        const response = await fetch(ENDPOINTS.QUESTION_DELETE(question.id), {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // si se elimina correctamente
        if (response.ok) {
          setModal({
            isOpen: true,
            type: "success",
            message: "Pregunta eliminada de la comunidad StackMind",
          });

          // esperamos a que lea el modal
          setTimeout(() => {
            if (onDelete) onDelete(question.id);
          }, 2500);
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error al intentar eliminar la pregunta",
          );
        }
      } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        setModal({
          isOpen: true,
          type: "error",
          message: error.message,
        });
      }
    } else {
      //Intento borrar sin permiso
      setModal({
        isOpen: true,
        type: "error",
        message: "No tienes Permisos para borrar esta pregunta",
      });
    }
  };

  return (
    <div className="collapse collapse-plus mb-4 bg-base-200 border-white/20 shadow-xl hover:bg-base-300 transition-all duration-300">
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
              <span>{question.answers_count || 0}</span>
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
                onClick={handleQuestionEdit}
              >
                <HiOutlinePencilSquare className="text-lg" />
                <span className="hidden sm:inline">Editar</span>
              </button>
            </div>

            <div className="flex justify-center px-1">
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
        </span>
      </div>
    </div>
  );
};

export default MyQuestionItem;

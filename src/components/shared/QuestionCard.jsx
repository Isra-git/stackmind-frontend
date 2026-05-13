/* componente de Tarjeta de Pregunta

*/

// src/components/shared/QuestionCard.jsx

// dependencias
import React, { useState } from "react";
import { Link } from "react-router-dom";

// hook Autenticación
import { useAuth } from "../../context/AuthContext";

import { ENDPOINTS } from "../../api/constantes";
import Modal from "./Modal";
import { format_date, adminAvatar } from "../../api/helpers";

import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye, // vistas
  HiMegaphone, // fecha de publicacion
  HiOutlineChatBubbleBottomCenterText, // responder
  HiMiniTrash, // eliminar -> Admin
  HiCheckCircle,
  HiExclamationCircle,
} from "react-icons/hi2";

const QuestionCard = ({ question, onDelete }) => {
  // extraemos las propiedades
  const {
    id,
    title,
    //slug,
    body,
    views,
    //author_id,
    answers_count,
    created_at,
    author,
  } = question || {};

  // Cogemos los datos del contexto de atuenticacion
  const { user, token } = useAuth();

  // estados para el Modal
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  // Funcion para permitir Borrar una pregunta a un admin

  const handleQuestionDelete = async () => {
    console.log("Token enviado:", token); // Si sale undefined o null, aquí tienes el culpable.

    // Confirmamos ELiminacion por seguridad
    const isConfirmed = window.confirm(
      "¿ADMINISTRADOR: Estas seguro de querer ELiminar esta Pregunta,  esta accion no se puede deshacer?, y se borraran tanto las preguntas como las respuestas asociadas a ella¡¡¡",
    );
    if (!isConfirmed) return;
    // si el usuario es el dueño o el admin
    if (user.id === question.author_id || user.is_admin) {
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
            setModal((prev) => ({ ...prev, isOpen: false }));
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

  // avatar del author
  let authorAvatar = "/img/avatars/0/avatar2.png";
  if (author) {
    if (user.is_admin) {
      authorAvatar = "/img/avatars/0/avatar1.jpeg";
    } else if (author.avatar_url) {
      authorAvatar = `/img/avatars/${author.avatar_url}`;
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md hover:border-primary/30 transition-all duration-200 mb-4 rounded-xl">
      <div className="card-body p-4 sm:p-5 flex-col sm:flex-row gap-4 sm:gap-6">
        {/* LADO IZQUIERDO: Contadores  */}
        <div className="flex sm:flex-col gap-4 sm:gap-2 items-center justify-start sm:min-w-[70px] shrink-0 text-center border-b sm:border-b-0 sm:border-r border-base-200 pb-3 sm:pb-0 sm:pr-4">
          {/* Visitas */}
          <div className="flex flex-col items-center gap-1">
            <HiOutlineEye className="text-sm" />
            <span className="font-semibold text-lg opacity-70">
              {views || 0}
            </span>
          </div>
          {/* Respuestas (Verde -> respuestas, gris -> vacía) */}
          <div
            className={`flex sm:flex-col items-center gap-1 sm:gap-0 px-2 sm:px-0 py-1 rounded sm:rounded-none sm:mt-1 ${answers_count ? "text-green-400" : ""}`}
          >
            <span className="font-semibold text-lg sm:text-md flex items-center gap-1">
              <HiOutlineChatBubbleLeftRight className="sm:hidden" />
              <span className="font-semibold text-lg opacity-70">
                {answers_count ? answers_count : 0}
              </span>
            </span>

            <span className="text-[11px] uppercase tracking-wider hidden sm:block">
              {answers_count ? (
                <Link
                  to={`/questions/${question.id}/${question.slug}`}
                  className="hover:opacity-80"
                >
                  respuestas
                </Link>
              ) : (
                "respuestas"
              )}
            </span>
          </div>
        </div>

        {/* LADO DERECHO: Contenido de la Pregunta */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Título enlazado al detalle de la pregunta */}
          <div className="flex justify-between">
            <Link
              to={`/questions/${question.id}/${question.slug}`}
              className="text-lg sm:text-xl font-bold text-base-content hover:text-primary transition-colors leading-tight line-clamp-2"
            >
              {title}
            </Link>
            <span className="mr-3.5">
              {user?.is_admin && (
                <HiMiniTrash
                  className="text-error text-xl cursor-pointer hover:text-error/70 transition"
                  onClick={handleQuestionDelete}
                />
              )}{" "}
            </span>
          </div>
          {/* Extracto del contenido (line-clamp-2 corta el texto con ... si es muy largo) */}
          <p className="text-sm text-base-content/70 line-clamp-2">{body}</p>

          {/* Footer de la tarjeta: Tags y Meta del Autor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-3 sm:gap-0">
            {/* Lista de Etiquetas */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/questions/${question.id}/${question.slug}`}
                state={{ openEditor: true }}
              >
                <span className="flex items-center gap-2 justify-between hover:text-primary transition-colors">
                  <HiOutlineChatBubbleBottomCenterText className="text-primary" />{" "}
                  Responder
                </span>
              </Link>
            </div>

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

              <span className="opacity-70 flex flex-items-center gap-1">
                <HiMegaphone className="text-[var(--color-info)]" />
                <span> {format_date(new Date(created_at))}</span>
              </span>

              <span className="hidden sm:inline opacity-50">•</span>
            </div>
          </div>
        </div>
      </div>
      {/* RENDERIZADO DEL MODAL */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        icon={
          modal.type === "success" ? (
            <HiCheckCircle className="text-success" />
          ) : (
            <HiExclamationCircle className="text-error" />
          )
        }
        primaryBtnText="Entendido"
        onPrimaryClick={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export default QuestionCard;

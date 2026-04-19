/* 

    Pagina para mostrar la pregunta seleccionada

*/
// src/pages/QuestionDetail.jsx

// dependencias
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ENDPOINTS } from "../api/constantes";
import TopQuestions from "../components/shared/TopQuestions";
import StackMindEditor from "../components/editor/StackMindEditor";

// Iconos
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeftRight,
  HiMegaphone,
  HiOutlineShare,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const QuestionDetail = () => {
  // extraemos las variables de la URL que definimos en el Route
  const { id } = useParams();

  // estados del componente
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // estado de los botones
  const [showEditor, setShowEditor] = useState(false);
  const [sharedText, setSharedText] = useState("Compartir");

  useEffect(() => {
    // construimos la direccion y hacemos la peticion ((id)=>question..)
    const fetchUrl = ENDPOINTS.QUESTION_DETAIL(id);
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Pregunta NO encontrada");
        return res.json();
      })
      .then((data) => {
        setQuestionData(data);
        setLoading(false);
        console.log("Datos de la pregunta: ", data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar la Prgunta");
        setLoading(false);
      });
  }, [id]); // Solo re-ejecutamos si cambia el ID

  // Funcion para Compartir (copia Url a Clipboard)  -> Msg: 2 segundos
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setSharedText("Copiado¡");
    setTimeout(() => setSharedText("Compartir"), 2000);
  };

  // Pantalla de Carga para mostras hasta que lleguen los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // si -> Error o No existe la pregunta
  if (error || !questionData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No encontramos la Pregunta..</h2>
        <Link to="/" className="btn btn-primary mt-4">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Funcion para formatear la fecha
  const formattedDate = new Date(questionData.created_at).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  // imagen del avatar del Dueño de la Pregunta | imagen por defecto
  const authorAvatar = `/img/avatars/${questionData.author?.avatar_url || "avatar2.png"}`;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
      {/* TARJETA PRINCIPAL DE LA PREGUNTA */}
      <div className="card bg-base-100 shadow-sm border border-accent/30 rounded-xl overflow-hidden">
        <div className="card-body p-6 sm:p-8 ">
          {/* Titulo */}
          <h1 className="text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight mb-6">
            {questionData.title}
          </h1>

          {/*  Barra Metadatos (Autor, Fecha, Visitas, Respuestas) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-base-200/50 p-4 rounded-lg border border-base-200/60 text-sm">
            {/* Autor */}
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-1 ring-base-300">
                  <img src={authorAvatar} alt="Avatar" />
                </div>
              </div>
              <span className="font-semibold text-base-content/90">
                {questionData.author?.username}
                {questionData.author?.is_admin && (
                  <span className="badge badge-primary badge-xs ml-2">
                    Admin
                  </span>
                )}
              </span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-base-300"></div>

            {/* Fecha */}
            <div className="flex items-center gap-2 text-base-content/70">
              <HiMegaphone className="text-[var(--color-info)] text-lg" />
              <span>{formattedDate}</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-base-300"></div>

            {/* Visitas */}
            <div className="flex items-center gap-2 text-base-content/70">
              <HiOutlineEye className="text-lg" />
              <span className="font-medium">
                {questionData.views || 0} views
              </span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-base-300"></div>

            {/* Respuestas (Mismo sistema que QUestionCard) */}
            <div
              className={`flex items-center gap-2 font-medium ${questionData.answers_count ? "text-green-500" : "text-base-content/70"}`}
            >
              <HiOutlineChatBubbleLeftRight className="text-lg" />
              <span>{questionData.answers_count || 0} respuestas</span>
            </div>
          </div>

          {/* Cuerpo de la Pregunta */}
          <div className="mt-8">
            <p className="text-lg text-base-content/90 whitespace-pre-wrap leading-relaxed">
              {questionData.body}
            </p>
          </div>

          {/* 4. Botones de Acción */}
          <div className="flex items-center gap-3 mt-10 pt-6 border-t border-base-200">
            <button
              onClick={handleShare}
              className="btn btn-ghost text-base-content/70 hover:text-primary transition-colors"
            >
              <HiOutlineShare className="text-xl" />
              {sharedText}
            </button>

            <button
              onClick={() => setShowEditor(!showEditor)}
              className="btn btn-primary"
            >
              <HiOutlinePencilSquare className="text-xl" />
              {showEditor ? "Cancelar Respuesta" : "Responder"}
            </button>
          </div>
        </div>
      </div>

      {/* ÁREA DEL EDITOR ( solo si se hace clic en Responder) */}
      {showEditor && (
        <div className="animate-fade-in mt-4">
          <div className="p-8 bg-base-200 border border-primary/30 rounded-xl text-center">
            <StackMindEditor questionId={questionData.id} />
          </div>
        </div>
      )}

      {/* LÍNEA ELEGANTE */}
      <div className="divider my-12 text-base-content/40 text-sm font-medium">
        Explora más contenido
      </div>

      <div>
        <div className="text-center  p-4 border border-secondary/30 rounded-lg">
          <TopQuestions />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;

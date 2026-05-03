/* 

    Pagina para Crear o Editar una Pregunta


*/

// src/pages/NewQuestion.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext"; // Contexto AUth
import { ENDPOINTS } from "../api/constantes"; // RUtas Endpoints
import { getTodayDate } from "../api/helpers"; // Fecha de Hoy

// Iconos
import {
  HiOutlineSparkles,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlinePaperAirplane,
  HiOutlinePencil,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";
import { User } from "lucide-react";

const NewQuestion = () => {
  // Cogemos el ID de la Url -> Si tiene para el modo EDitar
  const { id } = useParams();
  const isEditMode = !!id;

  // Estados navegacion y usuario
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // estados del form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //estados para gestionar IA
  const [isImproving, setIsImproving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  // estado Publicado?¿
  const [isPublishing, setIsPublishing] = useState(false);

  // estado para los Modales de Exito / fracaso
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success", // o error
    message: "",
    questionId: null, // para Redirigir¡
  });

  //  si estamos en MoDO Edicion -> Cargamos los datos
  useEffect(() => {
    if (isEditMode && token) {
      const fetchQuestionData = async () => {
        try {
          const response = await fetch(ENDPOINTS.QUESTION_DETAIL(id));

          if (response.ok) {
            const data = await response.json();

            // si no es el autor de la Pregunta
            if (data.author_id !== user?.id) {
              console.warn("Intento de Edicion NO AUTORIZADO");
              navigate("/questions", { replace: true });
              return;
            }
            setTitle(data.title);
            setBody(data.body);
          } else {
            navigate("/404");
          }
        } catch (err) {
          console.error("Error al cargar los datos de la pregunta:", err);
        }
      };

      fetchQuestionData();
    }
  }, [id, isEditMode, token, navigate]);

  // Funcion para pedirle a la IA que mejore la pregunta
  const handleImproveWithAI = async (e) => {
    if (e) e.preventDefault();

    // comprobamos que los campos no esten vacios
    if (!body.trim()) return;
    setIsImproving(true);

    try {
      // llamamos a la api (AI_ENHANCE: `${API_BASE}/ai/enhance-question`)
      //  para mejorar la Pregunta del usuario
      const response = await fetch(ENDPOINTS.AI_ENHANCE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ raw_text: body }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestion(data.enhanced_text);
      } else {
        const error = await response.json();
        setModal({
          isOpen: true,
          type: "error",
          message: error.message || "Error al intentar mejorar con la IA",
        });
      }
    } catch (err) {
      console.log("Error al Conectar con la IA: ", err);
      setModal({
        isOpen: true,
        type: "error",
        message: err || "Error al intentar conectar con la IA",
      });
    } finally {
      setIsImproving(false);
    }
  };

  // Funcion para manejar -> Aceptar la sugerencia de la IA
  const acceptAiSuggestion = () => {
    // asignamos el nuevo  Body

    setBody(aiSuggestion);

    // limpiamos la sugerencia
    setAiSuggestion(null);
  };

  // Funcion para manejar -> Rechaza la sugerencia de la IA
  const rejectAiSuggestion = () => {
    setAiSuggestion(null);
  };

  // Funcion para Publicar o Atualizar la pregunta
  const handlePublish = async (e) => {
    if (e) e.preventDefault();

    //modificamos el estado
    setIsPublishing(true);

    // Preparamos el Titulo -> SI se EDITA Añadimos Cabecera [Editado + fecha]
    let finalTitle = title;
    if (isEditMode) {
      const dateTag = `[Actualizado ${getTodayDate()}]`;

      // lo añadimos si no esta -> evitar duplicados
      if (!title.includes("[Actualizado")) {
        finalTitle = `${title} ${dateTag}`;
      } else {
        // si esta -> cambia la fecha vieja por la nueva
        finalTitle = title.replace(/\[Actualizado .*?\]/, dateTag);
      }
    }
    // Configuramos la Url segun operacion -> Crear o Editar
    const url = isEditMode
      ? ENDPOINTS.QUESTION_UPDATE(id) // editar (put)
      : ENDPOINTS.QUESTIONS_CREATE; // crear nuevo

    // configuramos el metodo
    const method = isEditMode ? "PUT" : "POST";

    // enviamos la Pregunta
    try {
      //hacemos la peticion
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: finalTitle,
          body,
        }),
      });

      // si no ha ido bien
      if (!response.ok)
        throw new Error(
          isEditMode ? "Error al Actualizar" : "Error al publicar",
        );

      // leemos la respuesta
      const newQuestion = await response.json();

      // abrimos el Modal de Completado
      setModal({
        isOpen: true,
        type: "success",
        message: isEditMode
          ? "Tu Pregunta ha sido publicada con exito!"
          : "¡Tu Pregunta ha sido publicada con exito!",
        questionId: isEditMode ? id : newQuestion.id,
      });

      // // llevamos a su nueva pregunta -> Publicada
      // navigate(`/questions/${newQuestion.id}`);

      // limpiamos los campos
      setTitle("");
      setBody("");
    } catch (err) {
      console.log("Error al publicar la respuesta", err);
      setModal({
        isOpen: true,
        type: "error",
        message: err.message,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 animate-fade-in">
      {/* MODAL DAISYUI  */}
      {modal.isOpen && (
        <div className="modal modal-open modal-bottom sm:modal-middle bg-base-300/60 backdrop-blur-sm z-50">
          <div className="modal-box bg-base-100 shadow-2xl border border-base-300">
            <div className="flex flex-col items-center text-center space-y-4 py-4">
              {modal.type === "success" ? (
                <HiOutlineCheckCircle className="text-7xl text-success animate-bounce" />
              ) : (
                <HiOutlineExclamationCircle className="text-7xl text-error animate-pulse" />
              )}

              <h3 className="font-bold text-2xl text-base-content">
                {modal.type === "success"
                  ? isEditMode
                    ? "¡Cambios Guardados!"
                    : "¡Pregunta Guardada!"
                  : "Ups, algo salió mal"}
              </h3>
              <p className="text-base-content/80 text-lg">{modal.message}</p>
            </div>

            <div className="modal-action w-full mt-6">
              {modal.type === "success" ? (
                // Si hay éxito, el botón nos lleva a la pregunta
                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate(`/questions/${modal.questionId}`)}
                >
                  Ver mi pregunta
                </button>
              ) : (
                // Si hay error, el botón cierra el modal para seguir intentandolo
                <button
                  className="btn btn-outline w-full"
                  onClick={() => setModal({ ...modal, isOpen: false })}
                >
                  Volver al editor
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-4xl tracking-[3px] pb-2 flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {isEditMode
            ? "Edita tu Pregunta "
            : "Haz una pregunta a la comunidad"}
        </h1>
        <p className="mt-4 text-lg text-base-content/90 whitespace-pre-wrap leading-relaxed">
          {isEditMode
            ? "Ajusta los detalles de tu pregunta para obtener una mejor respuesta"
            : "Explica tu duda de forma sencilla. Nuestra IA te ayudará a darle un formato técnico si lo necesitas."}
        </p>
      </div>

      {/* MODO COMPARACIÓN ->Si hay sugerencia de la IA*/}
      {aiSuggestion ? (
        <div className="space-y-6">
          <div className="alert alert-info bg-info/10 text-info border-info/20 shadow-sm">
            <HiOutlineSparkles className="text-xl" />
            <span>
              La IA ha analizado tu pregunta. ¿Con cuál versión prefieres
              quedarte para publicar?
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta: Versión Original */}
            <div className="card bg-base-200 border border-base-300 opacity-70 hover:opacity-100 transition-opacity">
              <div className="card-body">
                <h2 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-2">
                  Tu versión original
                </h2>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="whitespace-pre-wrap text-sm mt-2">{body}</p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={rejectAiSuggestion}
                    className="btn btn-ghost btn-sm text-base-content/70"
                  >
                    <HiOutlineXMark /> Mantener la mía
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta */}
            <div className="card bg-primary/5 border border-primary/20 shadow-md">
              <div className="card-body">
                <h2 className="text-sm font-bold uppercase text-primary flex items-center gap-2 mb-2">
                  <HiOutlineSparkles /> Explicación Optimizada
                </h2>
                {/* Quitamos el .title y .body, usamos aiSuggestion directamente */}
                <h3 className="text-lg font-bold text-base-content">
                  {title} {/* TITULO */}
                </h3>
                <p className="whitespace-pre-wrap text-sm mt-2">
                  {aiSuggestion}
                </p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={acceptAiSuggestion}
                    className="btn btn-primary btn-sm"
                  >
                    <HiOutlineCheck /> Usar esta descripción
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 
          MODO EDICIÓN ->Formulario normal
           */
        <div className="space-y-6 bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm">
          {/* Título */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text font-medium text-base-content/80 text-lg">
                Resumen de tu duda
              </span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                <HiOutlinePencil className="text-base-content/50 text-xl group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="w-full h-14 pl-12 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-lg"
                placeholder="Ej: ¿Hay alguna IA gratuita que me haga resúmenes de PDFs largos?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
              />
            </div>
          </div>

          {/* Cuerpo de la pregunta (Simple Textarea con aspecto de editor) */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text font-medium text-base-content/80 text-lg">
                Detalles (Explica tu situación)
              </span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 pt-4 flex items-start pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                <HiOutlineDocumentText className="text-base-content/50 text-xl group-focus-within:text-primary transition-colors" />
              </div>
              <textarea
                className="w-full min-h-[250px] pl-12 pr-4 py-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base leading-relaxed resize-y"
                placeholder="Hola comunidad, soy estudiante de derecho y tengo que leerme decenas de sentencias a la semana. Conozco ChatGPT pero no me deja subir archivos en la versión gratis. ¿Existe alguna herramienta sencilla y gratuita para esto? Gracias."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Botonera inferior */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-base-200">
            {/* Botón Mejorar con la IA */}
            <button
              type="button"
              onClick={handleImproveWithAI}
              disabled={isImproving || !body?.trim()}
              className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform w-full sm:w-auto"
            >
              {isImproving ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Analizando...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="text-lg" /> Mejorar mi pregunta
                  con IA
                </>
              )}
            </button>

            {/* Botón de Publicar Directo */}
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing || !title?.trim() || !body?.trim()}
              className="btn btn-primary w-full sm:w-auto"
            >
              {isPublishing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>{" "}
                  Publicando...
                </>
              ) : (
                <>
                  <HiOutlinePaperAirplane className="text-lg" /> Publicar sin
                  cambios
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewQuestion;

/* 

    Pagina para mostrar la pregunta seleccionada

*/
// src/pages/QuestionDetail.jsx

// dependencias
import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { ENDPOINTS } from "../api/constantes";
import TopQuestions from "../components/shared/TopQuestions";
import StackMindEditor from "../components/editor/StackMindEditor";
import { Preview } from "../components/editor/Preview";
import { format_date, adminAvatar } from "../api/helpers";

import { useUserAnswers } from "../hooks/useUserAnswers";
import { useAuth } from "../context/AuthContext";
import { useVoteAnswer } from "../hooks/useVoteAnswers";

import Modal from "../components/shared/Modal";

// Iconos
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeftRight,
  HiMegaphone,
  HiOutlineShare,
  HiOutlinePencilSquare,
  HiCheckCircle,
  HiMiniTrash,
  HiExclamationCircle,
} from "react-icons/hi2";

const QuestionDetail = () => {
  // navegacion
  const navigate = useNavigate();

  // extraemos las variables de la URL que definimos en el Route
  const { id } = useParams();
  const location = useLocation(); // cuando viene de Responder/QuestionCard

  // estraemos el usuario del contexto y la funcion de borrar
  const { user } = useAuth();
  const { deleteAnswer } = useUserAnswers();

  // estados del componente
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);

  // estado de los botones y feedback visual
  const [showEditor, setShowEditor] = useState(false);
  const [sharedText, setSharedText] = useState("Compartir");
  const [feedback, setFeedback] = useState(null);

  // estados para el Modal
  const [modal, setModal] = useState({
    isOpen: false,
    type: "warning", // 'warning' (confirmación) o 'success'
    title: "",
    message: "",
    answerIdToDelete: null,
  });

  // estados para el sistema de Votos
  const { vote, isVoting } = useVoteAnswer();
  const [stagedVotes, setStagedVotes] = useState({});

  // Para convertir el numero de estrellas en el texto a Mostrar
  const getVoteLabel = (score) => {
    switch (score) {
      case 1:
        return "No me ayudó";
      case 2:
        return "Me ayudó en parte";
      case 3:
        return "Me ayudó";
      case 4:
        return "Me fue de gran ayuda";
      default:
        return "Selecciona una valoración";
    }
  };

  // Funcion para convertir Estrellas en Puntos
  const getStarsFromPoints = (points) => {
    if (points === -1) return 1;
    if (points === 1) return 2;
    if (points === 3) return 3;
    if (points === 7) return 4;
    return 0;
  };

  // Funcion para manejar cuando Clikan en las Estrellas
  const handleVoteSubmit = async (answerId) => {
    const scoreToSend = stagedVotes[answerId];
    if (!scoreToSend) return;

    const updatedAnswer = await vote(answerId, scoreToSend);

    if (updatedAnswer) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((ans) => (ans.id === answerId ? updatedAnswer : ans)),
      );
      setFeedback("¡Gracias por valorar la respuesta!");
    }
  };

  // Funcion para Cargar la Pregunta y las  Respuestas
  const fetchQuestionsAndAnswers = async () => {
    try {
      // pedimos la pregunta
      const questionResponse = await fetch(ENDPOINTS.QUESTION_DETAIL(id));
      if (!questionResponse.ok) throw new Error("Pregunta No encontrada");
      const questionData = await questionResponse.json();
      setQuestionData(questionData);

      // pedimos la respuesta
      const answerResponse = await fetch(ENDPOINTS.ANSWERS_BY_QUESTION(id));
      if (answerResponse.ok) {
        const answersData = await answerResponse.json();
        setAnswers(answersData);
      }
    } catch (error) {
      console.log(error);
      setError("No hay respuestas para esta pregunta");
    } finally {
      setLoading(false);
    }
  };

  // Ejecutamos la funcion cada vez que cambiamos la pregunta (id)
  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, [id]); // Solo re-ejecutamos si cambia el ID

  // Escucha si venimos desde el botón Responder -> QuestionCard
  useEffect(() => {
    if (location.state?.openEditor) {
      // Abrimos el editor
      setShowEditor(true);

      //  Esperamos un poquito a que React dibuje el editor, y bajamos la pantalla
      setTimeout(() => {
        const editorElement = document.getElementById("seccion-editor");
        if (editorElement) {
          editorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500);
    }
  }, [location.state]);

  // Maneja el scroll automático al hash (#answer-ID)
  useEffect(() => {
    // Solo  si no estamos cargando y hay un hash en la URL
    if (!loading && location.hash) {
      const idHash = location.hash.replace("#", ""); // obtener el ID real

      // asegura que React ha terminado de pintar las respuestas en Dom
      const timer = setTimeout(() => {
        const element = document.getElementById(idHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // Efecto visual
          element.classList.add("ring-2", "ring-primary", "duration-500");
          setTimeout(
            () => element.classList.remove("ring-2", "ring-primary"),
            2000,
          );
        }
      }, 300); // suficiente para el renderizado

      return () => clearTimeout(timer);
    }
  }, [loading, location.hash, answers]); // Se activa al cargar, cambiar hash o recibir respuestas

  // Funcion para Compartir (copia Url a Clipboard)  -> Msg: 2 segundos
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setSharedText("Copiado¡");
    setTimeout(() => setSharedText("Compartir"), 2000);
  };

  // Funcion para despues de Publicar una Respuesta
  const handleAnswerSuccess = () => {
    setShowEditor(false);
    setFeedback("Respuesta publicada con éxito!");
    fetchQuestionsAndAnswers(); // Recargamos para ver la Respuesta Añadida
  };

  // logica del modal para Confirm. Borrado
  const handleInitiateDelete = (answerId) => {
    setModal({
      isOpen: true,
      type: "warning",
      title: "Eliminar Respuesta",
      message:
        "¿Estás seguro de que quieres eliminar esta respuesta? Esta acción no se puede deshacer.",
      answerIdToDelete: answerId,
    });
  };

  // logica Modal para Realizar el Borrado
  const handleConfirmDelete = async () => {
    const { success, error } = await deleteAnswer(modal.answerIdToDelete);

    if (success) {
      setModal({
        isOpen: true,
        type: "success",
        title: "Respuesta Eliminada",
        message: "La respuesta ha sido borrada de la comunidad StackMind.",
        answerIdToDelete: null,
      });

      // Recargamos la info después de borrar
      fetchQuestionsAndAnswers();

      // Cerramos el modal de éxito a los 2.5 seg
      setTimeout(() => {
        setModal((prev) => ({ ...prev, isOpen: false }));
      }, 2500);
    } else {
      setModal({
        isOpen: true,
        type: "error",
        title: "Error al borrar",
        message: error || "No se pudo eliminar la respuesta.",
        answerIdToDelete: null,
      });
    }
  };

  // Controlamos  el estado ->feedback y lo limpia a los 4 segundos
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 4000);

      // Función de limpieza para que no queden  en la memoria
      return () => clearTimeout(timer);
    }
  }, [feedback]);

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

  // imagen del avatar del Dueño de la Pregunta | imagen por defecto

  // avatar del author
  let authorAvatar = "/img/avatars/0/avatar2.png";
  if (questionData?.author) {
    if (user?.is_admin && user?.id == questionData.author.id) {
      authorAvatar = adminAvatar;
    } else if (questionData.author.avatar_url) {
      authorAvatar = `/img/avatars/${questionData.author.avatar_url}`;
    }
  }
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
      {/* FEEDBACK PUBLICAR RESPUESTA->  Toast de Éxito */}
      {feedback && (
        <div className="toast toast-top toast-center z-50 animate-fade-in">
          <div className="alert alert-success shadow-lg text-white">
            <HiCheckCircle className="text-2xl" />
            <span>{feedback}</span>
          </div>
        </div>
      )}

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
              <span>{format_date(new Date(questionData.created_at))}</span>
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

          {/* Botones de Acción */}
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

      {/* AREA DEL EDITOR ( solo si se hace clic en Responder) */}
      {showEditor && (
        <div id="seccion-editor" className="animate-fade-in mt-4">
          <div className="p-8 bg-base-200 border border-primary/30 rounded-xl text-center">
            <StackMindEditor
              questionId={questionData.id}
              onSuccess={handleAnswerSuccess}
            />
          </div>
        </div>
      )}

      {/*  MOSTRAMOS RESPUESTAS */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-base-content border-b border-base-200 pb-3">
          {answers.length} {answers.length === 1 ? "Respuesta" : "Respuestas"}
        </h2>

        {answers.length === 0 ? (
          <div className="text-center py-10 opacity-60 bg-base-200/30 rounded-xl border border-dashed border-base-300">
            <p className="text-lg">Aún no hay respuestas.</p>
            <p className="text-sm">¡Se el Primero en Responder!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {answers.map((answer) => {
              const ansDate = new Date(answer.created_at).toLocaleDateString(
                "es-ES",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              );

              // imagen del avatar
              const answerAvatar = answer.author?.is_admin
                ? adminAvatar
                : `/img/avatars/${answer.author?.avatar_url || "avatar2.png"}`;

              // comprobamos SI ha Permisos para VOtar
              const isQuestionAuthor = user?.id === questionData.author?.id;
              const isMyOwnAnswer = user?.id === answer.author_id;
              const canVote = isQuestionAuthor && !isMyOwnAnswer;

              return (
                <div
                  key={answer.id}
                  id={`answer-${answer.id}`} // Ver Respuesta --> Te lleva hasta aqui
                  className="card bg-base-100 shadow-sm border border-base-200 rounded-xl"
                >
                  <div className="card-body p-6">
                    <div className="flex items-center gap-3 mb-6 justify-between">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring-1 ring-base-300">
                            <img src={answerAvatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content/90">
                            {answer.author?.username || "Usuario"}
                            {answer.author?.is_admin && (
                              <span className="badge badge-primary badge-xs ml-2">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-base-content/60">
                            Respondido el {ansDate}
                          </div>
                        </div>
                      </div>
                      {/* BORRADO: Solo admin o dueño */}
                      {(user?.is_admin || user?.id === answer.author_id) && (
                        <button
                          onClick={() => handleInitiateDelete(answer.id)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                          title="Eliminar respuesta"
                        >
                          <HiMiniTrash className="text-xl" />
                        </button>
                      )}
                    </div>

                    {/* Renderizamos el JSONB a traves del subComponente  Preview */}
                    <div
                      className="bg-base-200/40 p-4 rounded-lg text-base-content text-left"
                      data-theme="dark"
                    >
                      <div className="bg-base-200/40 p-4 rounded-lg">
                        <Preview steps={answer.body} />
                      </div>
                    </div>

                    {/* Votacion -> */}

                    {(() => {
                      const isQuestionAuthor =
                        user?.id === questionData.author?.id;
                      const isMyOwnAnswer = user?.id === answer.author_id;

                      const hasVoted =
                        answer.rating !== 0 && answer.rating !== null;
                      const canVote =
                        isQuestionAuthor && !isMyOwnAnswer && !hasVoted;

                      const currentStagedStars = stagedVotes[answer.id] || 0;
                      const starsToDisplay = hasVoted
                        ? getStarsFromPoints(answer.rating)
                        : currentStagedStars;

                      const getDynamicLabel = () => {
                        if (hasVoted) return getVoteLabel(starsToDisplay);
                        if (canVote && currentStagedStars > 0)
                          return getVoteLabel(currentStagedStars);
                        if (canVote) return "¿Te sirvió esta solución?";
                        return "Esperando valoración del autor";
                      };

                      return (
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center bg-base-200/30 p-4 rounded-xl border border-base-300 gap-6 transition-all text-center">
                          {/* Contenedor ->  */}
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <span className="text-sm font-semibold text-base-content/70">
                              {hasVoted
                                ? "Valoración de la comunidad:"
                                : "Estado:"}
                            </span>

                            <div className="rating rating-md">
                              {[1, 2, 3, 4].map((star) => (
                                <input
                                  key={star}
                                  type="radio"
                                  name={`rating-${answer.id}`}
                                  className={`mask mask-star-2 transition-all duration-300 ${
                                    starsToDisplay >= star
                                      ? "bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 opacity-100"
                                      : "bg-base-content/20 opacity-40"
                                  } ${hasVoted || !canVote ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
                                  checked={starsToDisplay === star}
                                  onChange={() => {
                                    if (canVote) {
                                      setStagedVotes((prev) => ({
                                        ...prev,
                                        [answer.id]: star,
                                      }));
                                    }
                                  }}
                                  disabled={!canVote || isVoting}
                                />
                              ))}
                            </div>

                            <span
                              className={`text-sm transition-all duration-300 ${
                                starsToDisplay > 0 || hasVoted
                                  ? "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold"
                                  : "text-base-content/40 font-medium italic"
                              }`}
                            >
                              {getDynamicLabel()}
                            </span>
                          </div>

                          {canVote && currentStagedStars > 0 && (
                            <button
                              onClick={() => handleVoteSubmit(answer.id)}
                              disabled={isVoting}
                              className="btn btn-sm text-white border-0 bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-md animate-fade-in"
                            >
                              {isVoting ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                "Enviar Votación"
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })()}
                    {/* fin sistema de Votacion  */}

                    {answer.main_concept && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-base-200/50">
                        <span className="text-xs font-semibold opacity-50 uppercase tracking-wider flex items-center mr-2">
                          Conceptos clave:
                        </span>
                        {answer.main_concept.split(",").map((tag, index) => (
                          <div
                            key={index}
                            className="badge badge-primary badge-outline badge-sm font-medium cursor-pointer"
                            onClick={() => {
                              const cleanTag = tag.trim();
                              const urlTag = encodeURIComponent(cleanTag);
                              navigate(`/search?query=${urlTag}`);
                            }}
                          >
                            {tag.trim()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LINEA SEPARADORA DE CONTENIDO */}
      <div className="divider my-12 text-base-content/40 text-sm font-medium">
        Explora más contenido
      </div>

      <div>
        <div className="text-center  p-4 border border-secondary/30 rounded-lg">
          <TopQuestions />
        </div>
      </div>
      {/*  RENDERIZADO DEL MODAL */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        icon={
          modal.type === "success" ? (
            <HiCheckCircle className="text-success" />
          ) : modal.type === "error" ? (
            <HiExclamationCircle className="text-error" />
          ) : (
            <HiExclamationCircle className="text-warning" />
          )
        }
        // Si el tipo es warning: confirm. previa a borrar -> mostramos ambos botones
        primaryBtnText={modal.type === "warning" ? "Sí, Eliminar" : "Entendido"}
        onPrimaryClick={
          modal.type === "warning"
            ? handleConfirmDelete
            : () => setModal({ ...modal, isOpen: false })
        }
        secondaryBtnText={modal.type === "warning" ? "Cancelar" : null}
        onSecondaryClick={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
};

export default QuestionDetail;

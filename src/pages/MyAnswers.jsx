/* 

    Pagina de My Answers

*/

// dependencias
import React from "react";

import { truncateText, format_date } from "../api/helpers";
import { useUserAnswers } from "../hooks/useUserAnswers";

// return { answers, setAnswers, total, loading, error };
//   // devolvemos todo empaquetado -> answers, loading, error

// iconos
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

const MyAnswers = () => {
  const { answers, setAnswers, total, loading, error } = useUserAnswers();

  //  Log de depuracion fuera del JSX
  if (answers) console.log("Respuestas cargadas:", answers);

  return (
    <div className="flex flex-col items-center w-full mb-6 min-h-[60vh] p-8 bg-base-100 rounded-box shadow-sm border border-base-200 overflow-hidden relative">
      <span className="w-full flex items-center justify-center mb-10">
        <span className="badge badge-primary badge-outline mb-4 font-bold tracking-wider text-xs uppercase p-3 self-start">
          StackMind - Comunidad de IA
        </span>
      </span>

      <h1 className="w-full max-w-2xl mx-auto text-2xl font-bold text-base-content mb-6 text-start">
        Has Ayudado con estas Respuestas:
      </h1>

      {/* Gestion de Errores */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>Ha habido un error: {error.message || error}</span>
        </div>
      )}

      {/* Estado de Carga */}
      {loading && (
        <div className="flex flex-col items-center my-10">
          <div className="loading loading-dots loading-lg text-primary"></div>
          <p className="mt-2">Cargando tus Respuestas...</p>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto">
        {answers && answers.length > 0 ? (
          <div className="flex flex-col gap-3">
            {answers.map((answers) => (
              <div
                key={answers.id}
                className="collapse collapse-plus mb-4 
             bg-white/10 backdrop-blur-md 
             border border-white/20 shadow-xl 
             hover:bg-white/20 transition-all duration-300"
              >
                <input type="checkbox" className="peer" />

                <div className="collapse-title text-xl font-medium peer-checked:bg-base-300 peer-checked:text-primary-content flex justify-between items-center">
                  <span> {truncateText(answers.title, 35)}</span>
                  <span className="text-sm text-[var(--color-secondary)]">
                    {format_date(new Date(answers.created_at))}
                  </span>
                </div>

                <div className="collapse-content peer-checked:bg-base-300 peer-checked:text-primary-content">
                  <span className="pt-4 opacity-90">
                    {
                      <div className="grid grid-cols-4 items-center mt-3 pt-3 border-t border-base-300/50 divide-x divide-base-300/30">
                        {/* VISTAS */}
                        <div
                          className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-1"
                          title="Veces visto"
                        >
                          <HiOutlineEye className="text-lg text-success" />
                          <span>{answers.views || 0}</span>
                        </div>

                        {/*RESPUESTAS */}
                        <div
                          className="flex justify-center items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-base-content transition-colors py-1"
                          title="Respuestas"
                        >
                          <HiOutlineChatBubbleLeftRight className="text-lg text-warning" />
                          <span>{answers.answers || 0}</span>
                        </div>

                        {/* EDITAR */}
                        <div className="flex justify-center px-1">
                          <button
                            className="btn btn-sm btn-ghost w-full text-info hover:bg-info/10 flex items-center justify-center gap-2 rounded-lg font-normal text-sm"
                            title="Editar"
                          >
                            <HiOutlinePencilSquare className="text-lg" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                        </div>

                        {/* BORRAR */}
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
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="text-center opacity-50 mt-10">
              Todavía no has lanzado ninguna pregunta a la comunidad.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyAnswers;

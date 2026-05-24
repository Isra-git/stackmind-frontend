/* 

    SubComponente de Actividad Reciente

*/

// src/components/shared/RecentActivityCard.jsx

import React from "react";
import { Link } from "react-router-dom";

// Importamos hooks y helpers
import { useUserAnswers } from "../hooks/useUserAnswers";

import { useQuestions } from "../hooks/useUserQuestions";
import { truncateText, format_date } from "../api/helpers";

// Iconos
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export default function MeRecentActivity() {
  // Pedimos solo  3 registros de cada uno
  const { answers, loading: aLoading } = useUserAnswers(0, 3);
  const { questions, loading: qLoading } = useQuestions("my_questions", 0, 3);

  const isLoading = aLoading || qLoading;

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body flex items-center justify-center py-10">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      </div>
    );
  }

  // Comprobamos si hay actividad en general
  const hasActivity = questions?.length > 0 || answers?.length > 0;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
      <div className="card-body p-0">
        <div className="p-6 pb-0">
          <h3 className="text-xl font-bold border-b border-base-200 pb-3 mb-0">
            Actividad Reciente
          </h3>
        </div>

        {!hasActivity ? (
          <div className="flex flex-col items-center justify-center py-12 text-base-content/40 text-center px-6">
            <HiOutlineChatBubbleLeftRight className="text-5xl mb-3 opacity-20" />
            <p className="font-medium">Aún no hay actividad registrada.</p>
            <p className="text-sm mt-1">
              ¡Comienza a interactuar con la comunidad!
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* SECCIoN PREGUNTAS */}
            <div className="p-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-base-content/60 flex items-center gap-2">
                  <HiOutlineQuestionMarkCircle className="text-primary text-lg" />
                  Mis Preguntas
                </h4>
                <Link
                  to={"/myquestions"}
                  className="btn btn-ghost btn-xs text-primary gap-1"
                >
                  Ver todas <HiOutlineArrowRight />
                </Link>
              </div>

              <div className="space-y-3">
                {questions?.slice(0, 3).map((q) => (
                  <Link
                    key={q.id}
                    to={`/questions/${q.id}`}
                    className="flex flex-col p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors border border-transparent hover:border-base-300"
                  >
                    <span className="text-sm font-medium leading-tight">
                      {truncateText(q.title, 60)}
                    </span>
                    <span className="text-[11px] opacity-50 mt-1">
                      {format_date(new Date(q.created_at))}
                    </span>
                  </Link>
                ))}
                {questions?.length === 0 && (
                  <p className="text-xs italic opacity-40 pl-2">
                    No has hecho preguntas aún.
                  </p>
                )}
              </div>
            </div>

            {/* SECCIoN RESPUESTAS */}
            <div className="p-6 pt-0 border-t border-base-200 mt-2 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-base-content/60 flex items-center gap-2">
                  <HiOutlineChatBubbleLeftRight className="text-secondary text-lg" />
                  Mis Respuestas
                </h4>
                <Link
                  to="/myanswers"
                  className="btn btn-ghost btn-xs text-secondary gap-1"
                >
                  Ver todas <HiOutlineArrowRight />
                </Link>
              </div>

              <div className="space-y-3">
                {answers?.slice(0, 3).map((a) => (
                  <Link
                    key={a.id}
                    to={`/questions/${a.question_id}#answer-${a.id}`}
                    className="flex flex-col p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors border border-transparent hover:border-base-300"
                  >
                    <span className="text-xs font-semibold text-secondary/80 mb-1">
                      Re: {truncateText(a.question?.title, 40)}
                    </span>
                    <span className="text-sm leading-tight opacity-90">
                      {/* Mostramos el primer paso como preview */}
                      {truncateText(
                        a.body[0]?.content || "Ver respuesta...",
                        60,
                      )}
                    </span>
                    <span className="text-[11px] opacity-50 mt-1">
                      {format_date(new Date(a.created_at))}
                    </span>
                  </Link>
                ))}
                {answers?.length === 0 && (
                  <p className="text-xs italic opacity-40 pl-2">
                    No has respondido aún.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 

    Tarjeta del Card de una Respuesta

*/
// src/components/answers/AnswerCard.jsx

import React from "react";
import Preview from "../editor/Preview"; // Reutilizamos tu componente pro

const AnswerCard = ({ answer }) => {
  // 'answer.body' ->  array de objetos ->  campo JSONB
  const steps = answer.body || [];

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 mb-8 overflow-hidden">
      <div className="card-body p-0">
        {" "}
        {/* Quitamos padding para que el timeline llegue a los bordes */}
        {/* Cabecera del autor */}
        <div className="flex items-center gap-3 p-6 bg-base-200/50 border-b border-base-200">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2">
              <img
                src={`/img/avatars/${answer.author?.avatar_url}`}
                alt="avatar"
              />
            </div>
          </div>
          <div>
            <p className="font-bold text-sm">@{answer.author?.username}</p>
            <p className="text-xs opacity-50">Experto en IA</p>
          </div>
        </div>
        {/* REUTILIZACIÓN -> Preview Muestra los Pasos */}
        <div className="p-6">
          <Preview steps={steps} />
        </div>
      </div>
    </div>
  );
};

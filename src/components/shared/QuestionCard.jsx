import React from "react";

const QuestionCard = () => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
      {/* --- COMPONENTE CARD: PREGUNTA ESTÁTICA --- */}
      <div className="card-body p-5 flex flex-col sm:flex-row gap-5">
        {/* Bloque Estadísticas (Votos/Respuestas) */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-20 border-b sm:border-b-0 sm:border-r border-base-200 pb-4 sm:pb-0 sm:pr-4 shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-base-content">15</span>
            <span className="text-[10px] uppercase font-bold text-base-content/50">
              Votos
            </span>
          </div>
          <div className="flex flex-col items-center bg-success/10 text-success rounded px-2 py-1 border border-success/20">
            <span className="text-lg font-bold">3</span>
            <span className="text-[10px] uppercase font-bold">Resp.</span>
          </div>
          <span className="text-xs text-base-content/40 sm:hidden ml-auto">
            2h
          </span>
        </div>

        {/* Bloque Contenido */}
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary-focus transition-colors leading-tight mb-2">
            ¿Cómo implementar fine-tuning en un modelo LLM con datos
            personalizados?
          </h3>
          <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
            Estoy intentando hacer fine-tuning de un modelo GPT con mis propios
            datos. He probado con LoRA pero los resultados no son los esperados
            en cuanto a precisión...
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline badge-sm border-blue-200 text-blue-600 bg-blue-50">
                fine-tuning
              </span>
              <span className="badge badge-outline badge-sm border-purple-200 text-purple-600 bg-purple-50">
                LLM
              </span>
              <span className="badge badge-outline badge-sm border-orange-200 text-orange-600 bg-orange-50">
                LoRA
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-base-content/60">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-5">
                  <span className="text-xs">M</span>
                </div>
              </div>
              <span className="font-medium text-base-content">mario_dev</span>
              <span className="hidden sm:inline">• hace 2 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

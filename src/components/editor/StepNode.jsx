/* 

 SubComponente stack Node -> stackMindEditor 
    Muestra un bloque individual
*/
// src/components/editor/StepNode.jsx
import React from "react";
import { STEP_TYPES } from "./types";

export function StepNode({
  step,
  index,
  totalSteps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const stepMeta = STEP_TYPES.find((t) => t.id === step.type) || STEP_TYPES[1];
  const isCodeBlock = step.type === "code";

  return (
    <div className="flex mb-0">
      <div className="flex flex-col items-center w-11 shrink-0">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[13px] font-bold shrink-0 z-10 bg-base-200 ${stepMeta.borderClass} ${stepMeta.colorClass}`}
          aria-hidden="true"
        >
          {stepMeta.icon}
        </div>
        {index < totalSteps - 1 && (
          <div
            className={`w-[2px] flex-1 min-h-[28px] my-0.5 border-l-2 border-dashed opacity-40 ${stepMeta.borderClass}`}
          />
        )}
      </div>

      <div className="flex-1 ml-2.5 mb-4 bg-base-200 rounded-xl overflow-hidden border border-base-300 shadow-sm">
        <div className="flex items-center gap-2 py-1.5 px-3 border-b border-base-300 bg-base-300/30">
          <span
            className={`text-[9px] font-bold tracking-wider uppercase font-mono shrink-0 ${stepMeta.colorClass}`}
          >
            {stepMeta.label}
          </span>

          <input
            value={step.title}
            onChange={(e) => onChange({ ...step, title: e.target.value })}
            placeholder="Título del bloque..."
            className="flex-1 bg-transparent border-none outline-none text-base-content text-[13px] font-semibold"
            aria-label="Título del bloque"
          />

          <div className="flex gap-1 shrink-0">
            {index > 0 && (
              <button
                onClick={onMoveUp}
                className="btn btn-xs btn-ghost text-base-content/60 px-1.5 hover:bg-base-300"
                aria-label="Mover paso hacia arriba"
              >
                ↑
              </button>
            )}
            {index < totalSteps - 1 && (
              <button
                onClick={onMoveDown}
                className="btn btn-xs btn-ghost text-base-content/60 px-1.5 hover:bg-base-300"
                aria-label="Mover paso hacia abajo"
              >
                ↓
              </button>
            )}
            {totalSteps > 1 && (
              <button
                onClick={onDelete}
                className="btn btn-xs btn-ghost text-error hover:bg-error/20 px-1.5"
                aria-label="Eliminar paso"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="relative p-2.5 bg-base-100">
          <textarea
            value={step.content}
            onChange={(e) => onChange({ ...step, content: e.target.value })}
            placeholder={
              isCodeBlock
                ? "// escribe tu código o error de terminal aquí..."
                : "Escribe tu explicación aquí..."
            }
            rows={isCodeBlock ? 5 : 3}
            aria-label={`Contenido del paso: ${step.title}`}
            className={`w-full box-border border-none outline-none resize-y leading-relaxed focus:ring-0 peer ${
              isCodeBlock
                ? "bg-neutral text-success text-xs font-mono rounded-md p-3"
                : "bg-transparent text-base-content text-sm p-1"
            }`}
          />
          <div
            className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary to-secondary scale-x-0 peer-focus:scale-x-100 transition-transform duration-300 origin-center"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  );
}

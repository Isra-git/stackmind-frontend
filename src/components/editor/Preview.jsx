/* 

    SubComponente Preview -> StacMindEditor
        Muestra Vista Previa Resultado

*/

// src/components/editor/Preview.jsx
import React from "react";
import { STEP_TYPES } from "./types";

export function Preview({ steps }) {
  return (
    <div className="p-2">
      {steps.map((step, i) => {
        const stepMeta =
          STEP_TYPES.find((t) => t.id === step.type) || STEP_TYPES[1];
        return (
          <div key={step.id} className="flex mb-0 ">
            <div className="flex flex-col items-center w-9 shrink-0">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] shrink-0 bg-base-100 ${stepMeta.borderClass} ${stepMeta.colorClass}`}
                aria-hidden="true"
              >
                {stepMeta.icon}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-[2px] flex-1 min-h-[20px] my-1.5 border-l-2 border-dashed opacity-30 ${stepMeta.borderClass}`}
                />
              )}
            </div>

            <div className="flex-1 ml-4 pb-10 min-w-0">
              {/* AÑadido min-w-0 para evitar desborde  de texto en <pre> de type=code*/}
              {step.title && (
                <div
                  className={`text-[13px] font-bold mb-1 ${stepMeta.colorClass}`}
                >
                  {step.title}
                </div>
              )}
              {step.type === "code" ? (
                <pre className="bg-neutral text-success rounded-lg py-3 px-4 text-xs m-0 overflow-x-auto font-mono shadow-inner border border-neutral-content/10">
                  {step.content || "// vacío"}
                </pre>
              ) : (
                <p
                  className={`m-0 text-sm leading-relaxed ${step.content ? "text-base-content" : "text-base-content/50 italic"}`}
                >
                  {step.content || "Sin contenido..."}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

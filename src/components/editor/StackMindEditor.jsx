/* 

        Componente Principal -> StackMind Editor
            Junta y conecta los otros componentes


*/

// src/components/editor/StackMindEditor.jsx
import React, { useState } from "react";
import { STEP_TYPES, generateUid, defaultSteps } from "./types";
import { StepNode } from "./StepNode";
import { Preview } from "./Preview";

export default function StackMindEditor() {
  const [steps, setSteps] = useState(defaultSteps);
  const [activeTab, setActiveTab] = useState("editor");
  const [newStepType, setNewStepType] = useState("step");
  const [isCopied, setIsCopied] = useState(false);

  const updateStep = (id, modifiedStep) => {
    setSteps((prev) => prev.map((p) => (p.id === id ? modifiedStep : p)));
  };

  const removeStep = (id) => {
    setSteps((prev) => prev.filter((p) => p.id !== id));
  };

  const moveUp = (index) => {
    setSteps((prev) => {
      const newArray = [...prev];
      [newArray[index - 1], newArray[index]] = [
        newArray[index],
        newArray[index - 1],
      ];
      return newArray;
    });
  };

  const moveDown = (index) => {
    setSteps((prev) => {
      const newArray = [...prev];
      [newArray[index], newArray[index + 1]] = [
        newArray[index + 1],
        newArray[index],
      ];
      return newArray;
    });
  };

  const addStep = () => {
    const stepMeta =
      STEP_TYPES.find((t) => t.id === newStepType) || STEP_TYPES[1];
    const defaultLabel =
      newStepType === "step"
        ? `Paso ${steps.filter((p) => p.type === "step").length + 1}`
        : stepMeta.label;

    setSteps((prev) => [
      ...prev,
      {
        id: generateUid(),
        type: newStepType,
        title: defaultLabel,
        content: "",
      },
    ]);
  };

  const exportToMarkdown = () => {
    const markdownText = steps
      .map((step) => {
        const stepMeta =
          STEP_TYPES.find((t) => t.id === step.type) || STEP_TYPES[1];
        const formattedContent =
          step.type === "code"
            ? `\n\`\`\`\n${step.content}\n\`\`\`\n`
            : step.content;
        return `**[${stepMeta.label.toUpperCase()}] ${step.title}**\n${formattedContent}`;
      })
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(markdownText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-base-100 text-base-content font-sans py-8 px-4 transition-colors duration-300"
    >
      <div className="max-w-[780px] mx-auto">
        <div className="mb-8">
          <div className="text-[10px] tracking-[3px] text-accent uppercase mb-2 font-bold opacity-80">
            Comunidad IA · Editor
          </div>
          <h1 className="m-0 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-1">
            Construye tu respuesta paso a paso
          </h1>
          <p className="mt-2 mb-0 text-base-content/70 text-[14px]">
            Comparte tu conocimiento de forma clara. Las explicaciones
            estructuradas ayudan mejor a la comunidad.
          </p>
        </div>

        <div className="mb-6 bg-base-200 p-1.5 rounded-xl w-fit flex gap-1">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeTab === "editor" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`}
            aria-label="Cambiar a vista de edición"
          >
            ✏️ Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeTab === "preview" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`}
            aria-label="Cambiar a vista previa"
          >
            👁️ Vista Previa
          </button>
        </div>

        <div className="bg-base-100 rounded-2xl border border-base-300 p-6 min-h-[380px] shadow-lg shadow-base-300/10">
          {activeTab === "editor" ? (
            <>
              {steps.map((step, i) => (
                <StepNode
                  key={step.id}
                  step={step}
                  index={i}
                  totalSteps={steps.length}
                  onChange={(p) => updateStep(step.id, p)}
                  onDelete={() => removeStep(step.id)}
                  onMoveUp={() => moveUp(i)}
                  onMoveDown={() => moveDown(i)}
                />
              ))}

              <div className="flex gap-3 items-center pl-1 mt-4">
                <select
                  value={newStepType}
                  onChange={(e) => setNewStepType(e.target.value)}
                  className="select select-bordered select-sm bg-base-200 focus:outline-primary w-40 text-sm"
                  aria-label="Seleccionar tipo de bloque a agregar"
                >
                  {STEP_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addStep}
                  className="btn btn-sm btn-outline border-base-300 hover:bg-base-300 hover:text-base-content hover:border-base-400"
                  aria-label="Agregar nuevo bloque al editor"
                >
                  + Agregar bloque
                </button>
              </div>
            </>
          ) : (
            <Preview steps={steps} />
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={exportToMarkdown}
            className={`btn border-none text-base-100 shadow-md transition-all duration-300 px-6 ${isCopied ? "bg-success hover:bg-success" : "bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-[1.02]"}`}
            aria-label="Exportar respuesta a formato Markdown"
          >
            {isCopied ? "✓ ¡Copiado al portapapeles!" : "⬆ Exportar a Markdown"}
          </button>
        </div>
      </div>
    </div>
  );
}

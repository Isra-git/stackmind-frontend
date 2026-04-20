/* 

        Componente Principal -> StackMind Editor
            Junta y conecta los otros componentes


*/

// src/components/editor/StackMindEditor.jsx
import React, { useState } from "react";

import { STEP_TYPES, generateUid, defaultSteps } from "./types";
import { StepNode } from "./StepNode";
import { Preview } from "./Preview";
import { useAuth } from "../../context/AuthContext";

import { ENDPOINTS } from "../../api/constantes";

export default function StackMindEditor({ questionId, onSuccess }) {
  //estado para Autenticar
  const { token } = useAuth();

  // estados para el editor
  const [steps, setSteps] = useState(defaultSteps);
  const [activeTab, setActiveTab] = useState("editor");
  const [newStepType, setNewStepType] = useState("step");
  const [isCopied, setIsCopied] = useState(false);
  const [isPublish, setIspublish] = useState(false);

  // Funcion para publicar una respuesta
  const handlePublish = async () => {
    // Si no hay ningun pasos, no se puede publicar
    if (steps.length === 0) return;

    // activamos el estado de publicación
    setIspublish(true);

    // gestionamos la peticion
    try {
      const response = await fetch(ENDPOINTS.ANSWERS_CREATE(questionId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Convertimos el array de Steps en un objeto Json (BD ->JSONB)
        body: JSON.stringify({
          body: steps, //author_id -> Sale del token
        }),
      });

      // si falla -> Lanzamos error
      if (!response.ok) {
        throw new Error("Error al Publicar la Respuesta");
      }

      // si va bien -> Limpiamos el estado
      setIspublish(false);

      // recargamos las respuestas y cerramos el editor (TODO)
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log("Error al publicar: ", error);
      setIspublish(false);
      //todo -> Motrar toast de error al user
    }
  };

  // Actualiza el paso con el ID proporcionado con la nueva versión del paso
  const updateStep = (id, modifiedStep) => {
    setSteps((prev) => prev.map((p) => (p.id === id ? modifiedStep : p)));
  };

  // eliminamos un paso
  const removeStep = (id) => {
    setSteps((prev) => prev.filter((p) => p.id !== id));
  };

  // Esta función permite mover un paso hacia arriba en la lista de pasos del editor.
  // Toma el índice del paso que se desea mover y crea una copia del array de pasos.
  // intercambia los elementos del array para "subir" el paso un lugar.
  // actualiza el estado con la nueva lista de pasos
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

  // añade un paso al array de pasos
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

  // Funcion para exportar a MarkDown el array de pasos -> Añade \n por paso¡
  const exportToMarkdown = () => {
    const markdownText = steps
      .map((step) => {
        const stepMeta =
          STEP_TYPES.find((t) => t.id === step.type) || STEP_TYPES[1];
        const formattedContent =
          step.type === "code"
            ? `\n\`\`\`\n${step.content}\n\`\`\`\n` // añadimos saltos de linea
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
      className="min-h-screen bg-base-200 text-base-content font-sans py-8 px-4 transition-colors duration-300"
    >
      <div className="max-w-[780px] mx-auto">
        <div className="mb-8">
          <div className="text-[15px] tracking-[3px] text-accent uppercase mb-2 font-bold opacity-80">
            Ayuda a otros usuarios:
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
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeTab === "editor" ? "bg-base-300 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`}
            aria-label="Cambiar a vista de edición"
          >
            ✏️ Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${activeTab === "preview" ? "bg-base-300 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`}
            aria-label="Cambiar a vista previa"
          >
            👁️ Vista Previa
          </button>
        </div>

        <div className="bg-base-200 rounded-2xl border border-base-300 p-6 min-h-[380px] shadow-lg shadow-base-300/10">
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

        <div className="flex justify-around items-end mt-6">
          <div className="flex justify-end mt-6">
            <button
              onClick={exportToMarkdown}
              className={`btn border-none text-color-info px-6 ${isCopied ? "bg-success hover:bg-success" : "bg-base-300 hover:opacity-90 hover:scale-[1.02]"}`}
              aria-label="Exportar respuesta a formato Markdown"
            >
              {isCopied ? "✓ ¡Copiado al portapapeles!" : "Exportar a Markdown"}
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handlePublish}
              disabled={isPublish || steps.length === 0}
              className={`btn px-6 transition-all duration-300 shadow-md border-none ${
                isPublish
                  ? "bg-base-300 text-base-content/50"
                  : "btn-primary text-white"
              }`}
              aria-label="Añadir Respuesta"
            >
              {isPublish ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

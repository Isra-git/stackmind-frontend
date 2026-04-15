/* 


    Variables y Constantes Globales -> StackMind Editor
        Contiene las variables y constantes globales que se utilizarán en el editor de preguntas.   

*/

// src/components/editor/types.js
export const STEP_TYPES = [
  {
    id: "intro",
    label: "Introducción",
    icon: "◎",
    colorClass: "text-success",
    borderClass: "border-success",
  },
  {
    id: "step",
    label: "Paso",
    icon: "◈",
    colorClass: "text-info",
    borderClass: "border-info",
  },
  {
    id: "tip",
    label: "Consejo",
    icon: "✦",
    colorClass: "text-warning",
    borderClass: "border-warning",
  },
  {
    id: "warning",
    label: "Advertencia",
    icon: "⚠",
    colorClass: "text-error",
    borderClass: "border-error",
  },
  {
    id: "code",
    label: "Código",
    icon: "{}",
    colorClass: "text-primary",
    borderClass: "border-primary",
  },
  {
    id: "close",
    label: "Conclusión",
    icon: "◉",
    colorClass: "text-secondary",
    borderClass: "border-secondary",
  },
];

export const generateUid = () => Math.random().toString(36).slice(2, 8);

export const defaultSteps = [
  {
    id: generateUid(),
    type: "intro",
    title: "Contexto del problema",
    content: "",
  },
  { id: generateUid(), type: "step", title: "Paso 1", content: "" },
  { id: generateUid(), type: "close", title: "Conclusión", content: "" },
];

/* 

    devuelve las Respuestas de un usuario

*/

// src/services/answerService.js

// dependencias

import { ENDPOINTS } from "../api/constantes";

// DEvuelve las respuestas de un User
export const getUserAnswers = async (skip = 0, limit = 20, token = null) => {
  const url = ENDPOINTS.USER_ANSWERS(skip, limit);
  console.log("Obteniendo respuestas de:", url);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error al obtener las respuestas del usuario");
  }

  const data = await response.json();
  return data;
};

// Elimina una Respuesta de un Usuario
export const deleteAnswers = async (answerId, token) => {
  const response = await fetch(ENDPOINTS.ANSWER_DETAIL(answerId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al eliminar la respuesta");
  }
  return true;
};

// Actualiza una Respuesta de un Usuario
export const updateAnswers = async (answerId, updatedAnswer, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedAnswer),
  };
  const response = await fetch(ENDPOINTS.ANSWER_DETAIL(answerId), options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al actualizar la respuesta");
  }
  return true;
};

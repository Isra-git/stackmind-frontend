/* 

    devuelve las Respuestas de un usuario

*/

// src/services/answerService.js

// dependencias

import { ENDPOINTS } from "../api/constantes";

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

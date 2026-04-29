/* 
    Servicio para hacer fetch y devolcer los datos

*/

// src/services/questionService.js

// dependencias
import { ENDPOINTS } from "../api/constantes";

// devuelve las preguntas mas-> Nuevas, sin Respuesta, Mas VIews
export const getQuestions = async (
  tipo = "new",
  skip = 0,
  limit = 20,
  token = null,
) => {
  // ruta de Base
  const baseUrl = "https://stackmind-api.onrender.com/questions";

  // creamos  diccionario con Opciones (en Home-tab, o navBar)
  const endpoints = {
    new: `${baseUrl}/?skip=${skip}&limit=${limit}`,
    unanswered: `${baseUrl}/unanswered?skip=${skip}&limit=${limit}`,
    top: `${baseUrl}/top?skip=${skip}&limit=${limit}`,
    my_questions: ENDPOINTS.USER_QUESTIONS(skip, limit), // Preguntas Usuario
  };

  // seleccionamos la Url (por defecto -> new)
  const url = endpoints[tipo] || endpoints["new"];
  console.log(url);

  // preparamos las Opciones de Fetch
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // si hay un token (ruta protegida) lo añadimos a las opciones de Fetch
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  // hacemos la peticion a -> url
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(
      "Error al conectar con el servidor para  obtener las preguntas",
    );
  }

  // devolvemos lo datos
  const data = await response.json();
  console.log(data);

  return data;
};

/* 
    Servicio para hacer fetch y devolcer los datos

*/

// src/services/questionService.js

// devuelve las preguntas mas-> Nuevas, sin Respuesta, Mas VIews
export const getQuestions = async (tipo = "new", skip = 0, limit = 20) => {
  // ruta de Base
  const baseUrl = "https://stackmind-api.onrender.com/questions";

  // creamos  diccionario con Opciones (en Home-tab, o navBar)
  const endpoints = {
    new: `${baseUrl}/?skip=${skip}&limit=${limit}`,
    unanswered: `${baseUrl}/unanswered?skip=${skip}&limit=${limit}`,
    top: `${baseUrl}/top?skip=${skip}&limit=${limit}`,
  };

  // seleccionamos la Url (por defecto -> new)
  const url = endpoints[tipo] || endpoints["new"];

  // hacemos la peticion a -> url
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Error al conectar con el servidor para  obtener las preguntas",
    );
  }

  // devolvemos lo datos
  return await response.json();
};

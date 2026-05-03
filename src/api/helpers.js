/*


    Funciones de Ayuda en StackMind

*/

// Funcion que genera la LIsta de avatares
export const availableAvatars = Array.from(
  { length: 13 },
  (value, index) => `avatar${index + 2}.png`,
);

//--------------------------------------------------------

// Funcion par Truncar texto
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;

  // Cortamos al maximo permitido
  let truncated = text.substring(0, maxLength);

  //  Buscamos el ultimo espacio para no cortar una palabra
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    truncated = truncated.substring(0, lastSpace);
  }

  return `${truncated}...`;
};

//----------------------------------------------
// Formatea una fecha a formato europeo {instanciar con = newDate(fecha_raw)}
export const format_date = (date_raw) => {
  const date = date_raw.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return date;
};

//---------------------------------------------------
// Crea una fecha de Hoy y la Formatea

export const getTodayDate = () => {
  const todayDate = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return todayDate;
};

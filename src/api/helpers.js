/*


    Funciones de Ayuda en StackMind

*/
//------------------ AVATARES ---------

// Carpetas de avatares -> Configuracion -> Diccionario
export const AVATAR_CONFIG = {
  0: { name: "surrealistas", count: 14 },
  1: { name: "tecnologicos", count: 12 },
  2: { name: "IA", count: 16 },
  3: { name: "clasicos", count: 12 },
};

// Transformamos el Dict en un Array para mostrar los avatares
export const avatarGroups = Object.entries(AVATAR_CONFIG).map(
  ([folder, data]) => {
    // si no hay numero de avatares -> 10 por defecto
    const numbersOfAvatars = data.count || 10;

    return {
      id: folder,
      name: data.name || `Coleccion ${folder}`,
      avatars: Array.from(
        { length: numbersOfAvatars },
        (_, i) => `${folder}/avatar${i + 1}.png`,
      ),
    };
  },
);

// lista plana de avatares oara probar
//export const availableAvatars = avatarGroups.flatMap(group => group.avatars);

// // Funcion que genera la LIsta de avatares
// export const availableAvatars = Array.from(
//   { length: 13 },
//   (value, index) => `avatar${index + 2}.png`,
// );

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

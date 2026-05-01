/*


    Funciones de Ayuda en StackMind

*/

// Funcion que genera la LIsta de avatares
export const availableAvatars = Array.from(
  { length: 13 },
  (value, index) => `avatar${index + 2}.png`,
);

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

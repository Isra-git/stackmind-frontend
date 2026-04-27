/*


    Funciones de Ayuda en StackMind

*/


// Funcion que genera la LIsta de avatares
export const availableAvatars = Array.from(
    { length: 13 },
    (value, index) => `avatar${index + 2}.png`,
  );

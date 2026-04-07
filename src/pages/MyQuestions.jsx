/* 

    Pagina de My QUestions

*/

import React from "react";

const MyQuestions = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] p-8 text-center bg-base-100 rounded-box shadow-sm border border-base-200">
      <span className="text-6xl mb-4 animate-bounce">👋</span>

      <h1 className="text-3xl font-bold text-base-content mb-2">¡Hola!</h1>

      <p className="text-lg text-base-content/70">
        Esta es la página de{" "}
        <span className="font-semibold text-primary">MyQuestions</span>.
      </p>

      <p className="text-sm text-base-content/50 mt-4 italic">
        (Componente en construcción)
      </p>
    </div>
  );
};

export default MyQuestions;

/* 

    Pagina para mostrar la pregunta seleccionada

*/

/* 
        primera version 
        import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuestionDetail = () => {
  // useParams extrae las variables de la URL que definimos en el Route
  const { id, slug } = useParams(); 
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    // Fíjate que al backend solo le mandamos el ID. ¡Al backend no le importa el slug!
    fetch(`https://stackmind-api.onrender.com/questions/${id}`)
      .then(res => res.json())
      .then(data => setQuestionData(data))
      .catch(err => console.error(err));
  }, [id]); // Solo re-ejecutamos si cambia el ID

  return (
    <div>
     
    </div>
  );
};

export default QuestionDetail;

*/

// src/pages/QuestionDetail.jsx

import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] p-8 text-center bg-base-100 rounded-box shadow-sm border border-base-200">
      <span className="text-6xl mb-4 animate-bounce">👋</span>

      <h1 className="text-3xl font-bold text-base-content mb-2">¡Hola!</h1>

      <p className="text-lg text-base-content/70">
        Esta es la página de{" "}
        <span className="font-semibold text-primary">Detalles de pregunta</span>
        .
      </p>

      <p className="text-sm text-base-content/50 mt-4 italic">
        (Componente en construcción)
      </p>
    </div>
  );
};

export default Search;

/* 

    Custom Hook para manejar:
        ciclo de vida
        carga
        errores
    de las preguntas  

*/

// src/hooks/useQuestions.jsx

// dependencias
import { useState, useEffect } from "react";
import { getQuestions } from "../services/questionService";

// custom Hook
export const useQuestions = (tipo = "new", skip = 0, limit = 0) => {
  // estados
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // cada vez que cambia el Tipo/estado/Limite
  useEffect(() => {
    // definimos la funcion
    const fetchApi = async () => {
      // ativamos estad y limpioamos errores
      setLoading(true);
      setError(null);
      try {
        // llamada al servicio getQuestions
        const data = await getQuestions(tipo, skip, limit);
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // ejecutamos
    fetchApi();
  }, [tipo, skip, limit]); // dependencias de useEffect

  // devolvemos todo empaquetado_> questions loadong error
  return { questions, loading, error };
}; // Para usarlo -> useQuestions

/* 

    Custom Hook para manejar:
        ciclo de vida
        carga
        errores
    de las preguntas  de un Usuario

*/

// src/hooks/useUserQuestions.jsx

// dependencias
import { useState, useEffect, useContext } from "react";

import { getQuestions } from "../services/questionService";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación

// custom Hook
export const useQuestions = (tipo = "new", skip = 0, limit = 20) => {
  // estados
  const [questions, setQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // extraemos el Toke
  const { token } = useContext(AuthContext);

  // cada vez que cambia el Tipo/estado/Limite
  useEffect(() => {
    // definimos la funcion
    const fetchApi = async () => {
      // ativamos estad y limpioamos errores
      setLoading(true);
      setError(null);
      try {
        // llamada al servicio getQuestions
        const data = await getQuestions(tipo, skip, limit, token);
        setQuestions(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // ejecutamos
    fetchApi();
  }, [tipo, skip, limit, token]); // dependencias de useEffect

  // devolvemos todo empaquetado_> questions loadong error
  return { questions, total, loading, error };
}; // Para usarlo -> useQuestions

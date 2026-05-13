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
import { ENDPOINTS } from "../api/constantes";

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

  // FUNCIÓN DE BORRADO REUTILIZABLE
  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(ENDPOINTS.QUESTION_DELETE(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la pregunta");
      }

      // Update de Estado local
      // Filtramos la pregunta borrada para que desaparezca de la UI
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setTotal((prev) => prev - 1);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  // devolvemos todo empaquetado_> questions loadong error
  return { questions, setQuestions, total, loading, error, deleteQuestion };
}; // Para usarlo -> useQuestions

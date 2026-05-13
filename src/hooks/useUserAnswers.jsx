/* 
    Custom Hook para manejar:
        - ciclo de vida
        - carga
        - errores
    de las RESPUESTAS de un Usuario
*/

// src/hooks/useUserAnswers.jsx

// dependencias
import { useState, useEffect } from "react";

// Importamos servicio de respuestas
import { getUserAnswers } from "../services/answerService";
import { useAuth } from "../context/AuthContext"; //  contexto de autenticación
import { ENDPOINTS } from "../api/constantes";

// custom Hook
export const useUserAnswers = (skip = 0, limit = 20) => {
  // estados
  const [answers, setAnswers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // extraemos el Token
  const { token } = useAuth();

  // cada vez que cambia el estado/Limite o el Token
  useEffect(() => {
    // definimos la funcion
    const fetchApi = async () => {
      // activamos estado de carga y limpiamos errores
      setLoading(true);
      setError(null);

      try {
        //  servicio getUserAnswers (requiere estar logueado)
        if (!token) {
          throw new Error("No hay sesión activa para obtener las respuestas");
        }

        const data = await getUserAnswers(skip, limit, token);

        // backend devuelve { items: [...], total: X }
        setAnswers(data.items || []);
        setTotal(data.total || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // ejecutamos
    fetchApi();
  }, [skip, limit, token]); // dependencias de useEffect

  // Funcion de borrado -> Para reutilizar
  const deleteAnswer = async (id) => {
    try {
      const response = await fetch(ENDPOINTS.ANSWER_DELETE(id), {
        // Asegúrate de tener este endpoint
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la respuesta");
      }

      // Actualizamos el estado local
      setAnswers((prev) => prev.filter((a) => a.id !== id));
      setTotal((prev) => prev - 1);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // devolvemos todo empaquetado -> answers, loading, error
  return { answers, setAnswers, total, loading, error, deleteAnswer };
};

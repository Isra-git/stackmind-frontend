/*

    Custom Hook Para Votar las Respuestas
        Solo el que hizo la Pregunta 

*/

// src/hooks/useVoteAnswer.jsx

// dependencias
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { ENDPOINTS } from "../api/constantes"; // Asegúrate de añadir VOTE_ANSWER(id) a tu api.js

export const useVoteAnswer = () => {
  const { token } = useAuth();
  const [isVoting, setIsVoting] = useState(false);

  const vote = async (answerId, score) => {
    setIsVoting(true);
    try {
      const response = await fetch(ENDPOINTS.ANSWER_VOTE(answerId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al registrar el voto");
      }

      // Devolvemos la respuesta actualizada desde el backend
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return null;
    } finally {
      setIsVoting(false);
    }
  };

  // devolvemos la respuesta del voto y  el estado
  return { vote, isVoting };
};

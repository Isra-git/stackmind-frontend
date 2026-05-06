/* 

    Edita una Respuesta

*/

// src/pages/EditAnswerPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getAnswerById, updateAnswers } from "../../services/answerService";
import StackMindEditor from "../../components/editor/StackMindEditor";

export const EditAnswer = () => {
  // Extraemos el ID de la URL
  const { id } = useParams();

  // instancia de navegacion
  const navigate = useNavigate();

  // contexto de autenticacion
  const { token } = useAuth();

  // estados
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // CARGAMOS LA RESPUESTA
  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const data = await getAnswerById(id, token);
        setInitialData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAnswer();
  }, [id, token]);

  // FUNCIoN PARA GUARDAR LOS CAMBIOS
  const handleSaveEdit = async (newBodyData) => {
    setSaving(true);
    try {
      // función updateAnswers
      // Enviamos el body actualizado y el token
      await updateAnswers(id, { body: newBodyData }, token);

      // Si va bien, volvemos al panel de Mis Respuestas
      navigate("/my-answers");
    } catch (err) {
      alert("Error al guardar: " + err.message);
      setSaving(false);
    }
  };

  // carga y error
  if (loading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  if (error) return <div className="alert alert-error m-10">{error}</div>;

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Editar Respuesta</h1>
      <p className="text-base-content/60 mb-8">
        Estás editando tu respuesta para:{" "}
        <span className="italic font-semibold">
          {initialData?.question?.title}
        </span>
      </p>

      {/* MONTAMOS EL EDITOR */}
      {/* Le pasamos los datos iniciales y la función a ejecutar al darle a "guardar
       */}
      <div className="bg-base-100 p-6 rounded-box shadow-sm border border-base-200">
        <StackMindEditor
          initialContent={initialData.body} //  Array de bloques
          onSave={handleSaveEdit} //  función -> backend
        />
      </div>

      <button className="btn btn-ghost mt-4" onClick={() => navigate(-1)}>
        Cancelar
      </button>
    </div>
  );
};
export default EditAnswer;

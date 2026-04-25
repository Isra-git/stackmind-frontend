/* 

    Pagina para Crear una Pregunta


*/

// src/pages/NewQuestion.jsx

// dependencias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ENDPOINTS } from "../api/constantes";

// Iconos
import { HiOutlineSparkles, HiOutlineCheck, HiOutlineXMark, HiOutlinePaperAirplane } from "react-icons/hi2";
import { Flag } from "lucide-react";
const NewQuestion = () => {

  // Estados navegacion y usuario
  const navigate=useNavigate();
  const{token}= useAuth();

  // estados del form
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");

  //estados para gestionar IA
  const [isImproving,setIsImproving]=useState(false);
  const [aiSuggest,setAiSuggest]=useState(null);

  // estado Publicado?¿
  const [publishing, setIspublishing]=useState(false);

  //estado para Errores
  const [error,setError]=useState(null);
  const [success,setSuccess]=useState(null);

  // Funcion para pedirle a la IA que mejore la pregunta
  cons handleImproveWithAi= async()=> {
    
    // comprobamos que los campos no esten vacios
    if(!title.trim() || !body.trim()) return;
    setIsImproving(true);
    
    try {

      // llamamos a la api (AI_ENHANCE: `${API_BASE}/ai/enhance-question`)
      //  para mejorar la Pregunta del usuario
      const response= await fetch(ENDPOINTS.AI_ENHANCE,{
        method:"POST",
        headers:{"Content-Type":"application/json", Authorization: `Bearer ${token}`},
        body:JSON.stringify({title, body})
      });

      if(response.ok){
        const data= await response.json();
       setAiSuggest(data);
        setError(null);
        setSuccess("La pregunta ha sido devuelta mejorada por la IA.");
      }else{
        const error= await response.json();
        setError(error.message);
        setSuccess(null);
      }

    }catch(err){
      console.log("Error al Conectar con la IA: ", err);
      setError(err);
      
    }finally{
      setIsImproving(false);
    }

  };



  // Funcion para manejar -> Aceptar la sugerencia de la IA
  const acceptAiSuggestion=()=>{

    // asignamos el nuevo TiTULo y Body
    setTitle(aiSuggest.title);
    setBody(aiSuggest.body);

    // limpiamos la sugerencia
    setAiSuggest(null);
  }


  // Funcion para manejar -> Rechaza la sugerencia de la IA
  const rejectAiSuggestion=()=>{
    setAiSuggest(null);
    
  }
  } 

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] p-8 text-center bg-base-100 rounded-box shadow-sm border border-base-200">
      <span className="text-6xl mb-4 animate-bounce">👋</span>

      <h1 className="text-3xl font-bold text-base-content mb-2">¡Hola!</h1>

      <p className="text-lg text-base-content/70">
        Esta es la página de{" "}
        <span className="font-semibold text-primary">NewQuestion</span>.
      </p>

      <p className="text-sm text-base-content/50 mt-4 italic">
        (Componente en construcción)
      </p>
    </div>
  );
};

export default NewQuestion;

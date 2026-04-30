/* 

    Pagina de Logout


*/
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //lógica de borrar token/contexto
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Cerrando sesión...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-8 text-center bg-base-100 rounded-2xl shadow-lg border border-base-200 max-w-2xl mx-auto mt-10">
      {/* Icono */}
      <div className="text-7xl mb-6">✨</div>

      <h1 className="text-3xl font-bold text-base-content mb-3">
        ¿Tienes que irte?
      </h1>

      <p className="text-lg text-base-content/70 mb-8 max-w-md">
        Esperamos que hayas resuelto tus dudas hoy. Recuerda que la IA es más
        fácil cuando la exploramos entre Personas.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        {/* Accion */}
        <button
          onClick={handleLogout}
          className="btn btn-primary btn-wide text-white font-bold"
        >
          Confirmar cierre de sesión
        </button>

        {/* Arrepentimiento || Volver atras */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-wide"
        >
          Seguir navegando
        </button>
      </div>

      <div className="mt-12 pt-8 border-t border-base-200 w-full">
        <p className="text-sm text-base-content/60 mb-4">
          Mientras tanto, echa un vistazo a lo nuevo:
        </p>
        <div className="flex justify-center gap-6 text-primary font-medium">
          <a href="/" className="hover:underline">
            Explorar Foro
          </a>
          <a href="/tags" className="hover:underline">
            Tags
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logout;

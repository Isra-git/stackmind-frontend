/* 

  Barra lateral (pc) o abajo (movil) con opcion de busqueda por Tags 

*/

// src/components/layout/Sidebar.jsx

// depencencias
import React from "react";
import { useNavigate } from "react-router-dom";

import TagsComponent from "../sidebar/tagsComponent";
import TopUsers from "../../pages/TopUsers";

// Importamos solo los iconos que necesita el Sidebar
import { HiQuestionMarkCircle, HiTag, HiUsers } from "react-icons/hi2";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="order-1 lg:order-2 lg:col-span-4 space-y-6">
      {/* Card: Llamada a la acción */}
      <div className="card bg-base-200 border border-base-300 shadow-sm overflow-hidden">
        <div className="bg-primary/90 border-b border-primary/10 px-6 py-4 flex items-center gap-2">
          <HiQuestionMarkCircle className="h-6 w-6 text-base-content" />
          <h2 className="text-lg font-bold text-base-content m-0">
            ¿Tienes una duda?
          </h2>
        </div>

        <div className="p-6">
          <p className="text-sm text-base-content/70">
            No te quedes atascado. Comparte tu problema y obtén ayuda de
            expertos.
          </p>
          <button
            className="btn bg-primary/70 text-base-content/80 border-none hover:bg-primary/30 btn-block mt-4 transition-colors"
            onClick={() => navigate(`/newquestion`)}
          >
            Hacer una Pregunta
          </button>
        </div>
      </div>

      {/* Card: Etiquetas */}
      <TagsComponent />
      {/* Card: Top Usuarios */}
      <TopUsers />
    </aside>
  );
};

export default Sidebar;

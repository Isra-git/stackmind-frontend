/* 

  Barra lateral (pc) o abajo (movil) con opcion de busqueda por Tags 

*/

// src/components/layout/Sidebar.jsx

// depencencias
import React from "react";

import TagsComponent from "../sidebar/tagsComponent";

// Importamos solo los iconos que necesita el Sidebar
import { HiQuestionMarkCircle, HiTag, HiUsers } from "react-icons/hi2";

const Sidebar = () => {
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
          <button className="btn bg-primary/70 text-base-content/80 border-none hover:bg-primary/30 btn-block mt-4 transition-colors">
            Hacer una Pregunta
          </button>
        </div>
      </div>

      {/* Card: Etiquetas */}
      <TagsComponent />
      {/* Card: Top Usuarios */}
      <div className="card bg-base-200 border border-base-300 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-base-300 border-b border-base-300 px-6 py-4 flex items-center gap-2 w-full">
          <h3 className="font-bold m-0 flex items-center gap-2">
            <HiUsers className="text-accent" /> Top Contribuidores
          </h3>
        </div>
        <div className="p-6 w-full">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xs">D</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">DevMaster</span>
                <span className="text-xs text-base-content/50">
                  1.2k puntos
                </span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-8">
                  <span className="text-xs">A</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">AI_Wizard</span>
                <span className="text-xs text-base-content/50">980 puntos</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

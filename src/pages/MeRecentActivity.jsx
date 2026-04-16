/* 

    SubComponente de Actividad Reciente

*/

// src/components/shared/RecentActivityCard.jsx

import React from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function MeRecentActivity() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <h3 className="text-xl font-bold border-b border-base-200 pb-3 mb-4">
          Actividad Reciente
        </h3>

        <div className="flex flex-col items-center justify-center py-8 text-base-content/40 text-center">
          <HiOutlineChatBubbleLeftRight className="text-5xl mb-3 opacity-20" />
          <p className="font-medium">Aún no has hecho ninguna pregunta.</p>
          <p className="text-sm mt-1">
            ¡Anímate a abrir tu primer hilo sobre IA!
          </p>
        </div>
      </div>
    </div>
  );
}

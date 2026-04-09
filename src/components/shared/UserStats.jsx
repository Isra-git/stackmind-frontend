/* 

    componente para mostrar las Estadisticas de 
    un USer

*/

// src/components/shared/userstats.jsx

// dependencias
import React from "react";

// iconos
import {
  HiOutlineTrophy,
  HiOutlineChatBubbleLeftRight,
  HiOutlineStar,
} from "react-icons/hi2";

const UserStats = ({ stats }) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow-xl border border-base-200 w-full bg-base-100">
      {/* Fila de Stats -> (DaisyUI) */}
      <div className="stat p-4">
        <div className="stat-figure text-warning">
          <HiOutlineTrophy className="text-4xl" />
        </div>
        <div className="stat-title font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Reputación
        </div>
        <div className="stat-value text-warning">{stats.reputation || 0}</div>
        <div className="stat-desc">Puntos comunidad</div>
      </div>

      <div className="stat p-4">
        <div className="stat-figure text-primary">
          <HiOutlineChatBubbleLeftRight className="text-4xl" />
        </div>
        <div className="stat-title font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Preguntas
        </div>
        <div className="stat-value text-primary">
          {stats.questions_count || 0}
        </div>
        <div className="stat-desc">Aportaciones al foro</div>
      </div>

      <div className="stat p-4">
        <div className="stat-figure text-secondary">
          <HiOutlineStar className="text-4xl" />
        </div>
        <div className="stat-title font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Soluciones
        </div>
        <div className="stat-value text-secondary">
          {stats.answers_count || 0}
        </div>
        <div className="stat-desc">Respuestas</div>
      </div>
    </div>
  );
};
export default UserStats;

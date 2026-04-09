/* 

    Pagina del Perfil del Usuario

*/

// src/pages/me.jsx

// dependencias
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// hook Autenticación
import { useAuth } from "../context/AuthContext";

// componentes
import UserStats from "../components/shared/UserStats";

// iconos
import {
  HiOutlineEnvelope,
  HiOutlineCalendar,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { GiToken } from "react-icons/gi";

// direccion backend -> Stats
const stats_url = "/api/users/me/stats";

const Me = () => {
  // contexto de Autenticacion -> User
  const { user, loading, token } = useAuth();

  // estado para estadisticas -> Stats
  const [stats, setStats] = useState({
    questions_count: 0,
    answers_count: 0,
    reputation: 0,
  });

  // al cargar Pedimos las estadisticas
  useEffect(() => {
    fetch(stats_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fallo al obtener Stadisticas");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, [token]);

  // si cargando -> spinner
  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  // si No hay USer ->redirigimos a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // avatares -> si User -> Si Admin -> Sino avatar_url
  let avatarPath = "/img/avatars/avatar2.png";
  if (user) {
    if (user.is_admin) {
      avatarPath = "/img/avatars/avatar1.jpeg";
    } else if (user.avatar_url) {
      avatarPath = `/img/avatars/${user.avatar_url}`;
    }
  }

  // formateamos fecha (mes / año)
  const formatDate = new Date(user.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-extrabold mb-8 text-base-content flex items-center gap-3">
        Mi Perfil
        {user.is_admin && (
          <span className="badge badge-primary badge-lg">Administrador</span>
        )}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA: Tarjeta de Identidad */}
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body items-center text-center">
              {/* Avatar  */}
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
                  <img src={avatarPath} alt={`Avatar de ${user.username}`} />
                </div>
              </div>

              {/* Info Principal */}
              <h2 className="card-title text-2xl font-bold">{user.username}</h2>
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-2">
                <HiOutlineEnvelope className="text-lg" /> {user.email}
              </p>
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-1 capitalize">
                <HiOutlineCalendar className="text-lg" />
                <span>Desde {formatDate}</span>
              </p>

              {/* Botón de Edición */}
              <div className="card-actions w-full mt-6">
                <button className="btn btn-primary btn-outline w-full">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA -> Estadísticas y Actividad */}
        <div className="md:col-span-2 space-y-6">
          <UserStats stats={stats} />

          {/* Actividad Reciente */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h3 className="text-xl font-bold border-b border-base-200 pb-3 mb-4">
                Actividad Reciente
              </h3>

              <div className="flex flex-col items-center justify-center py-8 text-base-content/40 text-center">
                <HiOutlineChatBubbleLeftRight className="text-5xl mb-3 opacity-20" />
                <p className="font-medium">
                  Aún no has hecho ninguna pregunta.
                </p>
                <p className="text-sm mt-1">
                  ¡Anímate a abrir tu primer hilo sobre IA!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;

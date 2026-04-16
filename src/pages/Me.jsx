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
import MeRecentActivity from "./MeRecentActivity";
import EditProfile from "../components/me/EditProfile";

// iconos
import {
  HiOutlineEnvelope,
  HiOutlineCalendar,
  HiMiniUserCircle,
  HiUserGroup,
} from "react-icons/hi2";
import { GiToken } from "react-icons/gi";

// direccion backend -> Stats
const stats_url = "https://stackmind-api.onrender.com/users/me/stats";

const Me = () => {
  // contexto de Autenticacion -> User
  const { user, loading, token } = useAuth();

  // estado para estadisticas -> Stats
  const [stats, setStats] = useState({
    questions_count: 0,
    answers_count: 0,
    reputation: 0,
  });

  // estado para la edicion
  const [editing, setEditing] = useState(false);

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
          <div className="card bg-base-100 shadow-xl border border-base-200 ">
            <div className="card-body items-start">
              {/* Avatar  */}
              <div className="avatar mb-4 self-center ">
                <div className=" w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
                  <img src={avatarPath} alt={`Avatar de ${user.username}`} />
                </div>
              </div>

              {/* Info Principal */}
              <h2 className="card-title text-2xl font-bold">{user.username}</h2>
              {/* email */}
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-2">
                <HiOutlineEnvelope className="text-lg text-accent" />{" "}
                {user.email}
              </p>
              {/* username avatar_url: created_at  email full_name id is_active is_admin reputation username*/}
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-1 capitalize">
                <HiUserGroup className="text-lg text-accent" />
                <span> {user.username}</span>
              </p>
              {/* Full Name*/}
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-1 capitalize">
                <HiMiniUserCircle className="text-lg text-accent" />
                <span> {user.full_name}</span>
              </p>

              {/* Fecha de Registro   */}
              <p className="text-base-content/60 font-medium flex items-center gap-2 mt-1 capitalize">
                <HiOutlineCalendar className="text-lg text-accent" />
                <span>Desde {formatDate}</span>
              </p>

              {/* Botón de Edición */}
              <div className="card-actions w-full mt-6">
                <button
                  className="btn btn-primary btn-outline w-full"
                  onClick={() => setEditing(true)}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA -> Estadísticas y Actividad */}
        <div className="md:col-span-2 space-y-6">
          <UserStats stats={stats} />
          {editing ? (
            // Formulario de Edición
            <EditProfile user={user} setEditing={setEditing} />
          ) : (
            <MeRecentActivity />
          )}
        </div>
      </div>
    </div>
  );
};

export default Me;

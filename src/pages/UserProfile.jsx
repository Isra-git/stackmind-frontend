/* 

    Componente que Muestra el perfil Publico de un User

*/
// src/pages/UserProfile.jsx

import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

//  Autenticación
import { useAuth } from "../context/AuthContext";

// componentes
import UserStats from "../components/shared/UserStats";
import { format_date } from "../api/helpers";
import { ENDPOINTS } from "../api/constantes";

// iconos
import { GiToken } from "react-icons/gi";

const UserProfile = () => {
  // Capturamos el id de la URL
  const { id } = useParams();

  // Contexto de Autenticación
  const { token, user: loggedUser } = useAuth();

  // Estados
  const [profileUser, setProfileUser] = useState(null);
  const [stats, setStats] = useState({
    questions_count: 0,
    answers_count: 0,
    reputation: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Si no hay token, no hacemos la petición
    if (!token) return;

    // Reset al cambiar de usuario
    setProfileUser(null);
    setLoading(true);
    setError(false);

    const fetchProfileData = async () => {
      try {
        // Siempre hacemos fetch completo (usuario + stats)
        const [userRes, statsRes] = await Promise.all([
          fetch(ENDPOINTS.USER_PROFILE(id), {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(ENDPOINTS.USER_PROFILE_STATS(id), {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // debug 
        console.log("USER_PROFILE status:", userRes.status, ENDPOINTS.USER_PROFILE(id));
        console.log("USER_PROFILE_STATS status:", statsRes.status, ENDPOINTS.USER_PROFILE_STATS(id));

        if (!userRes.ok || !statsRes.ok)
          throw new Error("Fallo al cargar datos");

        setProfileUser(await userRes.json());
        setStats(await statsRes.json());
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, token]);

  // Si el usuario intenta ver su propio perfil público, lo redirigimos a su panel "/me"
  if (loggedUser && loggedUser.id === parseInt(id)) {
    return <Navigate to="/me" replace />;
  }

  // Spinner de carga
  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  // Manejo de errores o usuario inexistente
  if (error || !profileUser) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-bold text-error">Usuario no encontrado</h2>
        <p className="text-base-content/70">
          El perfil que buscas no existe o fue eliminado.
        </p>
      </div>
    );
  }

  // Lógica para definir la ruta del Avatar
  let avatarPath = "/img/avatars/0/avatar2.png";
  if (profileUser.is_admin) {
    avatarPath = "/img/avatars/0/avatar1.jpeg";
  } else if (profileUser.avatar_url) {
    avatarPath = `/img/avatars/${profileUser.avatar_url}`;
  }

  // Formatear la fecha de registro
  const formatDate = format_date(new Date(profileUser.created_at));

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* TARJETA DEL USUARIO  */}
      <div className="card bg-base-200 shadow-xl p-8 mb-8 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="avatar mb-4">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-200 ring-offset-4 shadow-lg">
            <img src={avatarPath} alt={`Avatar de ${profileUser.username}`} />
          </div>
        </div>

        {/* Nombre */}
        <h1 className="text-4xl font-extrabold mb-2 text-base-content flex items-center justify-center gap-3">
          {profileUser.username}
          {profileUser.is_admin && (
            <span className="badge badge-primary badge-md align-middle">
              Admin
            </span>
          )}
        </h1>

        {/* Fecha de registro */}
        <p className="text-base-content/60 font-medium mb-6">
          Miembro desde {formatDate}
        </p>

        {/* Reputacion */}
        <div className="badge badge-secondary badge-lg gap-2 px-5 py-5 text-lg font-bold shadow-sm">
          <GiToken className="text-2xl" />
          {profileUser.reputation} de Reputación
        </div>
      </div>

      {/* Estadistica  */}
      <div className="w-full flex justify-center">
        {/* Asegúrate de que UserStats soporta layout="horizontal" como configuramos antes */}
        <UserStats stats={stats} layout="horizontal" />
      </div>
    </div>
  );
};

export default UserProfile;
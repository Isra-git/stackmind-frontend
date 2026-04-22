/* 

    SubComponente de /me -> Muestra la info del perfil

*/
import React from "react";

// iconos
import {
  HiOutlineEnvelope,
  HiOutlineCalendar,
  HiMiniUserCircle,
  HiUserGroup,
} from "react-icons/hi2";

export default function ProfileInfo({
  user,
  avatarPath,
  formatDate,
  setEditing,
}) {
  return (
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
            <HiOutlineEnvelope className="text-lg text-accent" /> {user.email}
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
              className="btn btn-info btn-outline w-full"
              onClick={() => setEditing(true)}
            >
              Editar Perfil
            </button>
          </div>
          {user.is_admin && (
            <div className="card-actions w-full mt-6">
              <button
                className="btn btn-error btn-outline w-full"
                onClick={() => setEditing(true)}
              >
                Panel Administrador
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

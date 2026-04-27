/* 

    SubComponente Para Editar el Perfil


*/

// src/components/me/EditProfile.jsx

// dependencias
import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ENDPOINTS } from "../../api/constantes";
import {availableAvatars} from "../../api/helpers";


import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineXMark,
  HiOutlineCheck,
  HiMiniUserCircle,
} from "react-icons/hi2";

const EditProfile = ({ setEditing }) => {
  // extraemos Token del contexto
  const { token, user, updateLocalUser } = useContext(AuthContext);

  // Inicializamos el estado con los datos actuales del usuario
  const [formData, setFormData] = useState({
    username: user?.username || "",
    full_name: user?.full_name || "",
    avatar_url: user?.avatar_url || "avatar2.png",
  });

  // estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // generamos la lista de avatares
  // const availableAvatars = Array.from(
  //   { length: 13 },
  //   (value, index) => `avatar${index + 2}.png`,
  // );

  //  Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Ocultamos mssg exito si User -> Vuelve a escribir
    setSuccess(false);
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // gestionamos la llamada al bknd

      const response = await fetch(
        ENDPOINTS.USER_UPDATE,
        // "https://stackmind-api.onrender.com/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Autenticación obligatoria
          },
          // Enviamos el JSON exacto que espera UserUpdate
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Capturamos el HTTP_400_BAD_REQUEST de tu backend ("usuario no disponible")
        throw new Error(data.detail || "Hubo un error al actualizar el perfil");
      }

      // Si el backend responde 200_OK, actualizamos el estado global en React
      // para que el navbar y otras vistas cambien al instante
      if (updateLocalUser) {
        updateLocalUser(data);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 animate-fade-in">
      <div className="card-body p-8 sm:p-10">
        <div className="card-title flex flex-col items-center justify-center mb-6">
          <h3 className="text-2xl font-bold text-center">Editar Perfil</h3>
          <p className="text-center text-base-content/70 mt-2">
            Actualiza tu información pública en StackMind
          </p>
        </div>

        <div className="divider w-4/5 mx-auto mb-8 mt-0"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre Completo */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text font-medium text-base-content/80">
                Nombre Completo
              </span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                <HiMiniUserCircle className="text-base-content/40 text-lg group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                name="full_name"
                className="w-full h-12 pl-11 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                placeholder="Ej. Ada Lovelace"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campo: Nombre de Usuario */}
          <div className="form-control w-full">
            <label className="label pb-2">
              <span className="label-text font-medium text-base-content/80">
                Nombre de Usuario
              </span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                <HiOutlineUser className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                name="username"
                className="w-full h-12 pl-11 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                placeholder="Tu alias en el foro"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Cambiar AVATAR->  Grid (4 columnas en móvil, 5 en PC) */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 mt-2 p-2 bg-base-200/50 rounded-xl border border-base-300">
            {availableAvatars.map((avatar) => (
              <div
                key={avatar}
                // Si el avatar es el que tenemos -> borde brillante
                className={`cursor-pointer rounded-full transition-all duration-200 ${
                  formData.avatar_url === avatar
                    ? "ring-4 ring-primary ring-offset-2 ring-offset-base-100 scale-110 shadow-lg"
                    : "opacity-50 hover:opacity-100 hover:scale-105"
                }`}
                //  actualizamos el avatar_url en el estado
                onClick={() => {
                  setFormData({ ...formData, avatar_url: avatar });
                  setSuccess(false);
                }}
              >
                <img
                  src={`/img/avatars/${avatar}`}
                  alt={`Avatar ${avatar}`}
                  className="w-full h-auto rounded-full bg-base-100"
                />
              </div>
            ))}
          </div>

          {/* Botones de Acción */}
          <div className="form-control mt-8 pt-4">
            <div className="flex gap-4">
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => setEditing(false)} // Este botón cancela y vuelve a la vista anterior
                disabled={loading}
              >
                <HiOutlineXMark className="text-lg" /> Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary flex-1 text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <HiOutlineCheck className="text-lg" /> Guardar
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

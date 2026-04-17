/* 

    SubComponente Para Editar el Perfil


*/

// src/components/me/EditProfile.jsx

// dependencias
import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineXMark,
  HiOutlineCheck,
  HiMiniUserCircle,
} from "react-icons/hi2";

const EditProfile = ({ user, setEditing }) => {
  // extraemos Token del contexto
  const { token, user, updateLocalUser } = useContext(AuthContext);

  // Inicializamos el estado con los datos actuales del usuario
  const [formData, setFormData] = useState({
    username: user?.username || "",
    full_name: user?.full_name || "",
    email: user?.avatar_url || "",
  });

  // estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    setError(true);
    setSuccess(false);

    try {
      // gestionamos la llamada al bknd

      const response = await fetch(
        "https://stackmind-api.onrender.com/users/me",
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
            <label className="label">
              <span className="label-text font-medium">Nombre Completo</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMiniUserCircle className="text-base-content/50 text-lg" />
              </div>
              <input
                type="text"
                name="full_name"
                className="input input-bordered w-full"
                placeholder="Ej. Ada Lovelace"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campo: Nombre de Usuario */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Nombre de Usuario</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineUser className="text-base-content/50 text-lg" />
              </div>
              <input
                type="text"
                name="username"
                className="input input-bordered w-full pl-10"
                placeholder="Tu alias en el foro"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Campo: Email */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Correo Electrónico</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineEnvelope className="text-base-content/50 text-lg" />
              </div>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full pl-10"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
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

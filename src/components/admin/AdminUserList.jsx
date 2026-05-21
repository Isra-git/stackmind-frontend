// src/pages/AdminUserList.jsx

import React, { useState, useEffect } from "react";
import { HiOutlineUsers, HiOutlineUserRemove, HiOutlineUserAdd } from "react-icons/hi";
import toast from "react-hot-toast"; // <-- Importamos react-hot-toast
import { ENDPOINTS } from "../api/constantes";

const AdminUserList = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  // Estados del componente
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Asegúrate de incluir el token de autorización si tu backend lo requiere
      const token = localStorage.getItem("token"); 
      
      const response = await fetch(ENDPOINTS.ADMIN_USER_LIST(0, 50), {
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      });

      if (!response.ok) throw new Error("No se pudo cargar la lista de usuarios");
      
      const data = await response.json();
      setUsers(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    if (currentUser.is_admin) {
      fetchUsers();
    }
  }, []);

  // Función para alternar el estado del usuario (Activar/Desactivar)
  const handleToggleStatus = async (userId, currentStatus) => {
    // Opcional: Puedes usar un toast de carga si la petición tarda
    const loadingToast = toast.loading("Actualizando estado...");

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(ENDPOINTS.ADMIN_TOGGLE_USER(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error al cambiar el estado del usuario");

      // Actualizamos el estado local para reflejar el cambio en la UI instantáneamente
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: !currentStatus } : user
      ));
      
      // Toast de éxito
      toast.success(
        currentStatus ? "Usuario desactivado correctamente" : "Usuario activado correctamente",
        { id: loadingToast } // Reemplaza el toast de carga
      );
      
    } catch (err) {
      // Toast de error (reemplaza el alert)
      toast.error(`¡Ups! ${err.message}`, { id: loadingToast });
    }
  };

  if (!currentUser.is_admin) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-3xl font-bold text-error">Acceso Denegado</h2>
        <p className="opacity-70">
          No tienes permisos de administrador para ver esta sección.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-base-300 pb-4">
        <h2 className="text-xl font-mono font-bold flex items-center gap-2">
          <HiOutlineUsers className="text-primary" />
          Gestión de Usuarios
        </h2>
        {/* Espacio para filtros o pag */}
        <div className="text-sm opacity-70">
          Total: {users.length} usuarios
        </div>
      </div>

      {/* Contenedor de la lista */}
      <div className="flex flex-col gap-4">
        {error ? (
          <div className="alert alert-error shadow-lg">
            <span>¡Ups! {error}</span>
          </div>
        ) : loading ? (
          <div className="py-20 flex justify-center items-center">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 opacity-50 font-medium">
            No hay usuarios en la plataforma todavía.
          </div>
        ) : (
          // Tarjetas de usuario
          users.map((user) => (
            <div 
              key={user.id} 
              className="bg-base-100 border border-base-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-colors shadow-sm"
            >
              {/* Info del usuario */}
              <div className="flex flex-col">
                <span className="font-semibold text-lg flex items-center gap-2">
                  {user.username || user.full_name}
                  {user.is_admin && (
                    <span className="badge badge-primary badge-xs">Admin</span>
                  )}
                </span>
                <span className="text-sm opacity-70">{user.email}</span>
                
                <div className="mt-2">
                  <span className={`badge badge-sm ${user.is_active ? 'badge-success text-success-content' : 'badge-error text-error-content'}`}>
                    {user.is_active ? 'Activo' : 'Desactivado'}
                  </span>
                </div>
              </div>

              {/* Botón de Activar / Desactivar */}
              <button
                onClick={() => handleToggleStatus(user.id, user.is_active)}
                disabled={user.id === currentUser.id}
                className={`btn btn-sm ${
                  user.is_active 
                    ? 'btn-outline btn-error' 
                    : 'btn-outline btn-success'
                }`}
              >
                {user.is_active ? (
                  <>
                    <HiOutlineUserRemove className="text-lg" />
                    Desactivar
                  </>
                ) : (
                  <>
                    <HiOutlineUserAdd className="text-lg" />
                    Activar
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
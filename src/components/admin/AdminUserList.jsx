import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  HiOutlineUsers, 
  HiOutlineUserRemove, 
  HiOutlineUserAdd,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from "react-icons/hi";
import { ENDPOINTS } from "../../api/constantes";
import Modal from "../shared/Modal";

const AdminUserList = () => {
  // Contexto de Autenticación
  const { user: currentUser, token } = useAuth();

  // Estados del componente
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Estados del Modal de Resultados
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });

  // Usamos useCallback para que la función no se recree en cada render
  // y podamos usarla de forma segura en el useEffect
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(ENDPOINTS.ADMIN_USER_LIST(0, 50), {
        headers: {
          "Authorization": `Bearer ${token}` 
        }
      });

      if (!response.ok) throw new Error("No se pudo cargar la lista de usuarios");
      
      const data = await response.json();
      
      // Aseguramos que la respuesta sea un array para que el .map no falle
      // (Ajusta esto si tu backend devuelve algo como { items: [...] })
      setUsers(Array.isArray(data) ? data : data.users || []); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]); // Depende del token

  // Cargar usuarios al montar o cuando el currentUser cambie
  useEffect(() => {
    // Solo disparamos la petición si hay usuario y es admin
    if (currentUser?.is_admin && token) {
      fetchUsers();
    } else {
      // Evitamos que se quede en loading infinito si no tiene permisos
      setLoading(false); 
    }
  }, [currentUser, token, fetchUsers]); // Añadidas las dependencias correctas

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    const { id: userId, is_active: currentStatus } = selectedUser;

    try {
      // Quitamos el localStorage.getItem("token") y usamos el token del contexto
      const response = await fetch(ENDPOINTS.ADMIN_TOGGLE_USER(userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error al cambiar el estado del usuario");

      // Actualizamos el estado local
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: !currentStatus } : user
      ));
      
      setResultModal({
        isOpen: true,
        title: "Operación Exitosa",
        message: currentStatus ? "Usuario desactivado correctamente" : "Usuario activado correctamente",
        type: "success"
      });
      
    } catch (err) {
      setResultModal({
        isOpen: true,
        title: "¡Ups! Ocurrió un error",
        message: err.message,
        type: "error"
      });
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  // Validacion con opcional chaning
  if (!currentUser?.is_admin) {
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

              {/* Activar / Desactivar */}
              <button
                onClick={() => handleOpenModal(user)}
                disabled={user.id === currentUser?.id}
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

      <Modal
        isOpen={isModalOpen}
        icon={selectedUser?.is_active ? <HiOutlineUserRemove className="text-error" /> : <HiOutlineUserAdd className="text-success" />}
        title={selectedUser?.is_active ? "Desactivar Usuario" : "Activar Usuario"}
        message={`¿Estás seguro de que deseas ${selectedUser?.is_active ? 'desactivar' : 'activar'} a ${selectedUser?.username || selectedUser?.full_name}?`}
        primaryBtnText="Confirmar"
        onPrimaryClick={handleToggleStatus}
        secondaryBtnText="Cancelar"
        onSecondaryClick={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />

      <Modal
        isOpen={resultModal.isOpen}
        icon={resultModal.type === "success" ? <HiOutlineCheckCircle className="text-success" /> : <HiOutlineXCircle className="text-error" />}
        title={resultModal.title}
        message={resultModal.message}
        primaryBtnText="Aceptar"
        onPrimaryClick={() => setResultModal({ ...resultModal, isOpen: false })}
      />
    </div>
  );
};

export default AdminUserList;
/* 

    Pagina de Register

*/
// src/pages/Register.jsx

// dependencias
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { avatarGroups } from "../api/helpers";
import AvatarPicker from "../components/profile/AvatarPicker";
import { ENDPOINTS } from "../api/constantes";

// iconos
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineLockClosed,
  HiOutlineIdentification,
} from "react-icons/hi2";

const Register = () => {
  // estados -> Objeto para los datos del Registro
  const [datos, setDatos] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
    avatar_url: "" || "avatar2.png",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // instancia de navegacion
  const navigate = useNavigate();

  // manejador de cambios en el form
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion para manejar el ENVIO
  const submitRegister = async (e) => {
    // evitamos que recarge
    e.preventDefault();

    // gestionamos estados
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      // gestionamos la llamada al bknd
      const response = await fetch(
        ENDPOINTS.AUTH_REGISTER,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          // enviamos el objeto con los datos del usuario
          body: JSON.stringify(datos),
        },
      );

      // seteamos los Datos
      const data = await response.json();

      if (!response.ok) {
        // Capturamos el HTTP_400_BAD_REQUEST de tu backend ("usuario no disponible")
        throw new Error(data.detail || "Hubo un error al Crear el la cuenta");
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {/*  MODAL DE DAISY UI */}

      <input
        type="checkbox"
        id="register_modal"
        className="modal-toggle"
        checked={success || !!error} // Se abre si hay éxito o error
        readOnly
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {success ? (
              <HiOutlineCheck className="text-success w-6 h-6" />
            ) : (
              <HiOutlineXMark className="text-error w-6 h-6" />
            )}
            {success ? "¡Cuenta creada!" : "Algo salió mal"}
          </h3>
          <p className="py-4">
            {success
              ? "Bienvenido a StackMind. Tu perfil ha sido creado correctamente. Ya puedes acceder a la comunidad."
              : error}
          </p>
          <div className="modal-action">
            {success ? (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Ir al Login
              </button>
            ) : (
              <button className="btn" onClick={() => setError(false)}>
                Reintentar
              </button>
            )}
          </div>
        </div>
      </div>
      {/* FIN MODAL */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body ">
          <div className="card-title flex items-center justify-center">
            <Link
              to="/"
              className="text-xl md:text-5xl font-extrabold tracking-tight ml-2 flex items-center justify-center "
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                StackMind
              </span>
              <img
                src="/img/logo/logo_stackmind.png"
                alt="StackMind"
                width="85"
                height="50"
                fetchPriority="high"
                loading="eager"
              />
            </Link>
          </div>
          <div className="divider w-4/5 mx-auto py-3"></div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Bienvenido a tu comunidad de IA en castellano
          </h2>
          <p className="text-center text-xl  text-base-content/70 mb-6">
            Registrate para participar en la comunidad:
          </p>

          {/* si hay ERROR -> lo mostramos */}
          {error && (
            <div className="alert alert-error mb-4 rounded-lg text-sm p-3">
              <span>{error}</span>
            </div>
          )}

          {/*   submitRegister al enviarse */}
          <form className="space-y-4" onSubmit={submitRegister}>
            {/*  Email */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium text-base-content/80">
                  Correo electrónico
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                  <HiOutlineEnvelope className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="w-full h-12 pl-11 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="tu@email.com"
                  value={datos.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/*  Nombre de Usuario */}
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
                  value={datos.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/*  Nombre Completo */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium text-base-content/80">
                  Nombre Completo
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                  <HiOutlineIdentification className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  name="full_name" // Verifica que en el estado sea 'full_name'
                  className="w-full h-12 pl-11 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="Escribe tu nombre completo"
                  value={datos.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-medium text-base-content/80">
                  Contraseña
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary">
                  <HiOutlineLockClosed className="text-base-content/50 text-lg group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="w-full h-12 pl-11 pr-4 bg-base-200/30 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/30 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                  placeholder="••••••••"
                  value={datos.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Cambiar AVATAR->  Grid (4 columnas en móvil, 5 en PC) */}
            <div className="form-control mt-4 p-4 bg-base-300/40 rounded-2xl border border-base-300">
              {/* Título: 10% más oscuro (usando text-base-content/80 o base-300) */}
              <div className="flex flex-col items-center mb-4">
                <label className="label py-0">
                  <span className="label-text font-semibold text-md text-base-content/90">
                    Selecciona un Avatar
                  </span>
                </label>

                {/* Línea separadora: 80% de ancho, centrada y sutil */}
                <div className="h-[1px] w-[80%] bg-base-content/10 mt-2"></div>
              </div>
              <AvatarPicker
                avatarGroups={avatarGroups}
                formData={datos}
                setFormData={setDatos}
                setSuccess={setSuccess}
              />
            </div>

            {/* Botón Submit */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Crear cuenta"
                )}
              </button>
            </div>
          </form>

          <div className="divider text-sm">O</div>

          <p className="text-center text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Entra aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

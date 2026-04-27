/* 

    Pagina Login

*/

// src/pages/Login.jsx

// dependencias
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  // estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sacamos la funcion login y los estados de carga/errores del AuthContext
  const { login, loading, error } = useAuth();

  // hook para redirigir al User despues del login
  const navigate = useNavigate();

  // manejador de envio
  const handleSubmit = async (e) => {
    e.preventDefault();

    // llamar AuthContxt
    const success = await login(email, password);

    // ok? -> redirigimos al usuario a la pagina principal
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
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
            Bienvenido de nuevo
          </h2>
          <p className="text-center text-base-content/70 mb-6">
            Inicia sesión para participar en la comunidad
          </p>

          {/* si hay ERROR -> lo mostramos */}
          {error && (
            <div className="alert alert-error mb-4 rounded-lg text-sm p-3">
              <span>{error}</span>
            </div>
          )}

          {/*   handleSubmit al enviarse */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Correo electrónico
                </span>
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                //  BINDING (Enlace bidireccional)
                value={email} // El input muestra lo que hay en el estado
                onChange={(e) => setEmail(e.target.value)} // Al escribir, actualizamos el estado
                required
              />
            </div>

            {/* Contraseña */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                // BINDING
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  ¿Olvidaste tu contraseña?
                </a>
              </label> */}
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
                  "Iniciar Sessión"
                )}
              </button>
            </div>
          </form>

          <div className="divider text-sm">O</div>

          <p className="text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="link link-primary font-semibold">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

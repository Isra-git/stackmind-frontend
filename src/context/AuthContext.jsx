/*
    Controla quien inicia sesion y sus datos
*/

// src/context/AuthContext.jsx

// dependencias
import React, { createContext, useState, useContext, useEffect } from "react";

// url de back-end
const back_end_url = "https://stackmind-api.onrender.com/auth/login";
const me_url = "https://stackmind-api.onrender.com/auth/me";

// creamos el contexto
export const AuthContext = createContext();

// creamos el Provider para envolver la App
export const AuthProvider = ({ children }) => {
  // comprobamos si hay token y usuario en localStorage
  const [token, setToken] = useState(
    localStorage.getItem("stackmind_jwt") || null,
  );
  // resto de estados
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funcion que recupera los datos del User despues de loguearse
  const fetchUserProfile = async (currentToken) => {
    try {
      const response = await fetch(me_url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) throw new Error();

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.log(err);

      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // login -> backend devuelve el jwt -> damos acceso + localStorage
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      // lanzamos la peticion
      const response = await fetch(back_end_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      // recibimos la respuesta
      const data = await response.json();

      // si no va bien
      if (!response.ok) {
        throw new Error(data.detail || "Error al Iniciar la Session");
      }

      // si todo ok
      const accessToken = data.access_token;
      setToken(accessToken);

      // guardamos el jwt en localstorage
      localStorage.setItem("stackmind_jwt", accessToken);

      // recuperamos los datos del User
      await fetchUserProfile(accessToken);

      // devolvemos true para indicar que el login fue exitoso
      return true;
    } catch (err) {
      // si hay error, guardamos el mensaje de error y devolvemos false
      setError(err.message);
      return false;
    } finally {
      // quitamos el estado de carga
      setLoading(false);
    }
  };

  // logout -> borramos token y usuario de localStorage
  const logout = () => {
    // limpiamos los estados y el localstorage
    setToken(null);
    setUser(null);
    localStorage.removeItem("stackmind_jwt");
    localStorage.clear();
  };

  // devolvemos el Provider con los datos del contexto
  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, error, loading }}
    >
      {loading && !user && token ? (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Exportamos el hook (y no la funcion) para usarlo en los componentes (mas facil)
export const useAuth = () => useContext(AuthContext);

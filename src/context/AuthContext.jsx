/*

    Controla quien inicia sesion y sus datos

*/

// src/context/AuthContext.jsx

// dependencias
import React, { createContext, useState } from "react";

// creamos el contexto
export const AuthContext = createContext();

// creamos el Provider para envolver la App
export const AuthProvider = ({ children }) => {
  // comprobamos si hay token y usuario en localStorage
  const [token, setToken] = useState(
    localStorage.getItem("stackmind_jwt") || null,
  );
  const [user, setUser] = useState(null);

  // login -> backend devuelve el jwt -> damos acceso + localStorage
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    localStorage.setItem("stackmind_jwt", newToken);
  };

  // logout -> borramos token y usuario de localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // devolvemos el Provider con los datos del contexto
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

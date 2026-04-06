/* esqueleto de StackMind 

*/

// src/layouts/MainLayout.jsx

// dependencias
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Hero from "../home/Hero";
//import Footer from "./Footer";

// componente principal
const MainLayout = () => {
  // ruta actual
  const location = useLocation();

  // diccionario de Cabeceras (clave:ruta , valor:{componente})
  //  añadir una para cada pagina a renderizar
  const topComponents = {
    "/": <Hero />,
    "/new": (
      <div className="py-12 bg-base-100 text-center">
        <h1 className="text-3xl font-bold">Nueva Pregunta en StackMind</h1>
      </div>
    ),
  };

  const CurrentTopComponent = topComponents[location.pathname];

  return (
    // contenedor principal , minimo 100 alto (min-h-screen)
    <div className="flex flex-col min-h-screen font-sans text-base-content">
      <div className="w-full bg-base-100">
        {/* Navbar */}
        <Navbar />

        {/* mostramos Hero si estamos en home*/}
        {CurrentTopComponent}
      </div>

      <div className="w-full bg-base-200 flex-1">
        <main className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 md:py-12 px-4 w-full">
          {/* arriba */}
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
            {/* Componente que injecto*/}
            <Outlet />
          </div>

          {/* debajo */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <Sidebar />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

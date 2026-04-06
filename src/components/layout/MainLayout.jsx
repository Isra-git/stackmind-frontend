/*  

    esqueleto de StackMind 

*/

// src/layouts/MainLayout.jsx

// dependencias
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
//import Footer from "./Footer";

// componente principal
const MainLayout = () => {
  return (
    // contenedor principal , minimo 100 alto (min-h-screen)
    <div className="min-h-screen bg-base-2000 font-sans text-base-content">
      {/* Navbar */}
      <Navbar />

      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 md:py-12 px-4">
        {/* columna izquierda */}
        <div className="order-2 lg:order-1 lg:col-span-8 space-y-6">
          {/* Componente que injecto*/}
          <Outlet />
        </div>

        {/* columna derecha */}
        <Sidebar />
      </main>
    </div>
  );
};
export default MainLayout;

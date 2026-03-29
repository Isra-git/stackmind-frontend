import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'], // Vital para ocultar/mostrar elementos según el tema
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Tipografía limpia
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: { // --- Basado en la paleta GOOGLE por -> (Claro, limpio, legible) 
          "primary": "#1a73e8",       
          "secondary": "#5f6368",     
          "accent": "#fbbc04",        
          "neutral": "#3d4451",
          "base-100": "#ffffff",      // Fondo blanco puro
          "base-200": "#f8f9fa",      // Gris para fondos secundarios
          "base-300": "#e8eaed",      // Bordes
          "base-content": "#202124",  // Texto principal
        },
        dark: { // --- Basado en la paleta VERCEL por -> (Midnight, alto contraste) 
          "primary": "#3b82f6",       
          "secondary": "#8b5cf6",     
          "accent": "#00DFD8",
          "neutral": "#111111",
          "base-100": "#0a0a0a",      // fondo "Midnight"
          "base-200": "#111111",      // Fondo para las cards
          "base-300": "#333333",      // Bordes sutiles
          "base-content": "#ededed",  //  texto claro
        },
      },
    ],
  },
};
# 🧠 StackMind — Frontend

> **Capstone Project · Devcamp Full-Stack Bootcamp**

Bienvenido al repositorio frontend de **StackMind**, tu comunidad de IA en español. 

StackMind es un foro al estilo StackOverflow, pero con un propósito único: **ayudar a personas con pocos o nulos conocimientos técnicos a implementar y usar la Inteligencia Artificial en su día a día**, ya sea para el trabajo o su vida personal. Es un "Ágora Digital" donde la tecnología se explica de humanos a humanos.

---

## 🛠️ Stack Técnico

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Funcionalidades Principales

Nuestra interfaz está diseñada para reducir la fricción técnica, envolviendo lógica compleja en una experiencia de usuario (UX) limpia y accesible.

* **🪄 Asistente de Escritura IA (Powered by Groq):** Nuestro "Magic AI Button". Un usuario sin conocimientos técnicos puede escribir su duda de forma natural; el frontend envía este texto a nuestro backend, donde un LLM (Llama 3 vía Groq) lo reestructura, optimiza y devuelve una pregunta profesional y clara, lista para publicar.
* **🔍 Búsqueda Híbrida Avanzada (pgvector):** La barra de búsqueda no solo busca coincidencias exactas. El frontend interactúa con un motor de búsqueda respaldado por PostgreSQL que combina `tsvector` (Full-Text) y `pgvector` (Búsqueda Semántica Vectorial). Si buscas "crear imágenes", encontrará resultados sobre "Midjourney" o "DALL-E" gracias a la comprensión del contexto.
* **👥 Ecosistema de Usuarios:** Autenticación completa con JWT (Registro, Login, persistencia de sesión). Perfiles personalizables con categorización de avatares (Robots, Humanos, etc.) y un sistema de reputación gamificado.
* **💬 Motor de Foro Completo:** CRUD asíncrono de preguntas y respuestas. Contador automático de visualizaciones por pregunta, anclas dinámicas para respuestas (`#answer-id`) y paginación inteligente.
* **🎨 Diseño "Human-Centric":** UI construida con TailwindCSS y DaisyUI. Totalmente *responsive*, con feedback visual constante (loaders, tooltips, toasts) y un diseño cálido que aleja la "frialdad" habitual de la IA.

---

## 📦 Arquitectura y Modelos de Datos

El frontend gestiona la complejidad del estado utilizando *Custom Hooks* e interfaces de datos bien definidas para comunicarse con la API de FastAPI. 

A continuación, la estructura principal de nuestros datos en el cliente:

```javascript
// Estructura del Objeto User (Contexto de Autenticación)
const User = {
  id: "uuid",
  email: "usuario@stackmind.app",
  username: "TechPioneer",
  full_name: "Nombre Apellido",
  avatar_url: "/avatars/1/4.png", // Categorizado por carpetas
  reputation: 150,                // Escala de puntos del foro
  is_admin: false,
  is_active: true,
  created_at: "2026-03-01T12:00:00Z"
}

// Estructura del Objeto Question
const Question = {
  id: 101,
  title: "¿Cómo puedo usar ChatGPT para resumir PDFs largos?",
  body: "Texto completo en formato string o array de bloques...",
  author_id: "uuid",
  views: 42,
  created_at: "2026-05-08T10:30:00Z",
  author: { /* Datos reducidos del User */ },
  answers: [ /* Array de objetos Answer */ ]
}

// Estructura del Objeto Answer
const Answer = {
  id: 50,
  question_id: 101,
  body: [ /* Array para pasos segmentados/tutoriales */ ],
  author_id: "uuid",
  created_at: "2026-05-08T11:15:00Z",
  author: { /* Datos reducidos del User */ }
}

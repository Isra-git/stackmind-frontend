# 🧠 StackMind — Frontend

> Capstone Project · Devcamp Full-Stack Bootcamp

Interfaz de usuario para **StackMind**, una plataforma de Q&A estilo StackOverflow orientada a ayudar a personas no técnicas a implementar IA en su día a día. Conectada al backend FastAPI con autenticación JWT y un asistente de escritura impulsado por Groq (Llama 3).

---

## 🛠️ Stack técnico

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Funcionalidades principales

- **Autenticación completa** — Registro e inicio de sesión con JWT. Rutas protegidas y persistencia de sesión.
- **Motor de preguntas** — CRUD completo de preguntas y respuestas con sistema de reputación (escala 1-4).
- **Contador de vistas** — Seguimiento automático de visualizaciones por pregunta.
- **Búsqueda full-text** — Búsqueda optimizada en español usando PostgreSQL `tsvector` + `tsquery` desde el backend.
- **Magic AI Button** — Envía texto sin formato y recibe una pregunta profesional y bien estructurada lista para publicar.

---

## 💻 Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/Isra-git/stackmind-frontend.git
cd stackmind-frontend

# 2. Instala dependencias
npm install

# 3. Configura las variables de entorno
# Crea un archivo .env en la raíz con:
VITE_API_URL=http://127.0.0.1:8000

# 4. Arranca el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 🔗 Repositorios relacionados

- [stackmind-backend](https://github.com/Isra-git/stackmind-backend) — API REST con FastAPI, PostgreSQL (Supabase) y Groq AI

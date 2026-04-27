# 🧠 StackMind — Frontend

> Capstone Project · Devcamp Full-Stack Bootcamp

Interfaz de usuario para **StackMind**, una plataforma de Q&A estilo StackOverflow orientada a ayudar a personas no técnicas a implementar IA en su día a día. Conectada al backend FastAPI con autenticación JWT y un asistente de escritura impulsado por Groq (Llama 3).

## 🛠️ Stack técnico

- **Framework:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Routing:** React Router v6
- **Auth:** JWT (consumido desde el backend)
- **AI:** Magic AI Button via Groq API (Llama-3.3-70b)
- **Lenguaje:** JavaScript ES2023

## ✨ Funcionalidades principales

- **Autenticación completa** — Registro e inicio de sesión con JWT. Rutas protegidas y persistencia de sesión.
- **Motor de preguntas** — CRUD completo de preguntas y respuestas con sistema de reputación (escala 1-4).
- **Contador de vistas** — Seguimiento automático de visualizaciones por pregunta.
- **Búsqueda full-text** — Búsqueda optimizada en español usando PostgreSQL `tsvector` + `tsquery` desde el backend.
- **Magic AI Button** — Envía texto sin formato y recibe una pregunta profesional y bien estructurada lista para publicar.

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

## 🔗 Repositorios relacionados

- [stackmind-backend](https://github.com/Isra-git/stackmind-backend) — API REST con FastAPI, PostgreSQL (Supabase) y Groq AI

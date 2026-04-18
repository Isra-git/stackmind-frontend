// src/config/api.js

// URL base de tu backend en producción
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  //  AUTENTICACIÓN (auth)
  AUTH_REGISTER: `${API_BASE}/auth/register`, // POST
  AUTH_LOGIN: `${API_BASE}/auth/login`, // POST
  AUTH_ME: `${API_BASE}/auth/me`, // GET (Obtener datos de sesión)

  // USUARIOS (users)
  USER_UPDATE: `${API_BASE}/users/me`, // PUT (Actualizar perfil)
  USER_DELETE: `${API_BASE}/users/me`, // DELETE (Desactivar cuenta)
  USER_STATS: `${API_BASE}/users/me/stats`, // GET (Estadísticas del perfil)
  LEADERBOARD: `${API_BASE}/users/leaderboard`, // GET (Top 10 usuarios)

  // Rutas de Admin
  ADMIN_USER_LIST: (skip = 0, limit = 20) =>
    `${API_BASE}/users/admin/list?skip=${skip}&limit=${limit}`, // GET
  ADMIN_TOGGLE_USER: (userId) => `${API_BASE}/users/${userId}/toggle-status`, // PUT

  // PREGUNTAS (questions)
  QUESTIONS_BASE: `${API_BASE}/questions/`, // POST (crear pregunta)
  QUESTIONS_ALL: (skip = 0, limit = 20) =>
    `${API_BASE}/questions/?skip=${skip}&limit=${limit}`, // GET (listar)
  QUESTIONS_SEARCH: (query, skip = 0, limit = 20) =>
    `${API_BASE}/questions/search?query=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`, // GET
  QUESTIONS_UNANSWERED: (skip = 0, limit = 20) =>
    `${API_BASE}/questions/unanswered?skip=${skip}&limit=${limit}`, // GET
  QUESTIONS_TOP: (skip = 0, limit = 20) =>
    `${API_BASE}/questions/top?skip=${skip}&limit=${limit}`, // GET

  // Rutas dinámicas para una pregunta específica
  QUESTION_DETAIL: (questionId) => `${API_BASE}/questions/${questionId}`, // GET, PUT (editar), DELETE

  // RESPUESTAS (answers)
  // Crear (POST) respuesta a una pregunta en concreto
  ANSWERS_CREATE: (questionId) => `${API_BASE}/answers/question/${questionId}`,

  // Listar (GET) respuestas de una pregunta en concreto con paginación
  ANSWERS_BY_QUESTION: (questionId, skip = 0, limit = 50) =>
    `${API_BASE}/answers/question/${questionId}?skip=${skip}&limit=${limit}`,

  // Rutas dinámicas de una respuesta específica
  ANSWER_DETAIL: (answerId) => `${API_BASE}/answers/${answerId}`, // PUT (editar), DELETE
  ANSWER_VOTE: (answerId) => `${API_BASE}/answers/${answerId}/vote`, // POST

  // INTELIGENCIA ARTIFICIAL (ai)
  AI_ENHANCE: `${API_BASE}/ai/enhance-question`, // POST
};

---
project: StackMind
framework: Tailwind + DaisyUI
last_updated: 2026-04-05
status: Draft
---

# Componentes de DaisyUI a usar y su función

:::info
Esta selección prioriza la accesibilidad para usuarios no técnicos, buscando una interfaz cálida y menos intimidante que un foro de programación tradicional.
:::

### 1. Card (Tarjetas)

Esencial para las preguntas en el feed.

- **Uso:** `card-side` en pantallas grandes, `card-normal` en móviles.
- **Propósito:** Agrupar contenido de forma limpia. El estilo de lista en escritorio optimiza el escaneo visual de preguntas.

### 2. Stats (Estadísticas)

:::tip
Ubica este componente en el perfil del usuario o en el lateral de la pregunta.
:::

- **Función:** Mostrar puntos de reputación y número de respuestas.
- **Impacto:** Gamificación visual inmediata que motiva la participación.

### 3. Hero (Sección Destacada)

Para la página de bienvenida.

- **Función:** Explicar qué es **StackMind** a los usuarios no técnicos.
- **Diseño:** Debe incluir un CTA (Call to Action) claro como "Haz tu primera pregunta".

### 4. Steps (Pasos)

Perfecto para la ruta `/enhance-question`.
:::important
Guía al usuario en el proceso de "Mejorar mi pregunta con IA" paso a paso para no abrumarlo.
:::

1. Redacción inicial.
2. Optimización por IA.
3. Revisión humana.
4. Publicación.

### 5. Chat Bubble (Burbujas de Chat)

Para la sección de respuestas.

- **Estilo:** `chat-start` para otros usuarios, `chat-end` para el autor o la IA.
- **Efecto:** Aporta un toque humano y conversacional, alejándose del estilo rígido de tablas de otros foros.

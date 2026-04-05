# Sistema de Diseño: StackMind

Este documento detalla la paleta de colores semánticos configurada en `tailwind.config.js` usando daisyUI. Nuestro enfoque de diseño se basa en dos pilares para garantizar contraste, legibilidad y un aspecto profesional orientado a una comunidad de IA.

---

## Tabla Comparativa de Colores

| Propiedad (daisyUI) | Tema Claro (Google)                                                | Tema Oscuro (Vercel)                                               | Propósito en la Arquitectura Visual                                                                          |
| :------------------ | :----------------------------------------------------------------- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **`primary`**       | ![#1a73e8](https://placehold.co/15x15/1a73e8/1a73e8.png) `#1a73e8` | ![#0070f3](https://placehold.co/15x15/0070f3/0070f3.png) `#0070f3` | **Acciones principales:** Botones de llamada a la acción (CTAs), enlaces destacados, iconos centrales.       |
| **`secondary`**     | ![#5f6368](https://placehold.co/15x15/5f6368/5f6368.png) `#5f6368` | ![#262626](https://placehold.co/15x15/262626/262626.png) `#262626` | **Acciones secundarias:** Botones menos relevantes, fondos de apoyo.                                         |
| **`accent`**        | ![#fbbc04](https://placehold.co/15x15/fbbc04/fbbc04.png) `#fbbc04` | ![#00DFD8](https://placehold.co/15x15/00DFD8/00DFD8.png) `#00DFD8` | **Destellos visuales:** Detalles que necesitan romper la monotonía visual, como etiquetas.                   |
| **`neutral`**       | ![#3d4451](https://placehold.co/15x15/3d4451/3d4451.png) `#3d4451` | ![#111111](https://placehold.co/15x15/111111/111111.png) `#111111` | Elementos neutros de UI, fondos de avatares sin imagen o modales genéricos.                                  |
| **`base-100`**      | ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff` | ![#0a0a0a](https://placehold.co/15x15/0a0a0a/0a0a0a.png) `#0a0a0a` | **Fondo principal (Lienzo):** Todo el contenido principal y la navegación se apoyan directamente sobre él.   |
| **`base-200`**      | ![#f8f9fa](https://placehold.co/15x15/f8f9fa/f8f9fa.png) `#f8f9fa` | ![#111111](https://placehold.co/15x15/111111/111111.png) `#111111` | **Fondos secundarios (Cards):** Utilizado para diferenciar contenedores, tarjetas de preguntas y el sidebar. |
| **`base-300`**      | ![#e8eaed](https://placehold.co/15x15/e8eaed/e8eaed.png) `#e8eaed` | ![#333333](https://placehold.co/15x15/333333/333333.png) `#333333` | **Bordes y separadores:** Líneas divisorias, bordes sutiles de las tarjetas e inputs.                        |
| **`base-content`**  | ![#202124](https://placehold.co/15x15/202124/202124.png) `#202124` | ![#ededed](https://placehold.co/15x15/ededed/ededed.png) `#ededed` | **Tipografía principal:** El color para los textos generales, garantizando un alto contraste.                |

---

## Reglas de Uso (Tech Lead Guidelines)

1.  **Cero Hardcoding:** Nunca utilices clases absolutas como `bg-[#0a0a0a]` o `text-white` en los componentes. Usa siempre las variables semánticas (ej: `bg-base-100`, `text-base-content`).
2.  **Opacidad para la elegancia:** Para evitar colores estridentes (especialmente en modo oscuro), aplica opacidad a las variables semánticas en fondos grandes.
    - _Ejemplo correcto:_ `bg-primary/10` para el fondo de un título destacado.
    - _Ejemplo incorrecto:_ `bg-primary` en el fondo de toda una tarjeta.
3.  **Transiciones suaves:** Todos los elementos interactivos que cambien de color al hacer `hover` deben incluir la clase de utilidad `transition-colors` de Tailwind.

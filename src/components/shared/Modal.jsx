/* 


    Componente para Mostrar MODAL en otros componentes

*/

// src/components/shared/Modal.jsx

// importaciones
import React from "react";

const Modal = ({
  isOpen, // true o false para mostrarlo
  icon, // componente del icono
  title, // título en grande
  message, // texto explicativo
  primaryBtnText, // Texto del boton
  onPrimaryClick, // Funcion al hacer clic en el boton principal
  secondaryBtnText, // Texto del boton secundario  - Opcional
  onSecondaryClick, // Funcion al hacer clic en el boton secundario
}) => {
  // Si no esta abierto, cortamos aqui y no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle bg-base-300/60 backdrop-blur-sm z-50">
      <div className="modal-box bg-base-100 shadow-2xl border border-base-300">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          {/* Si  pasan un icono, lo metemos en su contenedor */}
          {icon && <div className="text-7xl">{icon}</div>}

          {/* Titulo y Mensaje */}
          <h3 className="font-bold text-2xl text-base-content">{title}</h3>
          {message && <p className="text-base-content/80 text-lg">{message}</p>}
        </div>

        {/* Botonera */}
        <div className="modal-action flex w-full mt-6 gap-2">
          {/* Si existe texto para el boton secundario, lo mostramos */}
          {secondaryBtnText && (
            <button
              className="btn btn-outline flex-1"
              onClick={onSecondaryClick}
            >
              {secondaryBtnText}
            </button>
          )}

          {/* Si existe texto para el botón principal, lo mostramos */}
          {primaryBtnText && (
            <button className="btn btn-primary flex-1" onClick={onPrimaryClick}>
              {primaryBtnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

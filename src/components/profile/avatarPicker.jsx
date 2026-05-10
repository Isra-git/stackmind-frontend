/* 

    SubCComponente para Seleccionar Avatares usando Grupos

*/

//  src/components/profile/avatarPicker.jsx

// dependencias
import React,{ useState } from "react";


import { avatarGroups } from "../../api/helpers";
export default function AvatarPicker({ avatarGroups, formData, setFormData, setSuccess }) {
  // Por defecto mostrar la categoría 2 IA
  const [selectedGroupId, setSelectedGroupId] = useState("2");

  // Obtener el grupo seleccionado -> fallback al primero 
  const selectedGroup = avatarGroups.find(g => g.id === selectedGroupId) || avatarGroups[0];

  return (
    <div className="space-y-4">
      {/* Navegacion */}
      <nav className="flex gap-2 items-center overflow-x-auto">
        {avatarGroups.map(group => {
          const isActive = group.id === selectedGroupId;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setSelectedGroupId(group.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-content ring-2 ring-primary/40"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
              aria-pressed={isActive}
              aria-label={`Ver colección ${group.name}`}
            >
              <span className="inline-block mr-2">{group.name}</span>
              <span className="text-xs opacity-70">({group.avatars.length})</span>
            </button>
          );
        })}
      </nav>

      {/* Mostramos los grupos */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{selectedGroup.name}</h4>
        <span className="text-xs opacity-60">{selectedGroup.avatars.length} avatares</span>
      </div>

      {/* Mostramos los avatares */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 mt-2 p-2 bg-base-200/50 rounded-xl border border-base-300">
        {selectedGroup.avatars.map((avatar) => {
          const isSelected = formData.avatar_url === avatar;
          const key = `${selectedGroup.id}-${avatar}`;

          return (
            <button
              key={key}
              type="button"
              aria-label={`Seleccionar avatar ${avatar}`}
              className={`w-full aspect-square rounded-full overflow-hidden transition-all duration-200 flex items-center justify-center ${
                isSelected
                  ? "ring-4 ring-primary ring-offset-2 ring-offset-base-100 scale-110 shadow-lg"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              onClick={() => {
                setFormData({ ...formData, avatar_url: avatar });
                setSuccess(false);
              }}
            >
              <img
                src={`/img/avatars/${avatar}`}
                alt={`Avatar ${avatar}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

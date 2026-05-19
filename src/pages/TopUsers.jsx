/* 

    Componente que Muestra los Usuarios con mas puntos

*/

// src/pages/components/TopUsers.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";

import { ENDPOINTS } from "../api/constantes";

export const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(ENDPOINTS.LEADERBOARD);
        if (!response.ok) throw new Error("Error al obtener el leaderboard");

        const data = await response.json();

        // Ordenamos de mayor a menor cogemos los 5 primeros
        const sortedTop = data
          .sort((a, b) => b.reputation - a.reputation)
          .slice(0, 5);

        setTopUsers(sortedTop);
      } catch (error) {
        console.error("Fallo al cargar Top Usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="card bg-base-200 border border-base-300 shadow-sm overflow-hidden flex flex-col mt-4">
      <div className="bg-base-300 border-b border-base-300 px-6 py-4 flex items-center gap-2 w-full">
        <h3 className="font-bold m-0 flex items-center gap-2">
          <HiUsers className="text-accent" /> Top Contribuidores
        </h3>
      </div>

      <div className="p-6 w-full">
        {loading ? (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <ul className="space-y-4">
            {topUsers.map((user) => (
              <li key={user.id} className="flex items-center gap-3">
                <Link
                  to={`/users/${user.id}`}
                  state={{ user: user }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 transition-colors w-full group"
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1 group-hover:ring-primary/50 transition-all">
                      <img
                        src={`img/avatars/${user.avatar_url}`}
                        alt={`Avatar de ${user.username}`}
                        onError={(e) => {
                          const fallbackPath = "/img/avatars/0/avatar3.png";
                          if (!e.target.src.includes(fallbackPath)) {
                            e.target.src = fallbackPath;
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span
                      className="font-bold text-sm truncate group-hover:text-primary transition-colors"
                      title={user.username}
                    >
                      {user.username}
                    </span>
                    <span className="text-xs font-medium text-base-content/60">
                      {user.reputation} puntos
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {topUsers.length === 0 && (
              <p className="text-sm text-center text-base-content/50 italic">
                No hay usuarios destacados aún.
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopUsers;

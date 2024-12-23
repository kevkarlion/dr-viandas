"use client";

import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
import axiosInstance from "@/lib/axios";

// Definir tipos para los menús
interface MenuItem {
  id: number;
  Nombre: string;
  Descripcion: string;
  Imagen: {
    url: string;
  }[];
}

export const SingleMenu: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]); // Definir el tipo de estado
  // const [imgMenu, setImgMenu] = useState('')





  useEffect(() => {
    axiosInstance
      .get("/api/menus") // Solo la ruta específica, sin la URL base
      .then((response) => {
       
        setMenus(response.data.data); // Guarda los datos obtenidos
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  }, []);

  if (menus.length === 0) {
    return <p className="text-black">No hay menús disponibles.</p>; // Renderizar algo mientras no hay datos
  }


  

  return (
    <div className="flex flex-col gap-8">
      {menus.map((menu) => (
        <div
          key={menu.id}
          className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Imagen del menú */}
          <div className="w-full md:w-1/3 h-[12rem] md:h-auto relative">
            {/* <Image
              src={`https://dr-viandas-bck-2.onrender.com${menu.Imagen[0].url}`}
              alt={menu.Nombre}
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
              priority
            /> */}
          </div>

          {/* Detalles del menú */}
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menu.Nombre}
              </h2>
              <p className="text-gray-700 text-base mt-4">{menu.Descripcion}</p>
            </div>
            <div className="mt-6 flex self-center">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Add +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

'use client'

import React, { useEffect, useState } from "react";
// import axios from "axios";
import Image from "next/image";
import axiosInstance from '@/lib/axios'
// import { MenuSquare } from "lucide-react";

// Definir tipos para los menús
interface MenuItem {
  id: number;
  Nombre: string;
  Descripcion: string;
  Imagen: {
    url:string;
  }[];
}

export const Menu: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]); // Definir el tipo de estado
  const [imgMenu, setImgMenu] = useState('')

  useEffect(() => {
    axiosInstance
      .get("/menus?populate=Imagen") // Solo la ruta específica, sin la URL base
      .then((response) => {
        setMenus(response.data.data); // Guarda los datos obtenidos
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  }, []);


  console.log('menus',menus)
  
  useEffect(() => {
    if (menus?.[0]?.Imagen?.[0]?.url) {
      setImgMenu(menus[0].Imagen[0].url);
    }
  }, [menus]);
  
  // let menuImage = menus[0].Imagen[0].url
  return (

    <div className="w-full  h-auto">
      <h1>Menú</h1>
      <ul >
        {menus.length > 0 ? (
          menus.map((menu) => (
            <li key={menu.id}>

              <h2 className="w-full h-auto">{menu.Nombre}</h2>
              <p>{menu.Descripcion}</p>
             <Image
              src={`http://localhost:1337${imgMenu}`}
              width={300}
              height={300}
              alt="Asado"
             />
            </li>
          ))
        ) : (
          <p className="text-black">No hay menús disponibles.</p>
        )}
      </ul>
    </div>
  );
};



"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
// import axios from "axios";
import axiosInstance from "@/services/axios";

// Definir tipos para los menús
interface MenuItem {
  id: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Imagen: {
    url: string;
  }[];
  disponible: boolean;
}

export const SingleMenu: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]); // Definir el tipo de estado
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;
  const router = useRouter();

  // Recupera los menús desde el localStorage si ya existen, si no, los obtiene desde la API
  useEffect(() => {
    const storedMenus = localStorage.getItem("menus");
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus)); // Cargar menús desde localStorage
    } else {
      axiosInstance
        .get("/api/menus")
        .then((response) => {
          const fetchedMenus = response.data.data;
          setMenus(fetchedMenus); // Guardar en el estado los menús
          localStorage.setItem("menus", JSON.stringify(fetchedMenus)); // Guardar en localStorage
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });
    }
  }, []);
  console.log(menus);

  const [isDisabled, setIsDisabled] = useState(false);
  console.log("btbDisabled", isDisabled);

  // Función para agregar un menú al carrito
  const agregarAlCarrito = (menu: MenuItem) => {
    if (!user) {
      router.push("/login"); // Redirigir al usuario al login si no está autenticado
      return;
    } else {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const productoExistente = carrito.find(
        (item: { id: number }) => item.id === menu.id
      );

      if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementar cantidad si ya está en el carrito
      } else {
        carrito.push({ ...menu, cantidad: 1 }); // Agregar el menú con cantidad 1 si no está en el carrito
      }

      localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar carrito actualizado en localStorage

      setIsDisabled(true);
      console.log("btbDisabled", isDisabled);
    }
  };

  const carritoTotal = localStorage.getItem("carrito");
  console.log("carrito del LocalStorage", carritoTotal);

  if (menus.length === 0) {
    return <p className="text-black">No hay menús disponibles.</p>;
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
            {/* Aquí puedes agregar la imagen del menú */}
          </div>

          {/* Detalles del menú */}
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menu.Nombre}
              </h2>
              <p className="text-gray-700 text-base mt-4">{menu.Descripcion}</p>
              <p className="text-gray-800 mt-2">
                Precio: ${menu.Precio.toFixed(2)}
              </p>
            </div>
            <div className="mt-6 flex self-center">
              <button
                onClick={() => agregarAlCarrito(menu)}
                disabled={isDisabled}
                className="bg-blue-500 text-white py-2 px-4 rounded active:scale-95"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import axiosInstance from "@/services/axios";

// Definir tipos para los platos
interface DishItem {
  id: string; // Ajustado para reflejar `_id` de la API
  name: string;
  description: string;
  price: number;
  photo: string; // Cambiado para coincidir con la respuesta
  available: boolean;
}

export const SingleMenu: React.FC = () => {
  const [dishes, setDishes] = useState<DishItem[]>([]); // Estado para almacenar los platos
  const [isLoading, setIsLoading] = useState(true); // Estado para el loading
  const [isDisabled, setIsDisabled] = useState(false); // Estado para el botón
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;

  useEffect(() => {
    const storedDishes = localStorage.getItem("dishes");
    if (storedDishes) {
      setDishes(JSON.parse(storedDishes));
      setIsLoading(false);
    } else {
      axiosInstance
        .get("http://localhost:5000/api/dishes")
        .then((response) => {
          console.log(response.data)
          const fetchedDishes = response.data.map((dish: any) => ({
            id: dish._id, // Mapear `_id` a `id`
            name: dish.name,
            description: dish.description,
            price: dish.price,
            photo: dish.photo, // Ajustar para usar `photo`
            available: dish.available,
          }));
           setDishes(fetchedDishes);
           localStorage.setItem("dishes", JSON.stringify(fetchedDishes));
        })
        .catch((error) => {
          console.error("Error fetching dishes:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const agregarAlCarrito = (dish: DishItem) => {
    if (!user) {
      router.push("/login");
      return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const productoExistente = carrito.find(
      (item: { id: string }) => item.id === dish.id
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...dish, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    setIsDisabled(true);
  };

  if (isLoading) {
    return <p className="text-black">Cargando menús...</p>;
  }

  if (dishes.length === 0) {
    return <p className="text-black">No hay platos disponibles.</p>;
  }

  return (
    <div></div>
     <div className="flex flex-col gap-8">
       {dishes.map((dish) => (
         <div
         key={dish.id}
          className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
         >
           <div className="w-full md:w-1/3 h-[12rem] md:h-auto relative">
             <Image
               src={dish.photo}
               alt={dish.name}
               layout="fill"
               objectFit="cover"
               priority
             />
           </div>
           <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
             <div>
               <h2 className="text-2xl font-bold text-gray-800">{dish.name}</h2>
               <p className="text-gray-700 text-base mt-4">
                 {dish.description}
               </p>
               <p className="text-gray-800 mt-2">Precio: ${dish.price.toFixed(2)}</p>
             </div>
             <div className="mt-6 flex self-center">
               <button
                 onClick={() => agregarAlCarrito(dish)}
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

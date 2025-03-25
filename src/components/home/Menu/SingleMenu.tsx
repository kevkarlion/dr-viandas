"use client";

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axios";
import Image from "next/image";
import Cookies from "js-cookie";

interface DishItem {
  id: string;
  name: string;
  description: string;
  disponible: string;
  price: number;
  photo: string;
  available: boolean;
  date: string;
}

export const SingleMenu: React.FC = () => {
  const [dishes, setDishes] = useState<DishItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabledItems, setDisabledItems] = useState<string[]>([]);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, setCart } = authContext;

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axiosInstance.get("/dishes"); // ✅ Usa ruta relativa
        const fetchedDishes = response.data.map((dish: any) => ({
          id: dish._id,
          name: dish.name,
          description: dish.description,
          disponible: dish.disponible,
          price: dish.price,
          photo: dish.photo,
          available: dish.available,
          date: dish.date,
        }));
        setDishes(fetchedDishes);
        Cookies.set("dishes", JSON.stringify(fetchedDishes), { expires: 7 });
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const agregarAlCarrito = async (dish: DishItem) => {
    if (user === null) {
      console.log("Usuario no registrado. Redirigiendo a login.");
      router.push("/login");
      return;
    }
    console.log('user', user);
    try {
      const response = await axiosInstance.post(
        "/cart/add", // ✅ Usa ruta relativa para evitar errores
        {
          userId: user.id,
          dishId: dish.id,
          quantity: 1,
        }
      );

      console.log("Respuesta al agregar al carrito:", response.data);

      setDisabledItems((prev) => [...prev, dish.id]);

      setCart((prevCart) => {
        const existingItem = prevCart.items.find(item => item.dishId === dish.id);
        let updatedItems;
        
        if (existingItem) {
          updatedItems = prevCart.items.map(item =>
            item.dishId === dish.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          const newCartItem = {
            dishId: dish.id,
            disponible: dish.disponible,
            name: dish.name,
            quantity: 1,
            price: dish.price,
            _id: response.data.itemId,
          };
          updatedItems = [...prevCart.items, newCartItem];
        }

        const updatedCart = { ...prevCart, items: updatedItems };
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
        return updatedCart;
      });

      console.log("Platillo agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  if (isLoading) {
    return <p className="text-black">Cargando menús...</p>;
  }

  if (dishes.length === 0) {
    return <p className="text-black">No hay platos disponibles.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {dishes.map((dish) => (
        <div key={dish.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-1/3 flex justify-center">
            <Image src={dish.photo} alt={dish.name} width={400} height={300} className="object-cover" />
          </div>
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 uppercase font-poppins">{dish.name}</h2>
              <h3 className="text-xl font-bold text-gray-800 border-b border-black pb-2">
                Disponible hasta el {dish.disponible}
              </h3>
              <p className="text-gray-700 text-lg mt-4">{dish.description}</p>
              <p className="text-black font-bold text-xl md:text-2xl mt-6">Precio: ${dish.price.toFixed(2)}</p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start">
              <button
                onClick={() => agregarAlCarrito(dish)}
                disabled={disabledItems.includes(dish.id)}
                className="bg-ctaAmarilloLuminoso text-black py-2 px-4 rounded active:scale-95"
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

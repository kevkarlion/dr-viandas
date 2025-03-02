'use client'
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axios";
import Image from "next/image";

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

  const { user, cart, setCart } = authContext;

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/api/dishes"
        );
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
        localStorage.setItem("dishes", JSON.stringify(fetchedDishes));
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

    console.log("Usuario logueado. Agregando al carrito:", user.id, dish.id);

    try {
      // Llamada a la API para agregar al carrito
      const response = await axiosInstance.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: user.id,
          dishId: dish.id,
          quantity: 1,
        }
      );

      // Aquí solo actualizamos el estado local
      setDisabledItems((prev) => [...prev, dish.id]);

      // Guardamos la respuesta de la API en una variable local
      const newCartItem = {
        dishId: dish.id,
        disponible: dish.disponible,
        name: dish.name,
        quantity: 1,
        price: dish.price,
        _id: response.data.itemId, // ID generado por la API
      };

      // Actualizamos el carrito global usando un efecto posterior
      setCart((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, newCartItem],
      }));

      localStorage.setItem("cart", JSON.stringify({...cart, items: [...cart.items, newCartItem]}));

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
    <div
      key={dish.id}
      className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
    >
      {/* Imagen */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src={dish.photo}
          alt={dish.name}
          width={400}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 uppercase font-poppins">
            {dish.name}
          </h2>
          <h3 className="text-xl font-bold text-gray-800 border-b border-black pb-2">
            Disponible hasta el {dish.disponible}
          </h3>
          <p className="text-gray-700 text-lg mt-4">{dish.description}</p>
          <p className="text-black font-bold text-xl md:text-2xl mt-6">
            Precio: ${dish.price.toFixed(2)}
          </p>
        </div>

        {/* Botón de agregar */}
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

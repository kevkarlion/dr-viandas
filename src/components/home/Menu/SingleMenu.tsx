'use client'
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axios";

interface DishItem {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: string;
  available: boolean;
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
          price: dish.price,
          photo: dish.photo,
          available: dish.available,
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
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{dish.name}</h2>
              <p className="text-gray-700 text-base mt-4">{dish.description}</p>
              <p className="text-gray-800 mt-2">
                Precio: ${dish.price.toFixed(2)}
              </p>
            </div>
            <div className="mt-6 flex self-center">
              <button
                onClick={() => agregarAlCarrito(dish)}
                disabled={disabledItems.includes(dish.id)}
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

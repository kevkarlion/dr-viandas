"use client";

import React, { useContext, useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { ProtectorRutas } from "@/components/shared/ProtectorRutas/ProtectorRutas";
import { AuthContext } from "@/Context/auth-context";

export default function Carrito() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { cart, setCart } = authContext;

  console.log('carrito desde ruta /carrito', cart)

  // Estado local del carrito
  const [localCart, setLocalCart] = useState(cart);

  // Sincronizar carrito local con el almacenamiento local al cargar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setLocalCart(parsedCart);
    }
  }, []);

  // Sincronizar carrito local con el contexto global
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // Guardar cambios en el carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  // Actualizar cantidad de un producto en el carrito local
  const handleUpdateQuantity = (dishId: string, change: number) => {
    const updatedItems = localCart.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    const updatedCart = { ...localCart, items: updatedItems };
    setLocalCart(updatedCart);
    setCart(updatedCart); // Sincronizar inmediatamente con el contexto global
  };

  // Eliminar un producto del carrito local
  const handleRemoveItem = (dishId: string) => {
    const updatedItems = localCart.items.filter((item) => item.dishId !== dishId);
    const updatedCart = { ...localCart, items: updatedItems };

    setLocalCart(updatedCart);
    setCart(updatedCart); // Sincronizar inmediatamente con el contexto global
  };

  // Calcular total del carrito local
  const total = localCart?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ProtectorRutas>
      <div className="mb-8 mt-36 w-full bg-white">
        <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>
        {localCart?.items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <h2 className="text-lg font-semibold text-gray-700">
              Carrito vacío, selecciona uno de nuestros platillos.
            </h2>
            <Image
              src="/placeholder-empty-cart.svg"
              alt="Carrito vacío"
              width={150}
              height={150}
              className="opacity-75"
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              {localCart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="font-semibold text-black">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.dishId, -1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.dishId, 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.dishId)}
                      className="p-1 rounded-full bg-red-200 hover:bg-red-300 ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-1/3">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Resumen del Pedido
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="text-black">Subtotal:</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-black">Envío:</span>
                  <span className="text-black">Gratis</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-black">Total:</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectorRutas>
  );
}

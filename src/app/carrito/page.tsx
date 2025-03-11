"use client";

import React, { useContext, useState, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Cookies from "js-cookie";
import { ProtectorRutas } from "@/components/shared/ProtectorRutas/ProtectorRutas";
import { AuthContext } from "@/Context/auth-context";
import { updateCartQuantity, removeCartItem } from "@/services/cartService";
import { CheckoutButton } from "@/components/shared/CheckoutButton/CheckoutButton";

export default function Carrito() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { cart, setCart } = authContext;
  const [localCart, setLocalCart] = useState(cart || { items: [] });

  useEffect(() => {
    const storedCart = Cookies.get("cart");
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(localCart), { expires: 7, path: "/" });
  }, [localCart]);

  const handleUpdateQuantity = (dishId: string, change: number) => {
    const updatedItems = localCart.items.map((item) =>
      item.dishId === dishId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    const updatedCart = { ...localCart, items: updatedItems };

    updateCartQuantity(localCart.userId, dishId, change);
    setLocalCart(updatedCart);
    setCart(updatedCart);
  };

  const handleRemoveItem = (dishId: string) => {
    removeCartItem(localCart.userId, dishId);

    const updatedItems = localCart.items.filter((item) => item.dishId !== dishId);
    const updatedCart = { ...localCart, items: updatedItems };

    setLocalCart(updatedCart);
    setCart(updatedCart);
  };

  const total = localCart?.items?.length
  ? localCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  : 0;


  return (
    <ProtectorRutas>
      <div className="mb-8 mt-16 pt-8 pb-8 w-full px-4 lg:px-12 bg-[#E8911C]">
        <h1 className="text-3xl font-bold mb-6 mt-6 text-center lg:text-left bg-[#E8911C]">Tu Carrito</h1>
        {localCart?.items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 bg-[#E8911C] mb-8">
            <h2 className="text-lg font-semibold text-gray-700 text-center">
              Tu carrito se encuentra vacío. Selecciona una vianda! 
            </h2>
           
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              {localCart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h2 className="font-semibold text-black">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.dishId, -1)}
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-8 text-center text-lg font-medium text-black">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.dishId, 1)}
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
                    >
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.dishId)}
                      className="p-2 rounded-full bg-red-200 hover:bg-red-300 active:bg-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-8 mb-8 lg:max-w-[24.9rem] lg:max-h-[14.7rem]">
              <h2 className="text-xl font-semibold mb-4 text-black">Resumen del Pedido</h2>
              <div className="flex justify-between mb-2">
                <span className="text-black">Subtotal:</span>
                <span className="text-black">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-black">Envío:</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-black">Total:</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4">
                <CheckoutButton items={localCart.items} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectorRutas>
  );
}

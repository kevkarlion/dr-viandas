'use client'
import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { ProtectorRutas } from "@/components/shared/ProtectorRutas/ProtectorRutas";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const productosEjemplo: ProductoCarrito[] = [
  {
    id: 1,
    nombre: "Pollo al curry",
    precio: 12.99,
    cantidad: 2,
    imagen: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    nombre: "Ensalada César",
    precio: 8.99,
    cantidad: 1,
    imagen: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    nombre: "Pasta Alfredo",
    precio: 10.99,
    cantidad: 3,
    imagen: "/placeholder.svg?height=80&width=80",
  },
];

export default function Carrito() {
  const [productos, setProductos] = React.useState<ProductoCarrito[]>(productosEjemplo);

  const actualizarCantidad = (id: number, incremento: number) => {
    setProductos(
      productos
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: Math.max(0, producto.cantidad + incremento),
              }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  };

  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const total = productos.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  return (
    <ProtectorRutas>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{producto.nombre}</h2>
                    <p className="text-gray-600">
                      ${producto.precio.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => actualizarCantidad(producto.id, -1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{producto.cantidad}</span>
                  <button
                    onClick={() => actualizarCantidad(producto.id, 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto.id)}
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
              <h2 className="text-xl font-semibold mb-4 text-black">Resumen del Pedido</h2>
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
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectorRutas>
  );
}

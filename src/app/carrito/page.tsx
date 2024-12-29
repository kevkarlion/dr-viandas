'use client'
import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { ProtectorRutas } from "@/components/shared/ProtectorRutas/ProtectorRutas";

interface ProductoCarrito {
  id: number;
  Plato: string;
  Precio: number;
  Descripcion: string;
  cantidad: number;
  imagen: string;
}



export default function Carrito() {
  //si hay productos en el carrito, los cargamos desde el localStorage
  const cargarProductosDesdeStorage = (): ProductoCarrito[] => {
    const productosGuardados = localStorage.getItem("carrito");
    if (productosGuardados) {
      //explicitamos que el tipo de retorno es un array de ProductoCarrito
      return JSON.parse(productosGuardados) as ProductoCarrito[];
    }
    return []; // Devuelve un array vacío si no hay productos guardados
  };

  const [productos, setProductos] = React.useState<ProductoCarrito[]>(cargarProductosDesdeStorage);

  const actualizarEnLocalStorage = (productos: ProductoCarrito[]) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
  };

  const actualizarCantidad = (id: number, incremento: number) => {
    const nuevosProductos = productos
      .map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: Math.max(0, producto.cantidad + incremento),
            }
          : producto
      )
      .filter((producto) => producto.cantidad > 0);

    setProductos(nuevosProductos);
    actualizarEnLocalStorage(nuevosProductos);
  };

  const eliminarProducto = (id: number) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    actualizarEnLocalStorage(nuevosProductos);
  };

  const total = productos.reduce(
    (sum, producto) => sum + (producto.Precio * producto.cantidad || 0),
    0
  );

  // Validamos si el precio es un número válido antes de aplicar toFixed
  const totalFormateado = !isNaN(total) ? total.toFixed(2) : '0.00';

  return (
    <ProtectorRutas>
      <div className="  mb-8 mt-36 bg-slate-400 w-full">
        <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>
        {productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <h2 className="text-lg font-semibold text-gray-700">
              Carrito vacío, selecciona una de nuestras viandas!
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
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={producto.imagen}
                      alt={producto.Plato}
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-black">{producto.Plato}</h2>
                      <p className="text-gray-600">
                        {/* Asegurarnos de que precio es un número válido */}
                        ${isNaN(producto.Precio) ? '0.00' : producto.Precio.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => actualizarCantidad(producto.id, -1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-8 text-center">{producto.cantidad}</span>
                    <button
                      onClick={() => actualizarCantidad(producto.id, 1)}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4 text-black" />
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
                  <span className="text-black">${totalFormateado}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-black">Envío:</span>
                  <span className="text-black">Gratis</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-black">Total:</span>
                    <span className="text-black">${totalFormateado}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
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

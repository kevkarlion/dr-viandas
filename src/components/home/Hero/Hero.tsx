

// import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { JSX } from "react";

export  function Hero(): JSX.Element{
  return (
    <section
      className="relative bg-cover bg-center py-20 text-white"
      style={{
        backgroundImage: "url('/images/hero-background.jpg')", // Cambia la ruta según la ubicación de tu imagen
      }}
    >
      {/* Fondo Oscuro Transparente */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenido Principal */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Viandas que Nutren y Sorprenden
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Descubre la comodidad de recibir platos saludables y deliciosos,
          preparados especialmente para ti.
        </p>
        <Button
          size="lg"
          
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg"
        >
          <a href="#contact">Contáctanos Ahora</a>
        </Button>
      </div>
    </section>
  );
}

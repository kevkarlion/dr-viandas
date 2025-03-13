

// import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { JSX } from "react";

export  function Hero(): JSX.Element{


  
  return (
    <section
      className="relative bg-cover bg-center py-20 bg-white "
      style={{
        backgroundImage: "url('/images/hero-background.jpg')", // Cambia la ruta según la ubicación de tu imagen
      }}
    >
      {/* Fondo Oscuro Transparente */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      {/* Contenido Principal */}
      <div className="relative container mx-auto px-4 text-center pt-28 pb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair text-black">
        Viandas caseras, listas para disfrutar
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-lora text-black px-8 lg:!px-38">
        Comida rica, casera y saludable, lista para vos todos los jueves. Pedí con anticipación y disfrutá sin complicaciones.
        </p>
        <Button
          size="lg"
          
          className="bg-ctaAmarilloLuminoso hover:bg-amarilloResaltado text-black font-poppins py-3 px-6 rounded-lg text-[1rem]"
        >
          <a href="#menu">Pedí la tuya</a>
        </Button>
      </div>
    </section>
  );
}

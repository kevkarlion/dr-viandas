"use client";

import Image from "next/image";
import { JSX } from "react";
import { Button } from "@/components/shared/Button";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function AboutMe(): JSX.Element {
  const carouselSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="about-me" className="py-20 bg-gray-100 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="relative w-full h-96 md:h-full">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Chef"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-8 px-2">
            <h2 className="text-4xl font-bold mb-4 text-black font-playfair">
              Darío Agustín Rodríguez
            </h2>
            <p className="text-[1rem] mb-6 text-black font-poppins">
              Con más de 15 años de experiencia en la industria culinaria, la
              Chef María González ha dedicado su carrera a crear experiencias
              gastronómicas únicas y saludables. Graduada de Le Cordon Bleu,
              María combina técnicas clásicas con innovación moderna para
              ofrecer viandas que no solo son deliciosas, sino también
              nutritivas.
            </p>
            <p className="text-[1rem] mb-6 text-black">
              Su pasión por los ingredientes frescos y locales se refleja en
              cada plato que prepara. María cree firmemente en la filosofía de
              que una buena comida no solo alimenta el cuerpo, sino también el
              alma.
            </p>
            <div className="mt-8">
              <h3 className="text-4xl font-bold mb-4 px-2 text-black font-playfair">
                Galería de Platillos y Trabajo
              </h3>
              <Slider {...carouselSettings}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="px-2">
                    <Image
                      src={`/placeholder.svg?height=200&width=300&text=Imagen ${index}`}
                      alt={`Platillo o trabajo ${index}`}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center mt-14">
            <Button
            size="lg"
            className="bg-ctaAmarilloLuminoso hover:bg-amarilloResaltado text-black font-semibold py-3 px-6 rounded-lg"
            >
            <a href="#contact" className="font-poppins text-[1rem]">Contáctanos ahora</a>
            </Button>
        </div>
      </div>
    </section>
  );
}

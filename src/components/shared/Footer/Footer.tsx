import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gblack text-white py-10" id="contacto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start md:text-left place-items-center">
        
        {/* Información */}
        <div className="max-w-sm">
          <h3 className="text-2xl font-bold mb-3 items-start">DR Viandas</h3>
          <p>Disfrutá de las mejores viandas, frescas y saludables, entregadas directamente en tu puerta.</p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-500">Inicio</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-yellow-500">Menú</Link>
            </li>
            <li>
              <Link href="/sobre-nosotros" className="hover:text-yellow-500">Sobre Nosotros</Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-yellow-500">Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Nuestras Redes</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="https://www.facebook.com" target="_blank">
              <FaFacebook className="text-2xl hover:text-yellow-500" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <FaInstagram className="text-2xl hover:text-yellow-500" />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <FaTwitter className="text-2xl hover:text-yellow-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} DR Viandas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

import React from "react";
import Link from "next/link";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between">
          <div className="w-1/3">
            <h3 className="text-2xl font-bold">Viandas Deliciosas</h3>
            <p className="mt-2">
              Disfruta de las mejores viandas, frescas y saludables, entregadas directamente en tu puerta.
            </p>
          </div>

          <div className="w-1/3">
            <h4 className="text-xl font-semibold mb-4">Enlaces Rápidos</h4>
            <ul>
              <li>
                <Link href="/" className="hover:text-yellow-500">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-yellow-500">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-yellow-500">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-yellow-500">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-1/3">
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
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

        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Viandas Deliciosas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};



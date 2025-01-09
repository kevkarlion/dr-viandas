"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import { JSX, useState, useContext,  } from "react";
import { AuthContext } from "@/Context/auth-context";

export function Header(): JSX.Element {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { jwt, logout, user } = authContext;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  
 
  

// Muestra un estado de carga o nada mientras se cargan los datos
  // if (loading) {
  //   return <div>Loading...</div>; 
  // }
 
  return (
    <header className="bg-green-600 text-white fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Viandas Deliciosas
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link href="#menu" className="hover:underline">
            Menú
          </Link>
          <Link href="#features" className="hover:underline">
            Características
          </Link>
          <Link href="#testimonials" className="hover:underline">
            Testimonios
          </Link>
          <Link href="#contact" className="hover:underline">
            Contacto
          </Link>
        </nav>

        {/* User Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href='/carrito'>
            <button className="hover:text-gray-200">
              <ShoppingCart size={24} />
            </button>
          </Link>
          <Link href='/profile'>
            <button className="hover:text-gray-200">
              <User size={24} />
            </button>
          </Link>
          {jwt ? (
            <>
              <span className="text-white">{user.name}</span>
              <button
                onClick={logout}
                className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Iniciar Sesión / Registrarse
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-green-700 md:hidden">
          <nav className="space-y-2 p-4">
            <Link href="#menu" className="block hover:underline">
              Menú
            </Link>
            <Link href="#features" className="block hover:underline">
              Características
            </Link>
            <Link href="#testimonials" className="block hover:underline">
              Testimonios
            </Link>
            <Link href="#contact" className="block hover:underline">
              Contacto
            </Link>
            <div className="flex items-center space-x-4 mt-4">
              <button className="hover:text-gray-200">
                <ShoppingCart size={24} />
              </button>
              <button className="hover:text-gray-200">
                <User size={24} />
              </button>
              {user ? (
                <>
                  <span className="text-white">{user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Iniciar Sesión / Registrarse
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

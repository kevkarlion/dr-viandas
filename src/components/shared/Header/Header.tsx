"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/Context/auth-context";

export function Header() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { jwt, logout, user, cart } = authContext;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3); // Simulación de productos en el carrito
  
  //conteo de platillos en icon de carrito
  useEffect(()=>{
    setCartItemCount(cart.items.reduce((acc, item) => acc + item.quantity, 0))
  }, [cart])
  console.log('cartItemCount',cartItemCount)


  return (
    <header className="bg-verdePrincipal text-white fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="lg:text-3xl text-2xl font-playfair font-bold">
          DR Viandas
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-lora font-bold text-xl">
          <Link href="#menu" className="hover:underline">Menú</Link>
          <Link href="#about-me" className="hover:underline">Sobre mí</Link>
          <Link href="#testimonials" className="hover:underline">Testimonios</Link>
          <Link href="#contacto" className="hover:underline">Contacto</Link>
        </nav>

        {/* User Controls (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/carrito" className="relative">
            <ShoppingCart size={24} className="hover:text-gray-200" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/profile"><User size={24} className="hover:text-gray-200" /></Link>
          {jwt ? (
            <>
              <span className="text-white">{user?.name}</span>
              <button
                onClick={logout}
                className="bg-ctaAmarilloLuminoso text-black font-poppins px-4 py-2 rounded hover:bg-amarilloResaltado"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-naranjaComplementario text-black px-4 py-2 rounded hover:naranjaComplementario">
              Iniciar Sesión / Registrarse
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 transition-transform">
          <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>

          <nav className="space-y-6 text-center text-2xl font-lora font-bold">
            <Link href="#menu" className="block text-white hover:text-ctaAmarilloLuminoso" onClick={() => setIsMenuOpen(false)}>Menú</Link>
            <Link href="#about-me" className="block text-white hover:text-ctaAmarilloLuminoso" onClick={() => setIsMenuOpen(false)}>Sobre mí</Link>
            <Link href="#testimonials" className="block text-white hover:text-ctaAmarilloLuminoso" onClick={() => setIsMenuOpen(false)}>Testimonios</Link>
            <Link href="#contacto" className="block text-white hover:text-ctaAmarilloLuminoso" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
          </nav>

          <div className="flex items-center space-x-6 mt-6">
            <Link href="/carrito" className="relative">
              <ShoppingCart size={28} className="text-white hover:text-ctaAmarilloLuminoso" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/profile"><User size={28} className="text-white hover:text-ctaAmarilloLuminoso" /></Link>
          </div>

          {jwt ? (
            <button
              onClick={logout}
              className="mt-6 bg-ctaAmarilloLuminoso text-black px-6 py-3 rounded hover:bg-amarilloResaltado"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              href="/login"
              className="mt-6 bg-white text-green-600 px-6 py-3 rounded hover:bg-gray-100"
            >
              Iniciar Sesión / Registrarse
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

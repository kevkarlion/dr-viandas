'use client';

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/auth-context";
import axios, { AxiosError } from "axios";


interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setCart = authContext?.setCart;
  const login = authContext?.login;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        { email, password },
        { withCredentials: true } // Permite el envío de cookies
      );

      if (response.status === 200) {
        console.log("Inicio de sesión exitoso");
        
      

        const userData = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
         
        };
        console.log("userData", userData);
        const roleData = response.data.user.role;
        console.log("roleData", roleData);

        if (login) {
          login(userData, roleData);
        }

        if (setCart) {
          setCart(response.data.cart);
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
        }

        router.push("/dashboard");
      } else {
        console.error("Error al iniciar sesión: Código de estado inesperado", response.status);
        alert("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Error al iniciar sesión:", axiosError);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Bienvenido a Viandas Express
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Inicia sesión para realizar tu pedido de viandas
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-black">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta? {" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/auth-context";
import axios, { AxiosError } from "axios";  // Importa axios

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
  const login = authContext?.login;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Usando axios para hacer la petición POST
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        {
          email, 
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Aseguramos que el tipo de contenido sea JSON
          },
        }
      );

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        const token = response.data.token;
        const userData = response.data.user.name;
        const roleData = response.data.user.role
        
        // Si el contexto de autenticación está disponible, actualízalo
        if (login) {
          login(token, userData, roleData); // Actualiza el contexto con los datos del usuario
        }
        console.log("Inicio de sesión exitoso");
        console.log('rol', roleData);
        // Redirigir al usuario a la página principal
        router.push("/dashboard");
      } else {
        console.error("Error al iniciar sesión: Código de estado inesperado", response.status);
        alert('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium  mb-1 text-black"
            >
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
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
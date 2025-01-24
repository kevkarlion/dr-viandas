'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthContext } from "@/Context/auth-context"
import axios from 'axios'  // Importar Axios


export default function RegistroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const {  setCart, register } = authContext;

  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación de contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      // Usando Axios para hacer la solicitud POST
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      })

      // Verificar si la respuesta es exitosa
      if (response.status === 201) {
        // Obtener el token de la respuesta (ajusta según la estructura de tu respuesta)
        const token = response.data.token

        const userData = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
        };
        
        //carrito cargado en el local storage y en el contexto de autenticación al registrarse
        if (setCart) {
          setCart(response.data.cart);
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
          console.log(response.data.cart)
        }
        console.log('carrito', response.data.cart);
        console.log('userData', userData)
        // Si el contexto de autenticación está disponible, actualízalo
        if (register) {
          console.log('register ok')
          register(token, userData); // Actualiza el contexto con los datos del usuario
        } 
        console.log('soy usuario',response.data.user)
        router.push('/dashboard') // Redirigir al dashboard o a la página deseada
      }
    } catch (error: any) {
      console.error('Error al registrar el usuario:', error)
      if (error.response) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Crea tu cuenta en Viandas Express</h2>
        <p className="text-center text-gray-600 mb-6">Regístrate para empezar a pedir tus viandas favoritas</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              id="username"
              type="text"
              placeholder="Juan Pérez"
              value={name}  
              onChange={(e) => setName(e.target.value)}  
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

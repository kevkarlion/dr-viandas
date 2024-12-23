import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Bienvenido a tu Dashboard</h2>
        <p className="text-center text-gray-600 mb-6">Aquí puedes ver tu información personalizada.</p>
        {/* Agrega más contenido relevante para el usuario aquí */}
      </div>
    </div>
  )
}

export default Dashboard
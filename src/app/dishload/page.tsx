'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { ProtectorRutasRole } from '@/components/shared/ProtectorRutas/ProtectorRutasRole'


type DishFormProps = {
  token: string; // Asegúrate de obtener el token desde el almacenamiento del navegador
};

const Dishload = () => {
 


  const token = localStorage.getItem('token')
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [available, setAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dishData = {
      name,
      price,
      description,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      photo,
      available,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/dish', dishData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Platillo creado con éxito');
      // Limpiar los campos del formulario
      setName('');
      setPrice(0);
      setDescription('');
      setIngredients('');
      setPhoto('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al crear el platillo');
    } finally {
      setLoading(false);
    }
  };

  return (
      <ProtectorRutasRole >
            
            <div className="max-w-lg my-32 mx-7 p-6 bg-white shadow-lg rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Cargar Platillo</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Platillo</label>
                  <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                  />
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                  />
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                  />
                  </div>

                  <div>
                  <label className="block text-sm font-medium  text-black">Ingredientes</label>
                  <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700">Foto (URL)</label>
                  <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  </div>

                  <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700">Disponible</label>
                  <input
                        type="checkbox"
                        checked={available}
                        onChange={() => setAvailable(!available)}
                        className="ml-2"
                  />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                  >
                  {loading ? 'Cargando...' : 'Crear Platillo'}
                  </button>
                  </form>
            </div>
      </ProtectorRutasRole>
  );
};


export default Dishload;
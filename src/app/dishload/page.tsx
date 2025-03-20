"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ProtectorRutasRole } from "@/components/shared/ProtectorRutas/ProtectorRutasRole";

const Dishload = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = Cookies.get("token"); // Obtener el token desde las cookies
    setToken(savedToken || null);
  }, []);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [disponible, setDisponible] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [available, setAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("disponible", disponible);
    formData.append("available", available.toString());
    formData.append("ingredients", JSON.stringify(ingredients.split(",").map((ingredient) => ingredient.trim())));
    if (photo) formData.append("imagen", photo);

    try {
      await axios.post("http://localhost:5000/api/dish/loadDish", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Usamos el token de cookies
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Platillo creado con éxito");
      setName("");
      setPrice(0);
      setDisponible("");
      setDescription("");
      setIngredients("");
      setPhoto(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al crear el platillo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectorRutasRole>
      <div className="max-w-lg my-32 mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Cargar Platillo</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Platillo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Disponible hasta:</label>
            <textarea
              value={disponible}
              onChange={(e) => setDisponible(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Ingredientes</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="text-sm font-medium text-gray-700 mr-2">Disponible</label>
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              className="ml-2 h-4 w-4"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Cargando..." : "Crear Platillo"}
          </button>
        </form>
      </div>
    </ProtectorRutasRole>
  );
};

export default Dishload;

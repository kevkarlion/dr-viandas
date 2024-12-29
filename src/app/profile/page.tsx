"use client";

import { useState, useContext } from "react";
import { User, Pencil, X, Check } from "lucide-react";
import { ProtectorRutas } from "@/components/shared/ProtectorRutas/ProtectorRutas";
import { AuthContext } from "@/Context/auth-context";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dietaryPreferences: string;
}

const defaultUserData: UserData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  dietaryPreferences: "",
};

export default function UserProfile({
  initialUserData = defaultUserData,
}: {
  initialUserData?: UserData;
}) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user  } = authContext;
  console.log('usuario',user)
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios en el backend
    console.log("Datos actualizados:", userData);
    setIsEditing(false);
  };

  return (
    //En caso de no estar logeado
    <ProtectorRutas>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg my-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Perfil de Usuario
          </h2>
          <button
            className={`p-2 rounded-full ${
              isEditing
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <X className="h-5 w-5" />
            ) : (
              <Pencil className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-grow space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={user ? user.username : ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black pl-2" 
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user ? user.email : ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black pl-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={ user ? userData.phone : ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={user ? userData.address : ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="dietaryPreferences"
                className="block text-sm font-medium text-gray-700"
              >
                Preferencias Alimentarias
              </label>
              <input
                id="dietaryPreferences"
                name="dietaryPreferences"
                type="text"
                value={user ? userData.dietaryPreferences: ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            {isEditing && (
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Check className="inline-block mr-2 h-5 w-5" /> Guardar Cambios
              </button>
            )}
          </form>
        </div>
      </div>
    </ProtectorRutas>
  );
}

'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';



// Definir los tipos para el contexto
interface AuthContextType {
  user: any;
  jwt: string | null;
  login: (jwt: string, user: any) => void;
  logout: () => void;
  loading: boolean;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

//Proveerdor de contexto que envuelve la app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //carga el user desde el local storage
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState<any>(storedUser);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  // Recuperar el usuario y JWT del localStorage cuando la app se carga
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedJwt = localStorage.getItem('jwt');
    console.log(storedUser)
    console.log(storedJwt)

    if (storedUser && storedJwt) {
      setUser(JSON.parse(storedUser));
      setJwt(storedJwt);
    }
    setLoading(false); // Indica que los datos ya están cargados
  }, []);

  // Función para login
  const login = (jwt: string, user: any) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setJwt(jwt);
    setLoading(false); // Datos cargados
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
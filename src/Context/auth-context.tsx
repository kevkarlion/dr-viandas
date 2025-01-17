'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  dishId: string;
  name: string;
  quantity: number;
  price: number;
  
}

interface CartDb {
  _id: string;
  userId:string;
  items: CartItem[];
  name: string,
  
}





// Definir los tipos para el contexto
interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ id: string; name: string; email: string } | null>>;
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
  login: (jwt: string, user: { id: string; name: string; email: string }, role: string) => void;
  logout: () => void;
  loading: boolean;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  cart: CartDb ;
  setCart: React.Dispatch<React.SetStateAction<CartDb>>;
}


// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

//Proveerdor de contexto que envuelve la app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>('');
  const [cart, setCart] = useState<CartDb>({ _id: '', userId: '', items: [], name: '' });
  
  // Recuperar el usuario y JWT del localStorage cuando la app se carga
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedJwt = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    

    console.log(storedUser)
    console.log(storedJwt)

    if (storedUser && storedJwt && storedRole ) {
      setUser(JSON.parse(storedUser));
      setJwt(storedJwt);
      setRole(JSON.parse(storedRole))
      
    }
    setLoading(false); // Indica que los datos ya están cargados
  }, []);

  // Función para login
  const login = (jwt: string, user: { id: string; name: string; email: string}, role: string ) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', JSON.stringify(role))
    
    setRole(role);
    setUser(user);
    setJwt(jwt);
    setLoading(false); // Datos cargados
    

  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser , jwt, setJwt, login , logout, loading, role, setRole, cart, setCart}}>
      {children}
    </AuthContext.Provider>
  );
};
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie"; // Importamos js-cookie

interface CartItem {
  dishId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartDb {
  _id: string;
  userId: string;
  items: CartItem[];
  name: string;
}

// Definir los tipos para el contexto
interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      email: string;
    } | null>
  >;
  login: (
    user: {
      id: string;
      name: string;
      email: string;
    },
    role: string,
    token: string // Agregamos el token como argumento
  ) => void;
  register: (
    user: {
      id: string;
      name: string;
      email: string;
    },
    role: string,
    token: string
  ) => void;
  logout: () => void;
  loading: boolean;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  cart: CartDb;
  setCart: React.Dispatch<React.SetStateAction<CartDb>>;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Crear el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor de contexto que envuelve la app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>("");
  const [cart, setCart] = useState<CartDb>({
    _id: "",
    userId: "",
    items: [],
    name: "",
  });

  // Recuperar los datos de las cookies al cargar la app
  useEffect(() => {
    const storedUser = Cookies.get("user");
    const storedRole = Cookies.get("role");
    const storedToken = Cookies.get("token");
    const storedCart = Cookies.get("cart");

    if (storedUser && storedRole && storedToken && storedCart) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setCart(JSON.parse(storedCart));
    }
    setLoading(false); // Indica que los datos ya están cargados
  }, []);

  // Función para login (guarda los datos en cookies)
  const login = (
    user: {
      id: string;
      name: string;
      email: string;
    },
    role: string,
    token: string
  ) => {
    Cookies.set("user", JSON.stringify(user), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("role", role, { expires: 1, secure: true, sameSite: "Strict" });
    Cookies.set("token", token, { expires: 1, secure: true, sameSite: "Strict" });

    setUser(user);
    setRole(role);
    setLoading(false);
  };

  // Función para registrar usuario (similar al login)
  const register = (
    user: {
      id: string;
      name: string;
      email: string;
    },
    role: string,
    token: string
  ) => {
    Cookies.set("user", JSON.stringify(user), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("role", role ?? "", {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("token", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    setUser(user);
    setRole(role);
    setLoading(false);
  };

  // Función para logout (elimina las cookies)
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("cart");
    
    setUser(null);
    setRole(null);
    setCart({ _id: "", userId: "", items: [], name: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        role,
        setRole,
        cart,
        setCart,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

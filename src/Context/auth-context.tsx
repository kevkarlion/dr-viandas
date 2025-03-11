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
    address: string;
    phone: string;
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      address: string;
      phone: string;
      id: string;
      name: string;
      email: string;
    } | null>
  >;
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
  login: (
    jwt: string,
    user: {
      address: string;
      phone: string;
      id: string;
      name: string;
      email: string;
    },
    role: string
  ) => void;
  register: (
    jwt: string,
    user: {
      address: string;
      phone: string;
      id: string;
      name: string;
      email: string;
    },
    role: string,
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
    address: string;
    phone: string;
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
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
    const storedJwt = Cookies.get("token");
    const storedRole = Cookies.get("role");
    const storedCart = Cookies.get("cart");

    if (storedUser && storedJwt && storedRole && storedCart) {
      setUser(JSON.parse(storedUser));
      setJwt(storedJwt);
      setRole(storedRole);
      setCart(JSON.parse(storedCart));
    }
    setLoading(false); // Indica que los datos ya están cargados
  }, []);

  // Función para login (guarda los datos en cookies)
  const login = (
    jwt: string,
    user: {
      address: string;
      phone: string;
      id: string;
      name: string;
      email: string;
    },
    role: string
  ) => {
    Cookies.set("token", jwt, { expires: 1, secure: true, sameSite: "Strict" });
    Cookies.set("user", JSON.stringify(user), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("role", role, { expires: 1, secure: true, sameSite: "Strict" });
    const jwtLogin = Cookies.get("token");
    setUser(user);
    setJwt(jwtLogin ?? null);
    console.log("jwt desde contexto", jwt);
    console.log("user desde contexto", user);

    setRole(role);
    setLoading(false);
  };

  // Función para registrar usuario (similar al login)
  const register = (
    jwt: string,
    user: {
      address: string;
      phone: string;
      id: string;
      name: string;
      email: string;
    },
    role: string
  ) => {
    Cookies.set("token", jwt, { expires: 1, secure: true, sameSite: "Strict" });
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

    setUser(user);
    setJwt(jwt);
    setRole(role);
    setLoading(false);
  };

  // Función para logout (elimina las cookies)
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");

    setUser(null);
    setJwt(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
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

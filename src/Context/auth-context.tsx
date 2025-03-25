"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (user: User, role: string) => void;
  register: (user: User, role: string) => void;
  logout: () => void;
  loading: boolean;
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  cart: CartDb;
  setCart: React.Dispatch<React.SetStateAction<CartDb>>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [cart, setCart] = useState<CartDb>({
    _id: "",
    userId: "",
    items: [],
    name: "",
  });
  const router = useRouter();

  // Función estable con useCallback para evitar recreación en cada render
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const storedUser = Cookies.get("user");
      const storedRole = Cookies.get("role");
      const storedCart = Cookies.get("cart");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(storedRole || null);
        
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } else {
        setUser(null);
        setRole(null);
        setCart({ _id: "", userId: "", items: [], name: "" });
      }
    } catch (error) {
      console.error("Error verifying auth:", error);
      Cookies.remove("user");
      Cookies.remove("role");
      Cookies.remove("cart");
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
      if (initialLoad) setInitialLoad(false);
    }
  }, [initialLoad]);

  // Verificar autenticación solo en el montaje inicial
  useEffect(() => {
    if (initialLoad) {
      checkAuth();
    }
  }, [checkAuth, initialLoad]);

  // Sincronizar cart con cookies cuando cambie
  useEffect(() => {
    if (!initialLoad && (cart.items.length > 0 || (cart._id && cart.userId))) {
      Cookies.set("cart", JSON.stringify(cart), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
    }
  }, [cart, initialLoad]);

  const login = useCallback((user: User, role: string) => {
    Cookies.set("user", JSON.stringify(user), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("role", role, { 
      expires: 1, 
      secure: true, 
      sameSite: "Strict" 
    });

    setUser(user);
    setRole(role);
    setLoading(false);
  }, []);

  const register = useCallback((user: User, role: string) => {
    login(user, role);
  }, [login]);

  const logout = useCallback(() => {
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("cart");

    setUser(null);
    setRole(null);
    setCart({ _id: "", userId: "", items: [], name: "" });
    router.push("/");
  }, [router]);

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
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
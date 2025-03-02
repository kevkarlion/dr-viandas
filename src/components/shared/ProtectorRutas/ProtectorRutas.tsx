"use client";
import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

export const ProtectorRutas = ({ children }: { children: React.ReactNode }) => {
  //consulta por el contexto de autenticación
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, [user, router]);

  if (!user) return null; // Opcional: puedes mostrar un loader aquí

  return <>{children}</>;
};

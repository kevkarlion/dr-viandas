import { AuthContext } from "@/Context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useContext, ReactNode } from "react";

interface ProtectorRutasProps {
  children: ReactNode;
}

export const ProtectorRutasRole = ({ children }: ProtectorRutasProps) => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { role } = authContext;
  const router = useRouter();

  // Agregar console.log para verificar el valor de `role`
  useEffect(() => {
    console.log('Role en ProtectorRutasRole:', role); // Verifica el valor de role
    if (role && role !== "chef") {
      // Si no es chef, redirige a la página de login
      router.push("/login");
    }
  }, [role, router]);

  // Esperar a que el valor de `role` esté disponible
  if (!role) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga si role es undefined
  }

  // Solo renderizamos los children si el rol es 'chef'
  if (role === "chef") {
    return <>{children}</>;
  }

  // No deberías retornar nada aquí, ya que se maneja la redirección
  return null;
};

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface ProtectorRutasProps {
  children: ReactNode;
}

export const ProtectorRutasRole = ({ children }: ProtectorRutasProps) => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener el role desde las cookies
    const storedRole = Cookies.get("role");
    setRole(storedRole || null);

    console.log("Role en ProtectorRutasRole:", storedRole);

    if (storedRole && storedRole !== "chef") {
      router.push("/login");
    }
  }, [router]);

  if (role === null) {
    return <p>Cargando...</p>;
  }

  if (role === "chef") {
    return <>{children}</>;
  }

  return null;
};

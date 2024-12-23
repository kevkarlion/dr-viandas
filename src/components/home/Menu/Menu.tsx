import React from "react";
import { SingleMenu } from "./SingleMenu";

// Aquí definimos los tipos para el componente Menu (si lo necesitas)
export const Menu: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Platos del mes
        </h1>
        <div className="flex flex-col w-full gap-8">
          {/* Aquí renderizamos el SingleMenu */}
          <SingleMenu />
        </div>
      </div>
    </section>
  );
};

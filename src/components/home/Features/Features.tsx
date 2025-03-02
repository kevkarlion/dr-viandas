import { Leaf, Truck, Heart } from 'lucide-react';

import { JSX } from 'react';

type FeatureCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export  function Features(): JSX.Element {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12 font-playfair px-2">Calidad y sabor que marcan la diferencia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Leaf className="w-12 h-12 text-naranjaComplementario" />}
            title="Ingredientes Frescos"
            description="Utilizamos solo los ingredientes más frescos y de alta calidad en nuestras viandas."
          />
          <FeatureCard 
            icon={<Truck className="w-12 h-12 text-naranjaComplementario" />}
            title="Delivery incluido"
            description="Nos aseguramos de que tus viandas lleguen a tiempo."
          />
          <FeatureCard 
            icon={<Heart className="w-12 h-12 text-naranjaComplementario" />}
            title="Hecho con Amor"
            description="Cada plato es preparado con cuidado y atención a los detalles."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps): JSX.Element {
  return (
    <div className="text-center">
      <div className="mb-4 inline-block">{icon}</div>
      <h3 className="lg:text-3xl text-2xl font-semibold mb-2 font-playfair">{title}</h3>
      <p className='font-lora font-medium px-2 text-[1.2rem]'>{description}</p>
    </div>
  );
}

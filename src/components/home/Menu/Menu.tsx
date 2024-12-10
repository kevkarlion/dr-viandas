import React from 'react';
import { SingleMenu } from './SingleMenu';

type Dish = {
  id: number;
  chefImage: string;
  dishName: string;
  eventDate: string;
  dishDetails: string;
};

type ChefSpecialSectionProps = {
  dishes: Dish[];
};


export const Menu: React.FC<ChefSpecialSectionProps> = ({ dishes }) => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Platos del mes
        </h1>
        <div className="flex flex-col w-full gap-8">
          {dishes.map((dish) => (
            <SingleMenu
              key={dish.id}
              chefImage={dish.chefImage}
              dishName={dish.dishName}
              eventDate={dish.eventDate}
              dishDetails={dish.dishDetails}
             
            />
          ))}
        </div>
      </div>
    </section>
  );
};



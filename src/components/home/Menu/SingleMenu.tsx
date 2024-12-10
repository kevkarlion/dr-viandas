"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";

type ChefSpecialCardProps = {
  chefImage: string;
  dishName: string;
  eventDate: string;
  dishDetails: string;
};

export const SingleMenu: React.FC<ChefSpecialCardProps> = ({
  chefImage,
  dishName,
  eventDate,
  dishDetails,
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden ">
      {/* Image Section */}

      <div className="w-full md:w-1/3 h-[12rem] md:h-auto relative">
        <Image
          src={chefImage}
          alt="Chef"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{dishName}</h2>
          <p className="text-gray-500 text-sm mt-1">{eventDate}</p>
          <p className="text-gray-700 text-base mt-4">{dishDetails}</p>
        </div>
        <div className="mt-6 flex self-center">
            <Button>
                  <p>Add +</p>
            </Button>
        </div>
      </div>
    </div>
  );
};

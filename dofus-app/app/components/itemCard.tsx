'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ItemCardProps {
  _id: string;
  name: string;
  level: number;
  type: string;
  description: string;
  image: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ _id, name, level, type, description, image }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-[200px] h-[250px] perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)} // Inverse l'état au clic
    >
      {/* Carte avec effet flip, surlignage vert au hover, et légère augmentation de taille */}
      <motion.div
        className={`w-full h-full rounded-lg shadow-lg cursor-pointer transition-all duration-500 transform hover:ring-2 hover:ring-green-500 hover:scale-150
          ${isFlipped ? "ring-2 ring-green-500" : "ring-0"}
        `}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Face avant */}
        {!isFlipped && (
          <div className="absolute w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-center backface-hidden">
            <Image 
              src={image} 
              alt={name} 
              width={150} 
              height={150} 
              className="object-cover rounded-lg"
            />
            <p className="text-gray-600 mt-2 font-bold">{name}</p>
          </div>
        )}

        {/* Face arrière */}
        {isFlipped && (
          <div className="absolute w-full h-full bg-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center backface-hidden ring-2 ring-green-500"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-green-400 font-bold">{name}</p>
            <p className="text-gray-300 text-sm">Level: {level}</p>
            <p className="text-gray-400 text-xs text-center p-2">{description}</p>
            <p className="text-gray-500 text-xs">Type: {type}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ItemCard;

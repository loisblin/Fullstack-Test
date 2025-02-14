'use client';
import { useEffect, useState } from 'react';
import ItemCard from './itemCard';

interface Item {
  _id: string;
  name: string;
  level: number;
  type: string;
  description: string;
  image: string;
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Fonction pour récupérer les items
  const fetchItems = async (page: number, search: string, type: string) => {
    const res = await fetch(`/api/getItems?page=${page}&limit=12&search=${search}&type=${type}`);
    const data = await res.json();
    setItems(data.items);
    setTotalPages(data.totalPages);
  };

  // Met à jour la liste des items quand les filtres changent
  useEffect(() => {
    fetchItems(currentPage, searchTerm, selectedType);
  }, [currentPage, searchTerm, selectedType]);

  // Réinitialise la page à 1 quand la recherche ou le type change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return (
    <div >
      <div className="flex justify-center items-center gap-4 p-4  backdrop-blur-md rounded-lg w-full max-w-3xl mx-auto mt-4">
      {/* Champ de recherche */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un item..."
        className="p-2 w-80 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Filtres de type */}
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
       className="p-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Tous les types</option>
        <option value="Anneau">Anneau</option>
        <option value="Chapeau">Chapeau</option>
        <option value="Épée">Épée</option>
        <option value="Cape">Cape</option>
        <option value="Ceinture">Ceinture</option>
        <option value="Bottes">Bottes</option>
        <option value="Amulette">Amulette</option>
        <option value="Dofus">Dofus</option>
        <option value="Bouclier">Bouclier</option>
        <option value="Familier">Familier</option>
        
      </select>
      </div>
      {/* Grille d'items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto w-full max-w-screen-xl">
  {items.map((item) => (
    <ItemCard
      key={item._id}
      _id={item._id}
      name={item.name}
      level={item.level}
      type={item.type}
      description={item.description}
      image={item.image}
    />
  ))}
</div>

<div className="pagination flex justify-center mt-4 space-x-2">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage <= 1}
    className="p-2 bg-gray-300 rounded hover:scale-110 hover:ring-2 hover:ring-green-500 transition-transform duration-300 disabled:bg-gray-200"
  >
    Précédent
  </button>

  <span className="p-2 text-green-400">{`Page ${currentPage} sur ${totalPages}`}</span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage >= totalPages}
    className="p-2 bg-gray-300 rounded hover:scale-110 hover:ring-2 hover:ring-green-500 transition-transform duration-300 disabled:bg-gray-200"
  >
    Suivant
  </button>
</div>
    </div>
  );
};

export default Items;

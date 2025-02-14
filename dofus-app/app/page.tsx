// pages/page.tsx

'use client'; // <-- Assurez-vous que ce fichier est côté client
import { useState } from 'react';
import ItemsCards from './components/itemsCards';
import './globals.css';
import Image from 'next/image';

const HomePage = () => {
  const [items, setItems] = useState<any[]>([]);  // Stockage des items récupérés

  // Fonction pour recharger la page
  const handleReloadPage = () => {
    window.location.reload();
  };

  // Fonction pour charger les données via l'API
  const handleLoadData = async () => {
    try {
      // Envoie une requête POST à l'API pour récupérer les items
      const res = await fetch('http://localhost:3000/api/fetchItems', {
        method: 'POST', // Indique que c'est une requête POST
        headers: {
          'Content-Type': 'application/json',
        },
        // Tu peux envoyer un body si nécessaire, par exemple des filtres
        body: JSON.stringify({
          // Par exemple : { type: "anneau" }
        }),
      });
  
      if (!res.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
  
      const data = await res.json();
      setItems(data); // Mise à jour du state avec les items récupérés
      console.log('Données chargées :', data);
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-700 via-gray-800 to-gray-900 ">
      <div className="container flex items-center justify-center space-x-4 py-4">
  {/* Titre "Dofus Items" pour recharger la page */}
  <h1
    className="text-3xl font-bold cursor-pointer transition-all duration-300 transform hover:underline hover:scale-110"
    onClick={handleReloadPage}  // Recharger la page au clic
  >
    Dofus Items
  </h1>

  {/* Logo à gauche */}
  <Image src="/logo.png" alt="Dofus Logo" width={150} height={50} />

  {/* Titre "Charger des données" pour appeler l'API */}
  <h1
    className="text-3xl font-bold cursor-pointer transition-all duration-300 transform hover:underline hover:scale-110"
    onClick={handleLoadData}  // Charger les données via l'API au clic
  >
    Charger des données
  </h1>
</div>

      {/* Affichage des items récupérés */}
      <div  className="bg-cover bg-center w-full min-h-screen p-4">
        <ItemsCards/>  {/* Passe les items récupérés au composant ItemsCards */}
      </div>
    </div>
  );
};

export default HomePage;

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import mongoose from 'mongoose';
import Item from '../../models/Item';

// Connexion à MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect( 'mongodb://localhost:27017/dofusdb');
};

const fetchAndSaveItem = async (id: number) => {
  try {
    // Récupérer un item de l'API en utilisant son ID
    const response = await axios.get(`https://api.dofusdb.fr/items/${id}`);
    const item = response.data;
    console.log("mon item");
    console.log(item.id); 
    console.log(item.name.fr);
    console.log(item.level);
    console.log("type",item.type.name.fr);
    console.log(item.description.fr);
    console.log(item.img);
    console.log("fin mon item");
    const existingItem = await Item.findOne({ name: item.name.fr });
    console.log(existingItem)
    if (existingItem) {
      console.log(`Item with ID ${id} already exists in the database`);
      return;
    }
    else{
    // Sauvegarder l'item dans la base de données MongoDB
    await Item.create({
      
      name: item.name.fr,
      level: item.level,
      type: item.type.name.fr,
      description: item.description.fr,
      image: item.img,
    });
  }
  } catch (error) {
    console.error(`Failed to fetch or save item with ID ${id}:`, error);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Connexion à la base de données
      await connectToDatabase();

      // ID des items que vous voulez récupérer (testez avec une petite liste au début)
      const itemIds = Array.from({ length: 20000 }, (_, i) => i);   // Remplacez ceci par une liste d'IDs d'items que vous voulez récupérer

      // Récupérer et sauvegarder chaque item individuellement
      for (let id of itemIds) {
        await fetchAndSaveItem(id);  // Appeler la fonction pour récupérer et sauvegarder l'item
      }

      res.status(200).json({ message: 'Items successfully fetched and saved!' });
    } catch (error) {
      console.error('Error fetching data from API:', error);
      res.status(500).json({ error: 'Failed to fetch data from API' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

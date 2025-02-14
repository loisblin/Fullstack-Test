import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import mongoose from 'mongoose';
import Item from '../../models/Item';


const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect( 'mongodb://localhost:27017/dofusdb');
};

const fetchAndSaveItem = async (id: number) => {
  try {
    
    const response = await axios.get(`https://api.dofusdb.fr/items/${id}`);
    const item = response.data;

    const existingItem = await Item.findOne({ name: item.name.fr });
    
    if (existingItem) {
      console.log(`Item with ID ${id} already exists in the database`);
      return;
    }
    else{
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
      await connectToDatabase();

      const itemIds = Array.from({ length: 20000 }, (_, i) => i);   
      for (let id of itemIds) {
        await fetchAndSaveItem(id); 
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

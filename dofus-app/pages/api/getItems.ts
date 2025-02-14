import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Item from '../../models/Item';

// Connexion à MongoDB
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect('mongodb://localhost:27017/dofusdb');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const { page = 1, limit = 12, search = '', type = '' } = req.query;
      const query: any = {};
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      if (type) {
        query.type = type;
      }

      const items = await Item.find(query)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const totalItems = await Item.countDocuments(query);
      const totalPages = Math.ceil(totalItems / Number(limit));

      res.status(200).json({ items, totalPages });
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

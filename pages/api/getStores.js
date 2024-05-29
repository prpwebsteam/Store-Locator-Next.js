// pages/api/getStores.js

import { ObjectId } from 'mongodb';
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const db = await connectDB();
  const { storeId } = req.query;

  try {
    if (storeId) {
      // Ensure the storeId is a valid ObjectId before querying
      if (!ObjectId.isValid(storeId)) {
        return res.status(400).json({ message: 'Invalid store ID' });
      }
      const store = await db.collection('stores').findOne({ _id: new ObjectId(storeId) });
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
      res.status(200).json(store);
    } else {
      const stores = await db.collection('stores').find({}).toArray();
      res.status(200).json(stores);
    }
  } catch (error) {
    console.error('Get Stores Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
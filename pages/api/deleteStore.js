// pages/api/deleteStore.js

import { connectDB } from '../../db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { storeId } = req.body;

      if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
      }

      const db = await connectDB();

      const store = await db.collection('stores').findOne({ _id: ObjectId(storeId) });
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Delete the store from the database
      const result = await db.collection('stores').deleteOne({ _id: ObjectId(storeId) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Store not found or already deleted' });
      }

      res.status(200).json({ message: 'Store deleted successfully', storeId: storeId });
    } catch (error) {
      console.error('Delete Store Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
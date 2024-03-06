// pages/api/editStore.js

import { connectDB } from '../../db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { storeId, ...updateFields } = req.body;

      if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
      }

      const db = await connectDB();

      // Retrieve the store details using the getStore API
      const store = await db.collection('stores').findOne({ _id: ObjectId(storeId) });
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Update the store using the updateStore API
      const result = await db.collection('stores').updateOne({ _id: ObjectId(storeId) }, { $set: updateFields });
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Store not found or data not changed' });
      }

      res.status(200).json({ message: 'Store updated successfully', storeId: storeId });
    } catch (error) {
      console.error('Edit Store Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
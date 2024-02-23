// pages/api/getStores.js

import { ObjectId } from 'mongodb';
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectDB();

      const { storeId } = req.query;

      if (storeId) {
        const store = await db.collection('stores').findOne({ _id: ObjectId(storeId) });
        if (!store) {
          res.status(404).json({ message: 'Store not found' });
        } else {
          res.status(200).json(store);
        }
      } else {
        const stores = await db.collection('stores').find({}).toArray();
        res.status(200).json(stores);
      }
    } catch (error) {
      console.error('Get Stores Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
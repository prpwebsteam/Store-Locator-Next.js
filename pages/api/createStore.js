// pages/api/createStore.js

import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        searchAddress,
        addressLine1,
        addressLine2,
        city,
        stateProvince,
        country,
        postalCode,
        latitude,
        longitude,
        description,
        serviceOptions,
        hours,
        phone,
        email,
        website,
        fax,
      } = req.body;

      const db = await connectDB();

      // Create a new store document
      const newStore = {
        name,
        searchAddress,
        addressLine1,
        addressLine2,
        city,
        stateProvince,
        country,
        postalCode,
        latitude,
        longitude,
        description,
        serviceOptions,
        hours,
        phone,
        email,
        website,
        fax,
      };

      const result = await db.collection('stores').insertOne(newStore);

      res.status(200).json({ message: 'Store created successfully', storeId: result.insertedId });
    } catch (error) {
      console.error('Create Store Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
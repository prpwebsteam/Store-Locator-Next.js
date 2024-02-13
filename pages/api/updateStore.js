// pages/api/updateStore.js

import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const {
        id,
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

      const filter = { _id: id }; 

      const updateDoc = {
        $set: {
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
        },
      };

      const result = await db.collection('stores').updateOne(filter, updateDoc);

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Store not found or data not changed' });
      }

      res.status(200).json({ message: 'Store updated successfully', storeId: id });
    } catch (error) {
      console.error('Update Store Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
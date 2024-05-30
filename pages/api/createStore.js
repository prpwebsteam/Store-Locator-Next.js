// pages/api/createStore.js

import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
        isActive,  
      } = req.body;

      const db = await connectDB();

      if (id) {
        // Editing an existing store
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
            isActive  
          },
        };

        const result = await db.collection('stores').updateOne(filter, updateDoc);

        // Check if a document was modified
        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'Store not found or data not changed' });
        }

        res.status(200).json({ message: 'Store updated successfully', storeId: id });
      } else {
        // Creating a new store
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
          isActive: isActive !== undefined ? isActive : true
        };

        const result = await db.collection('stores').insertOne(newStore);

        res.status(200).json({ message: 'Store created successfully', storeId: result.insertedId });
      }
    } catch (error) {
      console.error('Create/Edit Store Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
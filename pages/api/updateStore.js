// pages/api/updateStore.js

import { ObjectId } from 'mongodb';
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const db = await connectDB();

  const {
    _id,
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

  // Validate the ObjectId
  if (!_id || !ObjectId.isValid(_id)) {
    return res.status(400).json({ message: 'Invalid store ID' });
  }

  const filter = { _id: new ObjectId(_id) };
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

  try {
    const result = await db.collection('stores').updateOne(filter, updateDoc);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Store not found or data not changed' });
    }

    res.status(200).json({ message: 'Store updated successfully', storeId: _id });
  } catch (error) {
    console.error('Update Store Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
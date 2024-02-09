// // pages/api/saveExcelData.js

import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
   
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
   
    const excelData = req.body;

    const db = await connectDB();

    const result = await db.collection('stores').insertMany(excelData);

    if (result.insertedCount > 0) {
      res.status(200).json({ message: 'Excel data saved successfully to stores' });
    } else {
      res.status(400).json({ message: 'Failed to save Excel data to stores' });
    }
  } catch (error) {
    console.error('Error saving Excel data to stores:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// pages/api/verify.js

import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Implement your verification logic here
      const { email, password } = req.query; 

      // Connect to MongoDB
      const db = await connectDB();

      const user = await db.collection('users').findOne({
        email: email,
        password: password,
      });

      if (user) {
        res.status(200).json({ message: 'User verified' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Verification Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).end();
  }
}
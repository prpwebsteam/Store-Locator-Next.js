// api/signup.js
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      // Connect to MongoDB
      const db = await connectDB();

      // Create a new user document
      const result = await db.collection('users').insertOne({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.insertedId) {
        res.status(200).json({ message: 'Signup successful' });
      } else {
        res.status(500).json({ message: 'Signup failed' });
      }
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Signup failed' });
    }
  } else {
    res.status(405).end();
  }
}
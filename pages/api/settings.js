// api/settings.js
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      const db = await connectDB();

      // Create or update settings document
      const result = await db.collection('settings').updateOne(
        { userId: formData.userId },
        { $set: formData },
        { upsert: true }
      );

      if (result.upsertedCount > 0 || result.modifiedCount > 0) {
        res.status(200).json({ message: 'Settings saved successfully' });
      } else {
        res.status(500).json({ message: 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Settings Error:', error);
      res.status(500).json({ message: 'Failed to save settings' });
    }
  } else if (req.method === 'GET') {
    try {
      const db = await connectDB();

      // Retrieve settings document
      const settings = await db.collection('settings').findOne({ userId: req.query.userId });

      if (settings) {
        res.status(200).json(settings);
      } else {
        res.status(404).json({ message: 'Settings not found' });
      }
    } catch (error) {
      console.error('Settings Error:', error);
      res.status(500).json({ message: 'Failed to retrieve settings' });
    }
  } else {
    res.status(405).end();
  }
}
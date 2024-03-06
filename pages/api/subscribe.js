// api/subscribe.js
import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const db = await connectDB();

      const existingSubscription = await db.collection('subscriptions').findOne({ email });

      if (existingSubscription) {
        return res.status(400).json({ message: 'Email already subscribed' });
      }

      const result = await db.collection('subscriptions').insertOne({
        email,
        subscribedAt: new Date(),
      });

      if (result.insertedId) {
        return res.status(200).json({ message: 'Subscription successful' });
      } else {
        return res.status(500).json({ message: 'Subscription failed' });
      }
    } catch (error) {
      console.error('Subscription Error:', error);
      return res.status(500).json({ message: 'Subscription failed' });
    }
  } else {
    return res.status(405).end();
  }
}
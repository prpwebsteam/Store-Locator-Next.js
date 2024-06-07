import { connectDB } from '../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      const db = await connectDB();
      if (!db) {
        throw new Error('Failed to connect to database');
      } else {
        console.log("Connected to database");
      }

      const { subscriptionId } = req.query;

      if (subscriptionId) {
        // Retrieve the specific subscription by its subscriptionId
        const subscription = await db.collection('subscriptions').findOne({ subscriptionId });

        if (!subscription) {
          return res.status(404).json({ message: 'Subscription not found' });
        }

        return res.status(200).json({ message: 'Subscription retrieved successfully', subscription });
      } else {
        // Retrieve all subscriptions from the database
        const subscriptions = await db.collection('subscriptions').find({}).toArray();

        return res.status(200).json({ message: 'Subscriptions retrieved successfully', subscriptions });
      }
    } catch (error) {
      console.error('Error retrieving subscriptions:', error);
      return res.status(500).json({ message: 'Failed to retrieve subscriptions', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

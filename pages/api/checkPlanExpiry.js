import { Stripe } from 'stripe';
import { connectDB } from '../../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { subscriptionIds } = req.body;
      const db = await connectDB();

      const subscriptionDetails = await Promise.all(subscriptionIds.map(async (id) => {
        const subscription = await stripe.subscriptions.retrieve(id);
        const updatedSubscription = {
          id,
          current_period_end: subscription.current_period_end,
          status: subscription.status,
        };

        // Update the status in the database
        await db.collection('subscriptions').updateOne(
          { subscriptionId: id },
          { $set: { status: subscription.status, current_period_end: subscription.current_period_end } }
        );

        return updatedSubscription;
      }));

      return res.status(200).json({ subscriptionDetails });
    } catch (error) {
      console.error('Error fetching subscription details:', error);
      return res.status(500).json({ message: 'Failed to fetch subscription details', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

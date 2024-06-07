import { Stripe } from 'stripe';
import { connectDB } from '../../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { subscriptionId } = req.body;
      const db = await connectDB();

      // Cancel the subscription in Stripe
      const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
      // Update the subscription status in the database
      const result = await db.collection('subscriptions').updateOne(
        { subscriptionId },
        { $set: { status: 'canceled' } }
      );

      if (!result.matchedCount) {
        throw new Error('Subscription not found in database');
      }

      return res.status(200).json({ message: 'Subscription canceled successfully', canceledSubscription });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return res.status(500).json({ message: 'Failed to cancel subscription', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

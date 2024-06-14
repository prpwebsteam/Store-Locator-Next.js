import { Stripe } from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { subscriptionIds } = req.body;

      const subscriptionDetails = await Promise.all(subscriptionIds.map(async (id) => {
        const subscription = await stripe.subscriptions.retrieve(id);
        return {
          id,
          current_period_end: subscription.current_period_end,
          status: subscription.status,
        };
      }));

      const subscriptionsToCancel = subscriptionDetails.filter(subscription => {
        return new Date(subscription.current_period_end).toDateString() === new Date().toDateString();
      });

      // Call cancelSubscription for each subscription that needs to be canceled
      await Promise.all(subscriptionsToCancel.map(async (subscription) => {
        try {
          const response = await axios.post(`${process.env.BASE_URL}/api/cancelSubscription`, { subscriptionId: subscription.id });
          return response.data;
        } catch (error) {
          console.error('Error canceling subscription:', error);
          throw error;
        }
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
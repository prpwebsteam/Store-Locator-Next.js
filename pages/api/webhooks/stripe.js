// pages/api/webhooks/stripe.js

import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on its type (e.g., subscription.created, subscription.deleted)
    switch (event.type) {
      case 'customer.subscription.created':
        // Save subscription data to MongoDB
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;

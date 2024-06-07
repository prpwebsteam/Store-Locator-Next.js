// pages/api/createCustomer.js

import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, paymentMethodId } = req.body;

      // Create a customer in Stripe
      const customer = await stripe.customers.create({
        email: email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      res.status(200).json(customer);
    } catch (error) {
      console.error('Create Customer Error:', error);
      res.status(500).json({ message: 'Failed to create customer' });
    }
  } else {
    res.status(405).end();
  }
}

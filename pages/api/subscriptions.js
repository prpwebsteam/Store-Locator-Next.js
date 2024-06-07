import { connectDB } from '../../db';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId, customerId, planId, title, price, user } = req.body;

      // Verify if the customer exists in Stripe
      const customer = await stripe.customers.retrieve(customerId);
      if (!customer) {
        throw new Error('Customer not found in Stripe');
      }

      // Attach the payment method to the customer
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

      // Set the default payment method on the customer
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // Create a subscription using Stripe API
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ plan: planId }],
        expand: ['latest_invoice.payment_intent'],
      });

      const paymentIntent = subscription.latest_invoice.payment_intent;
      console.log("paymentIntent:", paymentIntent);

      // Connect to MongoDB
      const db = await connectDB();
      if (!db) {
        throw new Error('Failed to connect to database');
      } else {
        console.log("Connected to database");
      }

      // Save initial subscription details in MongoDB
      const result = await db.collection('subscriptions').insertOne({
        subscriptionId: subscription.id,
        customerId: customerId,
        planId: planId,
        title: title,
        price: price,
        user: user,
        status: subscription.status,
        createdAt: new Date(),
      });

      if (!result.insertedId) {
        throw new Error('Failed to insert subscription into database');
      }

      if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_confirmation') {
        // Handle additional authentication (e.g., 3D Secure)

        // Update the subscription status in MongoDB to 'requires_action'
        await db.collection('subscriptions').updateOne(
          { subscriptionId: subscription.id },
          { $set: { status: 'active' } }
        );

        return res.status(200).json({
          requiresAction: true,
          paymentIntentClientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          status: 'requires_action',
        });
      }

      // Confirm the payment intent if it does not require action
      const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

      if (confirmedPaymentIntent.status === 'succeeded') {
        // Fetch the updated subscription to get the final status
        const updatedSubscription = await stripe.subscriptions.retrieve(subscription.id);

        // Update the subscription status in MongoDB
        await db.collection('subscriptions').updateOne(
          { subscriptionId: subscription.id },
          { $set: { status: updatedSubscription.status } }
        );

        return res.status(200).json({ message: 'Subscription created successfully', subscription: updatedSubscription, status: updatedSubscription.status });
      } else {
        throw new Error('Failed to confirm payment intent');
      }
    } catch (error) {
      console.error('Subscription Error:', error);
      return res.status(500).json({ message: 'Failed to create subscription', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

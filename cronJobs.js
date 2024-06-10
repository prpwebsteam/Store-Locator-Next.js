import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();

const checkPlanExpiryUrl = `${process.env.BASE_URL}/api/checkPlanExpiry`;
const cancelSubscriptionUrl = `${process.env.BASE_URL}/api/cancelSubscription`;

async function checkPlanExpiry() {
  try {
    const db = await connectDB();
    const currentDate = new Date();
    const subscriptionIds = await db.collection('subscriptions')
      .find({ current_period_end: { $lte: currentDate }, status: 'active' })
      .map(sub => sub.subscriptionId)
      .toArray();

    if (subscriptionIds.length > 0) {
      const response = await axios.post(checkPlanExpiryUrl, { subscriptionIds });
      return response.data.subscriptionDetails;
    }
    return [];
  } catch (error) {
    console.error('Error checking plan expiry:', error);
  }
}

async function cancelSubscription(subscriptionId) {
  try {
    const response = await axios.post(cancelSubscriptionUrl, { subscriptionId });
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
  }
}

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily subscription check');
  const subscriptionsToCancel = await checkPlanExpiry();

  for (const subscription of subscriptionsToCancel) {
    if (new Date(subscription.current_period_end).toDateString() === new Date().toDateString()) {
      await cancelSubscription(subscription.id);
    }
  }
});

console.log('Cron job scheduled to run daily at midnight');
const cron = require('node-cron');
const fetch = require('node-fetch');
const { connectDB } = require('./db');

const checkExpiryUrl = 'http://localhost:3000/api/checkPlanExpiry';
const cancelSubscriptionUrl = 'http://localhost:3000/api/cancelSubscription';

const checkAndCancelSubscriptions = async () => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error('Failed to connect to database');
    }

    const activeSubscriptions = await db.collection('subscriptions').find({ status: 'active' }).toArray();
    const subscriptionIds = activeSubscriptions.map(sub => sub.subscriptionId);

    const response = await fetch(checkExpiryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to check plan expiry');
    }

    const { subscriptionDetails } = await response.json();
    const currentDate = new Date();

    for (const detail of subscriptionDetails) {
      const expiryDate = new Date(detail.current_period_end * 1000);
      if (expiryDate <= currentDate) {
        const cancelResponse = await fetch(cancelSubscriptionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscriptionId: detail.id }),
        });

        if (!cancelResponse.ok) {
          console.error(`Failed to cancel subscription ${detail.id}`);
        } else {
          console.log(`Subscription ${detail.id} canceled successfully`);
        }
      }
    }
  } catch (error) {
    console.error('Error in checkAndCancelSubscriptions:', error);
  }
};

// Schedule the job to run once a day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running cron job: checkAndCancelSubscriptions');
  checkAndCancelSubscriptions();
});

'use client';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePaymentStatus } from '@/contexts/PaymentStatusContext'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PlansContent({ selectContentWithData }) {
  const paidPlans = usePaymentStatus();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expiryDetails, setExpiryDetails] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/getSubscriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        setSubscriptions(data.subscriptions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const response = await fetch('/api/payment/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    if (response.ok) {
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      const error = await response.json();
      console.error('Error during session creation:', error);
    }
  };

  const redirectToUrl = async (priceId) => {
    if (!priceId) {
      alert('Free tier selected');
    } else if (priceId.startsWith('http')) {
      window.location.href = priceId;
    } else {
      await handleCheckout(priceId);
    }
  };

  const checkExpiry = async () => {
    const subscriptionIds = subscriptions.map(sub => sub.subscriptionId);
    try {
      const response = await fetch('/api/checkPlanExpiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to check plan expiry');
      }

      const data = await response.json();
      setExpiryDetails(data.subscriptionDetails);
    } catch (error) {
      console.error('Error checking plan expiry:', error);
      setError(error.message);
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    try {
      const response = await fetch('/api/cancelSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const data = await response.json();
      console.log('Subscription canceled:', data);

      // Update the subscriptions state
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.subscriptionId === subscriptionId ? { ...sub, status: 'canceled' } : sub
        )
      );
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setError(error.message);
    }
  };

  const pricingTiers = [
    {
      title: 'Free',
      price: 'Free',
      pid: 0,
      features: [
        '5 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
      isPaid: false,
    },
    {
      title: 'Basic',
      price: '$6.99/month',
      pid: "price_1Ozbp5SHn1JO3w86Rml2JUb8",
      priceId: process.env.NEXT_PUBLIC_PRICE_ID_BASIC,
      features: [
        'Up to 121 Stores',
        'Spreadsheet bulk import/export',
        '5 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
      isPaid: false,
    },
    {
      title: 'Plus',
      price: '$19.99/month',
      pid: "price_1OzbqySHn1JO3w86QFNUIA4a",
      priceId: process.env.NEXT_PUBLIC_PRICE_ID_PLUS,
      features: [
        'Up to 1100 Stores',
        'Spreadsheet bulk import/export',
        '5 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
      isPaid: false,
    },
    {
      title: 'Pro',
      price: '$39.99/month',
      pid: "price_1OzbrSSHn1JO3w86TclSMZlE",
      priceId: process.env.NEXT_PUBLIC_PRICE_ID_PRO,
      features: [
        'Up to 5000 Stores',
        'Spreadsheet bulk import/export',
        '5 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
      isPaid: false,
    },
  ];

  if (loading) return <div className='absolute top-[50%] right-[30%]'>Loading...</div>;
  if (error) return <div className='absolute top-[50%] right-[30%]'>Error: {error}</div>;

  return (
    <>
      <div className="mx-auto min-h-screen transition-margin duration-300 ease-in-out">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className='text-[18px] mb-8 font-semibold'>Plans</p>
          <button 
            className="mb-8 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-bold" 
            onClick={checkExpiry}
          >
            Check Plan Expiry
          </button>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {pricingTiers.map((tier, index) => {
              const activeSubscriptions = subscriptions.filter(sub => sub.planId === tier.priceId && sub.status === 'active');
              const isActivated = activeSubscriptions.length > 0;
              const expiryDetail = expiryDetails.find(detail => detail.id === activeSubscriptions[0]?.subscriptionId);

              return (
                <div key={index} className="p-6 flex flex-col gap-4 rounded-xl bg-white">
                  <h3 className="text-md font-normal text-[#505050]">{tier.title}</h3>
                  <p className="text-lg font-bold">{tier.price}</p>
                  <ul className="list-disc pl-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                  {isActivated ? (
                    <>
                      <button className="mt-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                        Activated
                      </button>
                      {expiryDetail && (
                        <p className="text-sm mt-2 text-gray-600">
                          {expiryDetail.status === 'active' ? 
                            `Expires on: ${new Date(expiryDetail.current_period_end * 1000).toLocaleDateString()}` : 
                            `Status: ${expiryDetail.status}`}
                        </p>
                      )}
                      <button 
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
                        onClick={() => cancelSubscription(activeSubscriptions[0].subscriptionId)}
                      >
                        Cancel Subscription
                      </button>
                    </>
                  ) : (
                    <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
                      onClick={() => selectContentWithData(tier.title, tier.price, tier.priceId, 'Subscribe')}
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansContent;
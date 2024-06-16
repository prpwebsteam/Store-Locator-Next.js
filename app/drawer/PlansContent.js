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
  const [freePlanActivated, setFreePlanActivated] = useState(false);
  const [isHandlingCheckout, setIsHandlingCheckout] = useState(false);
  const [isCancelingSubscription, setIsCancelingSubscription] = useState({});

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/getSubscriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        setSubscriptions(data.subscriptions);

        const allCanceledOrPendingCancellation = data.subscriptions.every(sub => sub.status === 'canceled' || sub.status === 'pending_cancelation');
        if (allCanceledOrPendingCancellation || data.subscriptions.length === 0) {
          setFreePlanActivated(true);
        } else {
          setFreePlanActivated(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleCheckout = async (priceId) => {
    setIsHandlingCheckout(true);
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe.js has not loaded yet.');
      setIsHandlingCheckout(false);
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
    setIsHandlingCheckout(false);
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
    setIsCancelingSubscription((prev) => ({ ...prev, [subscriptionId]: true }));
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

      // Update the subscriptions state
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.subscriptionId === subscriptionId ? { ...sub, status: 'pending_cancelation' } : sub
        )
      );
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setError(error.message);
    } finally {
      setIsCancelingSubscription((prev) => ({ ...prev, [subscriptionId]: false }));
    }
  };

  const pricingTiers = [
    {
      title: 'Free',
      price: 'Free',
      pid: 0,
      features: [
        '5 Stores',
        '3 Layouts',
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
        '3 Layouts',
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
        '3 Layouts',
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
        '3 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
      isPaid: false,
    },
  ];

  if (loading) return <div className='absolute top-[50%] right-[30%]'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
  </div>;
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
          {freePlanActivated && (
            <div className="mb-4 text-black bg-[#fed000] font-bold px-6 py-2 rounded-[10px]">
              You are using free tier!
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {pricingTiers.map((tier, index) => {
              const activeSubscriptions = subscriptions.filter(sub => sub.planId === tier.priceId && (sub.status === 'active' || sub.status === 'pending_cancelation'));
              const isActivated = activeSubscriptions.length > 0 || (tier.title === 'Free' && freePlanActivated);
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
                  {tier.title === 'Free' ? (
                    <button className="mt-auto bg-green-700 hover:bg-green-500 text-white rounded-lg font-bold">

                    </button>
                  ) : isActivated ? (
                    <>
                      <button className="mt-auto bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold">
                        {activeSubscriptions[0]?.status === 'pending_cancelation' ? 'Pending Cancellation' : 'Activated'}
                      </button>
                      {expiryDetail && (
                        <p className="text-sm mt-2 text-gray-600">
                          {expiryDetail.status === 'active' ?
                            `Expires on: ${new Date(expiryDetail.current_period_end * 1000).toLocaleDateString()}` :
                            `Status: ${expiryDetail.status}`}
                        </p>
                      )}
                      {activeSubscriptions[0]?.status !== 'pending_cancelation' && (
                        <button
                          className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
                          onClick={() => {
                            if (!isCancelingSubscription[activeSubscriptions[0].subscriptionId]) {
                              cancelSubscription(activeSubscriptions[0].subscriptionId);
                            }
                          }}
                        >
                          {isCancelingSubscription[activeSubscriptions[0].subscriptionId] ? 'Canceling...' : 'Cancel Subscription'}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className="mt-auto bg-[#0046B5] hover:bg-[#F2F2F7] text-white hover:text-black px-4 py-2 rounded-lg font-bold"
                      onClick={() => {
                        if (!isHandlingCheckout) {
                          selectContentWithData(tier.title, tier.price, tier.priceId, 'Subscribe');
                          handleCheckout(tier.priceId);
                        }
                      }}
                    >
                      {isHandlingCheckout ? 'Processing...' : 'Upgrade'}
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
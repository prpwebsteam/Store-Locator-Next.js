'use client'
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePaymentStatus } from '@/contexts/PaymentStatusContext'; 


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PlansContent() {
  const paidPlans = usePaymentStatus();
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
  const pricingTiers = [
    {
      title: 'Free',
      price: 'Free',
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

  return (
    <>
      <div className="mx-auto min-h-screen transition-margin duration-300 ease-in-out">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className='text-[18px] mb-8 font-semibold'>Plans</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {pricingTiers.map((tier, index) => (
              <div key={index} className="p-6 flex flex-col gap-4 rounded-xl bg-white">
                <h3 className="text-md font-normal text-[#505050]">{tier.title}</h3>
                <p className="text-lg font-bold">{tier.price}</p>
                <ul className="list-disc pl-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm">{feature}</li>
                  ))}
                </ul>
                {tier?.isPaid || paidPlans?.includes(tier?.priceId) ? (
                  <button className="mt-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                    Activated
                  </button>
                ) : (
                  <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
                  onClick={() => redirectToUrl(tier.priceId)}
                  >
                    Upgrade
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlansContent;
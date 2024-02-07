'use client'
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentCard() {

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
      
    const redirectToUrl = (priceId) => {
        if (!priceId) {
            alert('Free tier selected');
        } else if (priceId.startsWith('http')) {
            window.location.href = priceId;
        } else {
            console.error('Invalid priceId or URL');
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
    },
  ];


  return (
    <div className="flex flex-col items-center max-w-[1440px] mx-auto p-4 lg:p-8 gap-2 lg:gap-8 bg-white">      
      <div className='px-4 mt-8 flex flex-col gap-2 mb-8 items-center'>
        <strong className='text-[48px]'>Plan</strong>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="shadow-2xl p-6 flex flex-col gap-6 rounded-xl bg-white">
              <h3 className="text-lg font-bold">{tier.title}</h3>
              <p className="text-lg">{tier.price}</p>
              <ul className="list-disc pl-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm">{feature}</li>
                ))}
              </ul>
                <button 
                    className="mt-auto hover:bg-slate-400 bg-[#0040A9] hover:text-black text-white px-4 py-2 hover:shadow-xl rounded-lg font-bold"
                    onClick={() => redirectToUrl(tier.priceId)}
                >
                    Choose Plan
                </button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default PaymentCard;
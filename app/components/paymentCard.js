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
          } else {
            // Return the sessionId on successful payment
            return session.sessionId;
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
            const sessionId = await handleCheckout(priceId);
            if (sessionId) {
                const paymentSuccessfulId = sessionId;
                console.log('Payment Successful ID:', paymentSuccessfulId);
            }
        }
      };
    

  const pricingTiers = [
    {
      title: 'Free',
      price: 'Free',
      features: [
        '5 Stores',
        '3 Layouts',
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
        '3 Layouts',
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
        '3 Layouts',
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
        '3 Layouts',
        '6 Map Themes',
        'Search and filters',
        'Custom map icon',
        'Edit from theme customizer',
        'Search Nearby Stores',
      ],
    },
  ];


  return (
    <div id="payment-card" className="flex flex-col items-center max-w-[1440px] mx-auto my-12 p-4 lg:p-8 gap-2 lg:gap-8 bg-white">      
      <div className='px-4 mt-8 flex flex-col gap-2 mb-8 items-center'>
        <strong className='text-[48px]'>Pricing Plan</strong>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="shadow-xl hover:shadow-2xl flex flex-col justify-between gap-6 rounded-lg bg-white">
              <div className='bg-[#D9E8FF] hover:bg-[#0040A9] hover:text-white p-6 rounded-t-lg'>
                <h3 className="text-[16px] font-semibold">{tier.title}</h3>
                <p className="text-[24px] font-bold">{tier.price}</p>
              </div>
              <div>
                <ul className="list-disc pl-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm px-6 py-2 list-none ml-[-20px]">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className='p-6'>
                <button 
                    className="mt-auto rounded-md bg-white text-black border border-[#0040A9] hover:bg-[#0040A9] hover:text-white px-6 py-2 hover:shadow-xl font-bold"
                    onClick={() => redirectToUrl(tier.priceId)}
                >
                    Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default PaymentCard;
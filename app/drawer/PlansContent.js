'use client'
import React, { useState } from 'react';

function PlansContent() {
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
    <>
          <div className="mx-auto min-h-screen transition-margin duration-300 ease-in-out">
            <div className=" max-w-[1440px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
              {/* Pricing Tiers */}
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
                    <button className="mt-auto hover:bg-slate-400 bg-[#0040A9] hover:text-black text-white px-4 py-2 hover:shadow-xl rounded-lg font-bold">
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </>
  );
}

export default PlansContent;
'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CTA = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to subscribe:', error.message);
      toast.error('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <section className="px-4 py-4 mt-8 mb-12 md:mt-12 md:mb-24">
      <div className="max-w-screen-lg mx-auto overflow-hidden rounded-lg" style={{ backgroundImage: "linear-gradient(135deg, #0046B5 50%, #6699CC 100%)" }}>
        <div className="flex flex-col md:flex-row justify-between w-full px-4 py-4">
          <div className="flex items-center sm:col-span-8 py-4 md:w-1/2 md:pl-8">
            <div className="text-white font-bold md:text-xl lg:text-2xl">
              ENTER YOUR EMAIL FOR 15% OFF YOUR FIRST PURCHASE
            </div>
          </div>
          <div className="sm:col-span-4 flex items-center md:w-1/2 justify-end py-2 pr-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="rounded-l-md p-2 border-t mr-0 border-b border-l focus:outline-none text-gray-800 border-gray-200 bg-transparent"
              value={email}
              onChange={handleEmailChange}
            />
            <button 
              className="px-4 rounded-r-md bg-white text-blue-800 font-bold py-[5px] md:py-[12.5px] text-[10px] uppercase border-t border-b border-r"
              onClick={handleSubmit}
            >
              Get Code
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default CTA;
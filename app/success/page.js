// /success/page.js
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import success from "../assests/success.png"
import Image from 'next/image';
import { usePaymentStatus } from '@/contexts/PaymentStatusContext'; 

const Success = () => {
  const router = useRouter();
  const [sessionDetails, setSessionDetails] = useState(null);
  const  markPlanAsPaid  = usePaymentStatus();

  useEffect(() => {
    if (router?.isReady) {
      const sessionId = router?.query?.session_id;

      if (sessionId) {
        const fetchSessionDetails = async () => {
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            const data = await response.json();
            setSessionDetails(data);
            markPlanAsPaid(data.priceId);
            console.log('Session details:', data);
          } else {
            console.error('Failed to fetch session details');
          }
        };

        fetchSessionDetails();
      }
    }
  }, [router?.isReady]);


  return (
    <div className='bg-green-200 shadow-xl flex flex-col gap-8 mt-16 mx-auto max-w-[500px] rounded-xl justify-center items-center text-center p-16'>
      <h1 className='font-bold text-2xl'>Payment Successful</h1>
      <Image src={success} alt="success" width={64} height={64} /> 
      <p>Your payment has been successfully processed. Thank you for your purchase!</p>
      {sessionDetails && (
        <div>
          <p>Session ID: {sessionDetails.id}</p>
        </div>
      )}
    </div>
  );
};

export default Success;
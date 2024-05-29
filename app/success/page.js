// /success/page.js
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import success from "../assests/success.png"
import Image from 'next/image';

const Success = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (router?.isReady) {
      const session_id = router?.query?.session_id;

      if (session_id) {
        setSessionId(session_id);
        const fetchSessionDetails = async () => {
          const response = await fetch('/api/retrieve-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: session_id }),
          });

          if (response.ok) {
            const data = await response.json();
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
      {sessionId && (
        <div>
          <p>Session ID: {sessionId}</p>
        </div>
      )}
    </div>
  );
};

export default Success;
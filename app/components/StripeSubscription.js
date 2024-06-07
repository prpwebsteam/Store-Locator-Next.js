import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SubscriptionForm from './SubscriptionForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeSubscription = ({title, price, priceId}) => {
  return (
    <>
   
      <div className="mx-auto min-h-screen transition-margin duration-300 ease-in-out my-3">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className='text-[18px] mb-8 font-semibold'>Subscription Payments</p>
            <Elements stripe={stripePromise}>
              <SubscriptionForm title={title} price={price} priceId={priceId} />
            </Elements>
          </div>
      </div>
    
    </>
  );
};

export default StripeSubscription;


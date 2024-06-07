import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import countryList from 'country-list';

const SubscriptionForm = ({ title, price, priceId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Validate and convert country name to ISO 3166-1 alpha-2 code
    const countryCode = countryList.getCode(address.country);
    if (!countryCode) {
      setError('Invalid country name. Please enter a valid country.');
      setLoading(false);
      return;
    }

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        address: {
          ...address,
          country: countryCode,
        },
      },
    });

    if (cardError) {
      console.error(cardError);
      setError(cardError.message);
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const customerResponse = await fetch('/api/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          paymentMethodId: paymentMethod.id,
          name,
          address: {
            ...address,
            country: countryCode,
          },
        }),
      });

      if (!customerResponse.ok) {
        setLoading(false);
        throw new Error('Failed to create customer');
      }

      const customerData = await customerResponse.json();
      console.log('Customer created:', customerData);

      const subscriptionResponse = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerData.id,
          planId: priceId.toString(),
          title: title,
          price: price,
          user: user?.email,
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (!subscriptionResponse.ok) {
        setLoading(false);
        throw new Error('Failed to create subscription');
      }

      const subscriptionData = await subscriptionResponse.json();
      console.log('Subscription created:', subscriptionData);

      if (subscriptionData.requiresAction) {
        const { error: confirmationError } = await stripe.confirmCardPayment(subscriptionData.paymentIntentClientSecret);

        if (confirmationError) {
          console.error('Error confirming card payment:', confirmationError);
          setError(confirmationError.message);
          setLoading(false);
          return;
        }

        // Fetch the updated subscription status
        const updatedSubscriptionResponse = await fetch(`/api/getSubscriptions?subscriptionId=${subscriptionData.subscriptionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!updatedSubscriptionResponse.ok) {
          setLoading(false);
          throw new Error('Failed to fetch updated subscription');
        }

        const updatedSubscriptionData = await updatedSubscriptionResponse.json();
        console.log('Updated Subscription:', updatedSubscriptionData);

        // Handle success
        setError('Subscription created successfully.');
        setLoading(false);
      } else {
        // Handle success
        setError('Subscription created successfully.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Error creating subscription');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-element-wrapper">
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selected Plan</label>
          <input value={title} type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
        </div>
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plan Price</label>
          <input value={price} type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input id="name" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-5">
          <label htmlFor="address-line1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Line 1</label>
          <input id="address-line1" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
        </div>
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input id="city" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        </div>
        <div className="mb-5">
          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
          <input id="state" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
        </div>
        <div className="mb-5">
          <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal Code</label>
          <input id="postal_code" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={address.postal_code} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} />
        </div>
        <div className="mb-5">
          <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
          <input id="country" type="text" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
        </div>
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Details</label>
          <CardElement className="card-element" />
        </div>
      </div>
      <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold" type="submit" disabled={!stripe}>
        {loading ? (
          <>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            {' '}
          </>
        ) : (
          'Subscribe'
        )}
      </button>
      {error && <div className="py-2">{error}</div>}
    </form>
  );
};

export default SubscriptionForm;

'use client'
import React, { useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const CreateStore = () => {
  const router = useRouter();
  const initialStoreInfo = {
    name: '',
    searchAddress: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    description: '',
    serviceOptions: '',
    hours: '',
    phone: '',
    email: '',
    website: '',
    fax: '',
    isActive: true,
  };

  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stores, setStores] = useState([]);
  const [freePlanActivated, setFreePlanActivated] = useState(false);

  useEffect(() => {
    fetch('/api/getStores')
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => {
        console.error('Error fetching stores:', error);
      });
  }, []);

  useEffect(()=>{
    console.log("stores:- ",stores)
  },[stores])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/getSubscriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        setSubscriptions(data.subscriptions);

        // Check for free plan activation conditions
        const allCanceledOrPendingCancellation = data.subscriptions.every(sub => sub.status === 'canceled' || sub.status === 'pending_cancelation');
        console.log("allCanceledOrPendingCancellation:- ",allCanceledOrPendingCancellation)
        if (allCanceledOrPendingCancellation || data.subscriptions.length === 0) {
          console.log("set free");
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

  useEffect(()=>{
    console.log("subscriptions222:- ",subscriptions)
  },[subscriptions])

  useEffect(() => {
    const fetchStoreDetails = async () => {
      const { storeId } = router?.query || {};
      if (storeId) {
        try {
          const response = await fetch(`/api/editStore/${storeId}`);
          if (response.ok) {
            const data = await response.json();
            setStoreInfo(data);
          } else {
            console.error('Failed to fetch store details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchStoreDetails();
  }, [router?.query?.storeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStoreInfo({
      ...storeInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const planLimits = {
      'price_1Ozbp5SHn1JO3w86Rml2JUb8': 121,
      'price_1OzbqySHn1JO3w86QFNUIA4a': 1100,
      'price_1OzbrSSHn1JO3w86TclSMZlE': 5000,
    };

    const currentStoreCount = stores.length;

    let maxStoresAllowed = 0;
    if (freePlanActivated) {
      maxStoresAllowed = 5;
    } else {
      const activeSubscription = subscriptions.find(sub => sub.status === 'active');
      if (activeSubscription) {
        maxStoresAllowed = planLimits[activeSubscription.planId] || 0;
      }
    }

    if (currentStoreCount >= maxStoresAllowed) {
      alert('Plan limit reached. You cannot create more stores.');
      return;
    }

    try {
      const response = await fetch('/api/createStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeInfo),
      });

      if (response.ok) {
        setStoreInfo(initialStoreInfo);
      } else {
        console.error('Failed to create store');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('create-store-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <>
      <div className="sm:px-12 py-12 px-4 max-w-[1440px] mx-auto">
        <h2 className="mb-8 font-bold text-xl">Create a Store</h2>
        <form id="create-store-form" onSubmit={handleSubmit} className="sm:grid sm:grid-cols-3 gap-8 flex flex-col">
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Name*</label>
              <input
                type="text"
                name="name"
                value={storeInfo.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Search Address or Landmark</label>
              <input
                type="text"
                name="searchAddress"
                value={storeInfo.searchAddress}
                onChange={handleChange}
                placeholder="Search Address, Suburb, or Landmark"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={storeInfo.addressLine1}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={storeInfo.addressLine2}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>City</label>
              <input
                type="text"
                name="city"
                value={storeInfo.city}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>State / Province</label>
              <input
                type="text"
                name="stateProvince"
                value={storeInfo.stateProvince}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Country</label>
              <input
                type="text"
                name="country"
                value={storeInfo.country}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Postal / ZIP code</label>
              <input
                type="text"
                name="postalCode"
                value={storeInfo.postalCode}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Latitude</label>
              <input
                type="text"
                name="latitude"
                value={storeInfo.latitude}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Longitude</label>
              <input
                type="text"
                name="longitude"
                value={storeInfo.longitude}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Description</label>
              <input
                type="text"
                name="description"
                value={storeInfo.description}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Service Options</label>
              <input
                type="text"
                name="serviceOptions"
                value={storeInfo.serviceOptions}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Hours</label>
              <input
                type="text"
                name="hours"
                value={storeInfo.hours}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Phone</label>
              <input
                type="text"
                name="phone"
                value={storeInfo.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Email</label>
              <input
                type="text"
                name="email"
                value={storeInfo.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Website</label>
              <input
                type="text"
                name="website"
                value={storeInfo.website}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <label className='text-[#737373] mb-2 text-sm'>Fax</label>
              <input
                type="text"
                name="fax"
                value={storeInfo.fax}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 mt-6">
            <label className='text-[#737373] text-sm'>Active</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={storeInfo.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </form>
        <div className="col-span-3 justify-center flex mt-8">
          <button onClick={handleButtonClick} className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">Create Store</button>
        </div>
        {freePlanActivated && (
          <div className="mt-4 text-green-600">
           You are using free tier!
          </div>
        )}
      </div>
    </>
  );
};

export default CreateStore;
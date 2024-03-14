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
  };

  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);

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
    const { name, value } = e.target;
    setStoreInfo({
      ...storeInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeInfo),
      });

      if (response.ok) {
        console.log('Store created successfully');
        setStoreInfo(initialStoreInfo);
      } else {
        console.error('Failed to create store');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <>
  <div className="px-12 py-12 max-w-[1440px] mx-auto">
    <h2 className="mb-8 font-bold text-xl">Create a Store</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
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
          <label className='text-[#737373] mb-2 text-sm'>Search Address, Suburb, or Landmark</label>
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
      <div className="col-span-3 justify-center flex">
        <button type="submit" className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">Create Store</button>
      </div>
    </form>
  </div>
  </>
  );
};

export default CreateStore;
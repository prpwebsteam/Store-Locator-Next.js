'use client'
import React, { useState } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

const CreateStore = () => {
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
  <Header2 />
  <div className="px-12 py-12 max-w-[1440px] mx-auto">
    <h2 className="mb-8 font-bold text-xl">Create a Store</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <div className="flex flex-col">
          <label>Name*</label>
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
          <label>Search Address, Suburb, or Landmark</label>
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
          <label>Address Line 1</label>
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
          <label>Address Line 2</label>
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
          <label>City</label>
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
          <label>State / Province</label>
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
          <label>Country</label>
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
          <label>Postal / ZIP code</label>
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
          <label>Latitude</label>
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
          <label>Longitude</label>
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
          <label>Description</label>
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
          <label>Service Options</label>
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
          <label>Hours</label>
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
          <label>Phone</label>
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
          <label>Email</label>
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
          <label>Website</label>
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
          <label>Fax</label>
          <input
            type="text"
            name="fax"
            value={storeInfo.fax}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="col-span-2">
        <button type="submit" className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">Create Store</button>
      </div>
    </form>
  </div>
  <Footer />
  </>
  );
};

export default CreateStore;
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

const editStore = () => {
  const router = useRouter();
  const queryString = window?.location?.href?.split('?')[1];
  const storeId = queryString?.split('=')[0];
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
    isActive: false,
  };
  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    router.refresh();
    const fetchStoreDetails = async () => {
      if (!storeId) return; // Exit if no storeId

      try {
        const response = await fetch(`/api/getStores?storeId=${storeId}`);
        if (response.ok) {
          const data = await response.json();
          setStoreInfo(data);
        } else {
          console.error('Failed to fetch store details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStoreInfo({
      ...storeInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let success_msg = document.getElementById("update-msg");

    try {
      const response = await fetch(`/api/updateStore?storeId=${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeInfo),
      });

      if (response.ok) {
        success_msg.innerHTML = 'Store updated successfully';
        setUpdateSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        const data = await response.json();
        setUpdateError(data.message || 'Failed to update store');
        console.error('Failed to update store:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setUpdateError('An error occurred while updating the store');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header2 />
      <div className="sm:px-12 py-12 px-4 max-w-[1440px] mx-auto">
        <h2 className="mb-8 font-bold text-xl">Edit Store</h2>
        <form onSubmit={handleSubmit} className="sm:grid sm:grid-cols-3 gap-8 flex flex-col">
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
          <div className="flex flex-row items-center gap-4 mt-6 col-span-1">
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
          <div className="col-span-2">
            <button type="submit" className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">
              {isSubmitting ? 'Updating...' : 'Update Store'}
            </button>
          </div>
        </form>
        <div id="update-msg"></div>
      </div>
      <Footer />
    </>
  );
};

export default editStore;
import React, { useEffect, useState } from 'react';

function Account() {
  const [userDetails, setUserDetails] = useState({
    email: '',
});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, "bhairav")
    if (user) {
      setUserDetails({
        ...userDetails,
        email: user.email,
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col pt-10 overflow-hidden px-8">
          <div className='pb-8'>
            <p className='text-[24px] font-semibold'>Plan details</p>
            <p>Manage or update your subscription plan.</p>
          </div>
          <div class="mb-8 p-6 bg-white rounded-lg w-full">
            <h2 class="text-lg font-semibold mb-4">Account Status</h2>
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <label class="text-sm font-medium text-gray-700">Plan Name</label>
                    <input type="text" value="Pro" class="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" disabled />
                </div>

                <div class="flex flex-col items-center">
                    <label class="text-sm font-medium text-gray-700">Status</label>
                    <span class="flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0046B5] text-white">
                        &#9679; Active
                    </span>
                </div>

                <div class="flex flex-col items-center">
                    <label class="text-sm font-medium text-gray-700">Payment</label>
                    <span class="flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#04B500] text-white">
                        &#9679; Paid
                    </span>
                </div>

                <button class="bg-transparent hover:bg-[#0046B5] text-[#0046B5] hover:text-white border border-[#0046B5] font-bold py-2 px-4 rounded-md">
                    Upgrade Plan
                </button>
            </div>
        </div>
      </div>
      <div class="bg-white rounded-lg mx-8 p-6 w-64">
        <div class="text-sm mb-2 text-gray-700">Current Plan: PRO</div>
        <div class="text-black font-bold text-lg mb-6">$39.99/Month</div>
        <div class="text-sm text-gray-600">
            <ul>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 5000 Stores
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Spreadsheet Bulk import/export
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    5 Layouts
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    6 Map Themes
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Search and filters
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom map icon
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Edit from theme customizer
                </li>
                <li class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Search Nearby Stores
                </li>
            </ul>
        </div>
    </div>
    </>
  );
}

export default Account;
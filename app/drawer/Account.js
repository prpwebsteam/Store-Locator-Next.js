import React, { useEffect, useState } from 'react';

function Account() {
    const [userDetails, setUserDetails] = useState({
        email: '',
    });
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch('/api/getSubscriptions');
                if (!response.ok) {
                    throw new Error('Failed to fetch subscriptions');
                }
                const data = await response.json();
                setSubscriptions(data.subscriptions);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserDetails({
                ...userDetails,
                email: user.email,
            });
        }
    }, []);

    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const accountStatus = activeSubscriptions.length > 0 ? 'Active' : 'Inactive';

    return (
        <>
            <div className="flex flex-col overflow-hidden px-5">
                <div className='pb-8'>
                    <p className='text-[24px] font-semibold'>Plan details</p>
                    <p>Manage or update your subscription plan.</p>
                </div>
                <div className="mb-8 p-6 bg-white rounded-lg w-full">
                    <h2 className="text-lg font-semibold mb-4">Account Status</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Active Plans</label>
                            {activeSubscriptions.length > 0 ? (
                                <select
                                    value={activeSubscriptions[0].title}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                >
                                    {activeSubscriptions.map(sub => (
                                        <option key={sub.subscriptionId} value={sub.title}>
                                            {sub.title}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value="No active plan"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    disabled
                                />
                            )}
                        </div>

                        <div className="flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700">Status</label>
                            <span className={`flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${accountStatus === 'Active' ? 'bg-[#0046B5] text-white' : 'bg-red-500 text-white'}`}>
                                &#9679; {accountStatus}
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <label className="text-sm font-medium text-gray-700">Payment</label>
                            <span className="flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#04B500] text-white">
                                &#9679; Paid
                            </span>
                        </div>

                        {activeSubscriptions.length === 0 && (
                            <button className="bg-transparent hover:bg-[#0046B5] text-[#0046B5] hover:text-white border border-[#0046B5] font-bold py-2 px-4 rounded-md">
                                Upgrade Plan
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {activeSubscriptions.length > 0 && (
                <div className="bg-white rounded-lg mx-5 p-6 w-64">
                    <div className="text-sm mb-2 text-gray-700">Current Plan: {activeSubscriptions[0].title}</div>
                    <div className="text-black font-bold text-lg mb-6">{activeSubscriptions[0].price}</div>
                    <div className="text-sm text-gray-600">
                        <ul>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Up to 5000 Stores
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Spreadsheet Bulk import/export
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                5 Layouts
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                6 Map Themes
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Search and filters
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Custom map icon
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Edit from theme customizer
                            </li>
                            <li className="flex items-center mb-2">
                                <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Search Nearby Stores
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default Account;
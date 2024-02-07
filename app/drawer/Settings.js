'use client'
import React from 'react';

const Settings = () => {
  const videoSrc = "https://www.example.com/path-to-your-video.mp4";
  
  return (
    <div className="flex items-center flex-col p-5 gap-8">
      <div className='w-[100%] flex flex-row gap-4 justify-between shadow-xl px-8 py-8 rounded-lg'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-lg">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold">Step 1. Get your Google Api key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes.</p>
            <button className="px-6 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between shadow-xl px-8 py-8 rounded-lg'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-lg">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold">Step 2. Add PW Store Locator to your theme</h2>
            <p className="mt-4 mb-8">We have created a store locator page for you</p>
            <button className="px-6 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between shadow-xl px-8 py-8 rounded-lg'>
        <div className="flex-1">
            <h2 className="text-2xl font-bold">API Key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes. Essentially, the API key serves as the means through which your store can request information from Google, such as address lookup.</p>
        </div>
        
        <div className="flex-1 text-left shadow-xl p-4 rounded-lg">
            <h2 className="text-2xl font-bold">Google Maps API Key</h2>
            <p className="mt-4 mb-8">Follow our instructions for creating a Google Api key, then paste your key above. If you run into trouble, please get in touch for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

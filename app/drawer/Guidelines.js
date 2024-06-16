'use client'
import React from 'react';

const Guidelines = () => {
  const videoSrc = "https://www.example.com/path-to-your-video.mp4";
  
  return (
    <>
    <div className='px-5'>
      <p className='text-[24px] font-semibold'>Guidelines</p>
      <p>Use this personalized guide to get your store locator up and running.</p>
    </div>
    <div className="flex items-center flex-col p-5 gap-8">
      <div className='w-[100%] flex flex-row gap-4 justify-between bg-white px-8 py-8 rounded-md'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-md">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <p className='text-[#505050]'>STEP 1</p>
            <h2 className="text-2xl font-semibold">Get your Google Api key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes.</p>
            <button className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between bg-white px-8 py-8 rounded-md'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-md">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <p className='text-[#505050]'>STEP 2</p>
            <h2 className="text-2xl font-semibold">Add PW Store Locator to your theme</h2>
            <p className="mt-4 mb-8">We have created a store locator page for you</p>
            <button className="bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between bg-white px-8 py-8 rounded-md'>
        <div className="flex-1">
            <h2 className="text-2xl font-bold">API Key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes. Essentially, the API key serves as the means through which your store can request information from Google, such as address lookup.</p>
        </div>
        
        <div className="flex-1 text-left shadow-xl p-4 rounded-md">
            <h2 className="text-2xl font-bold">Google Maps API Key</h2>
            <p className="mt-4 mb-8">Follow our instructions for creating a Google Api key, then paste your key above. If you run into trouble, please get in touch for assistance.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Guidelines;

'use client'
import React from 'react';

const Instructions = () => {
  const videoSrc = "https://www.example.com/path-to-your-video.mp4";
  
  return (
    <>
    <div className='px-5'>
      <p className='text-[24px] font-semibold'>Instructions</p>
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
            <button className="px-6 py-2 text-lg bg-[#0046B5] text-white rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
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
            <button className="px-6 py-2 text-lg bg-[#0046B5] text-white rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between bg-white px-8 py-8 rounded-md'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-md">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <p className='text-[#505050]'>STEP 3</p>
            <h2 className="text-2xl font-semibold">Get your Google Api key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes.</p>
            <button className="px-6 py-2 text-lg bg-[#0046B5] text-white rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
        </div>
      </div>
      <div className='w-[100%] flex flex-row gap-4 justify-between bg-white px-8 py-8 rounded-md'>
        <div className="flex-1">
            <video src={videoSrc} controls className="w-full max-w-md h-auto rounded-md">
            Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="flex-1 text-left">
            <p className='text-[#505050]'>STEP 4</p>
            <h2 className="text-2xl font-semibold">Get your Google Api key</h2>
            <p className="mt-4 mb-8">To enable the Store Locator functionality, you need to obtain a Google Maps API key. The good news is that these keys are available for free and can be set up within a few minutes.</p>
            <button className="px-6 py-2 text-lg bg-[#0046B5] text-white rounded-md hover:bg-blue-700 transition-colors duration-150 ease-in-out">Watch Now</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Instructions;

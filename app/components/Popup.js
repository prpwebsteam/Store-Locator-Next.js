// components/Popup.js
'use client'
import React, { useState } from 'react';
import Clipboard from '../assests/clipboard.png';
import Image from 'next/image';

const Popup = ({ show, onClose, iframeCode, scriptCode }) => {
  const [activeTab, setActiveTab] = useState('iframe');
  const [buttonText, setButtonText] = useState('Copy to Clipboard');

  if (!show) {
    return null;
  }

  const handleCopy = () => {
    const textToCopy = activeTab === 'iframe' ? iframeCode : scriptCode;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy to Clipboard');
      }, 2000); 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Embed Code</h2>
          <button onClick={onClose} className="text-black text-3xl absolute top-[5px] right-[15px]">&times;</button>
        </div>
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('iframe')}
            className={`py-2 px-4 ${activeTab === 'iframe' ? 'border-b-2 border-[#0040A9] text-[#0040A9]' : 'text-black'}`}
          >
            Iframe
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`py-2 px-4 ${activeTab === 'script' ? 'border-b-2 border-[#0040A9] text-[#0040A9]' : 'text-black'}`}
          >
            Script
          </button>
        </div>
        {activeTab === 'iframe' ? (
          <textarea
            className="w-full p-2 border rounded-md"
            rows="5"
            readOnly
            value={iframeCode}
          />
        ) : (
          <textarea
            className="w-full p-2 border rounded-md"
            rows="5"
            readOnly
            value={scriptCode}
          />
        )}
        <div className="bg-[#0040A9] text-white items-center flex flex-row gap-2 text-sm px-4 py-2 rounded w-fit mt-4">
          <Image
            src={Clipboard}
            alt="Clipboard"
            width={20}
            height={20}
          />
          <button
            onClick={handleCopy}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
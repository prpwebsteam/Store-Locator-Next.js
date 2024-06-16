// pages/dashboard.js
'use client'
import React, { useEffect, useState } from 'react';
import PlansContent from '../drawer/PlansContent';
import StoreList from '../drawer/StoreList';
import Guidelines from '../drawer/Guidelines';
import Instructions from '../drawer/Instructions';
import { useRouter, useSearchParams } from 'next/navigation';
import Account from '../drawer/Account';
import Settings from '../drawer/Settings';
import ImportExport from '../drawer/Import-Export';
import { IoStorefrontOutline, IoSettingsOutline } from "react-icons/io5";
import { PiNotepadLight } from "react-icons/pi";
import { MdOutlineImportantDevices, MdOutlineIntegrationInstructions } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";
import Image from 'next/image';
import Logo from '../assests/Logo.png';
import { PiSignOutFill } from "react-icons/pi";
import Popup from '../components/Popup';
import Code from '../assests/coding.png';
import StripeSubscription from '../components/StripeSubscription';

function Dashboard() {
  const [selectedContent, setSelectedContent] = useState('Stores');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [iframeCode, setIframeCode] = useState('');
  const [scriptCode, setScriptCode] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [priceId, setPriceId] = useState('');

  const handleLogout = async () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
  };

  const selectContent = (content) => {
    setSelectedContent(content);
    router.push(`/dashboard?content=${content}`, undefined, { shallow: true });
  };

  const selectContentWithData = (title, price, priceId, content) => {
    setSelectedContent(content);
    setTitle(title);
    setPrice(price);
    setPriceId(priceId);
  };

  const generateEmbedCode = () => {
    const currentUrl = window.location.origin;
    const embedUrl = `${currentUrl}/embed`;

    const iframe = `<iframe src="${embedUrl}" width="600" height="400" frameborder="0" style="border:0; width: 100%; height: 100vh;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`;
    setIframeCode(iframe);

    const script = `<div id="store-locator"></div>
    <script>
      (function() {
        var iframe = document.createElement('iframe');
        iframe.src = '${embedUrl}';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.allowFullscreen = true;
        iframe.ariaHidden = false;
        iframe.tabIndex = 0;
        document.getElementById('store-locator').appendChild(iframe);
      })();
    </script>`;
    setScriptCode(script);

    setShowPopup(true);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin');
      return;
    }

    const queryContent = searchParams.get('content');
    if (queryContent) {
      setSelectedContent(queryContent);
    } else {
      setSelectedContent('Stores');
      router.push(`/dashboard?content=Stores`, undefined, { shallow: true });
    }
  }, [router, searchParams]);

  return (
    <>
      <div className='grid' style={{ gridTemplateColumns: '30% 70%', height: '100vh' }}>
        <div
          className='menu-div'
          style={{
            width: '100%',
            position: 'relative',
            top: '0',
            backgroundColor: '#0046B5',
            overflowY: 'scroll',
            transition: '0.5s',
            paddingTop: '40px',
            color: 'white',
          }}
        >
          <div className='ml-12 mb-4 cursor-pointer'>
            <a href='/' className='text-[32px] text-white font-bold'>
              <Image src={Logo} alt="Logo" width={60} height={60} />
            </a>
          </div>
          <div className='flex flex-col justify-between h-[87vh]'>
            <div>
              <a
                onClick={() => selectContent('Stores')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Stores' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <IoStorefrontOutline className='w-7 h-[25px]' />
                Stores
              </a>
              <a
                onClick={() => selectContent('Guidelines')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Guidelines' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <PiNotepadLight className='w-7 h-[25px]' />
                Guidelines
              </a>
              <a
                onClick={() => selectContent('ImportExport')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'ImportExport' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <MdOutlineImportantDevices className='w-7 h-[25px]' />
                Import/Export
              </a>
              <a
                onClick={() => selectContent('Account')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Account' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <FaRegUser className='w-7 h-[25px]' />
                Account
              </a>
              <a
                onClick={() => selectContent('Plans')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Plans' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <GrPlan className='w-7 h-[25px]' />
                Plans
              </a>
              <a
                onClick={() => selectContent('Instructions')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Instructions' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <MdOutlineIntegrationInstructions className='w-7 h-[25px]' />
                Instructions
              </a>
              <a
                onClick={() => selectContent('Settings')}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Settings' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <IoSettingsOutline className='w-7 h-[25px]' />
                Settings
              </a>
            </div>
            <div>
              <a
                onClick={handleLogout}
                className={`flex flex-row gap-2 items-center ml-12 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer transition-colors duration-300`}
              >
                <PiSignOutFill className='w-7 h-[25px]' />
                Signout
              </a>
            </div>
          </div>
        </div>

        <div className="w-full scroll-bar min-h-screen transition-margin duration-300 ease-in-out">
          <div className='bg-white sticky max-h-28 h-full flex items-center px-10 justify-between'>
            <div className='flex flex-row items-center gap-2 px-4 h-10 rounded-md bg-[#0046B5] text-white font-bold py-[5px] md:py-2 text-sm border'>
              <button
                onClick={generateEmbedCode}
              >
                Generate Embedded Code
              </button>
              <Image
                src={Code}
                alt="Coding"
                height={20}
              />
            </div>
          </div>
          <div className="bg-[#F2F2F7] w-full py-12 px-5 min-h-[100vh]">
            {selectedContent === 'Plans' && <PlansContent selectContentWithData={selectContentWithData} />}
            {selectedContent === 'Stores' && <StoreList />}
            {selectedContent === 'Guidelines' && <Guidelines />}
            {selectedContent === 'Instructions' && <Instructions />}
            {selectedContent === 'ImportExport' && <ImportExport />}
            {selectedContent === 'Account' && <Account />}
            {selectedContent === 'Settings' && <Settings />}
            {selectedContent === 'Subscribe' && <StripeSubscription title={title} price={price} priceId={priceId} />}
          </div>
        </div>
      </div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} iframeCode={iframeCode} scriptCode={scriptCode} /> {/* Display popup */}
    </>
  );
}

export default Dashboard;
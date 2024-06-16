'use client'
import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoStorefrontOutline, IoSettingsOutline } from "react-icons/io5";
import { PiNotepadLight } from "react-icons/pi";
import { MdOutlineImportantDevices, MdOutlineIntegrationInstructions } from "react-icons/md";
import { FaRegUser, FaBars } from "react-icons/fa6";
import { GrPlan } from "react-icons/gr";
import Image from 'next/image';
import Logo from '../assests/Logo.png';
import { PiSignOutFill } from "react-icons/pi";
import Popup from '../components/Popup';
import Code from '../assests/coding.png';
import StripeSubscription from '../components/StripeSubscription';

// Dynamic imports for heavy components
const PlansContent = dynamic(() => import('../drawer/PlansContent'), { suspense: true });
const StoreList = dynamic(() => import('../drawer/StoreList'), { suspense: true });
const Guidelines = dynamic(() => import('../drawer/Guidelines'), { suspense: true });
const Instructions = dynamic(() => import('../drawer/Instructions'), { suspense: true });
const Account = dynamic(() => import('../drawer/Account'), { suspense: true });
const Settings = dynamic(() => import('../drawer/Settings'), { suspense: true });
const ImportExport = dynamic(() => import('../drawer/Import-Export'), { suspense: true });

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
  };

  const selectContent = (content) => {
    setSelectedContent(content);
    router.push(`/dashboard?content=${content}`, undefined, { shallow: true });
    setIsDrawerOpen(false); 
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
      <div className='grid grid-cols-1 lg:grid-cols-6 h-full'>
        <div
          className={`menu-div ${isDrawerOpen ? 'open' : ''} md:col-span-1`}
          style={{
            backgroundColor: '#0046B5',
            overflowY: 'scroll',
            transition: '0.5s',
            paddingTop: '40px',
            color: 'white',
            height: '100vh',
          }}
        >
          <div className='pl-2 pr-4 mb-4 items-center cursor-pointer flex flex-row justify-between'>
            <a href='/' className='text-[32px] text-white font-bold'>
              <Image src={Logo} alt="Logo" width={60} height={60} />
            </a>
            <p className='text-[24px] lg:hidden' onClick={() => setIsDrawerOpen(!isDrawerOpen)}>X</p>
          </div>
          <div className='flex flex-col justify-between h-[87vh]'>
            <div>
              <a
                onClick={() => selectContent('Stores')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Stores' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <IoStorefrontOutline className='w-7 h-[25px]' />
                Stores
              </a>
              <a
                onClick={() => selectContent('Guidelines')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Guidelines' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <PiNotepadLight className='w-7 h-[25px]' />
                Guidelines
              </a>
              <a
                onClick={() => selectContent('ImportExport')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'ImportExport' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <MdOutlineImportantDevices className='w-7 h-[25px]' />
                Import/Export
              </a>
              <a
                onClick={() => selectContent('Account')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Account' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <FaRegUser className='w-7 h-[25px]' />
                Account
              </a>
              <a
                onClick={() => selectContent('Plans')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Plans' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <GrPlan className='w-7 h-[25px]' />
                Plans
              </a>
              <a
                onClick={() => selectContent('Instructions')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Instructions' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <MdOutlineIntegrationInstructions className='w-7 h-[25px]' />
                Instructions
              </a>
              <a
                onClick={() => selectContent('Settings')}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer ${selectedContent === 'Settings' ? 'bg-[#F2F2F7] text-[#0046B5]' : 'text-white '} transition-colors duration-300`}
              >
                <IoSettingsOutline className='w-7 h-[25px]' />
                Settings
              </a>
            </div>
            <div>
              <a
                onClick={handleLogout}
                className={`flex flex-row gap-2 items-center ml-2 my-1 rounded-tl-lg rounded-bl-lg py-4 font-[500] px-4 cursor-pointer transition-colors duration-300`}
              >
                <PiSignOutFill className='w-7 h-[25px]' />
                Signout
              </a>
            </div>
          </div>
        </div>

        <div className="w-full max-h-[100vh] overflow-y-scroll transition-margin duration-300 ease-in-out md:col-span-5">
          <div className='bg-white sticky max-h-28 h-full flex items-center px-5 lg:px-10 justify-between'>
            <div className='flex lg:hidden flex-row items-center gap-2 h-10 md:py-2 text-sm border bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black'>
              <FaBars onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="w-7 h-[25px] cursor-pointer" />
            </div>
            <div className='flex flex-row items-center gap-2 h-10 md:py-2 text-sm border bg-[#0040A9] font-bold text-white py-2 px-4 rounded hover:bg-[#e6edf8] hover:text-black'>
              <button onClick={generateEmbedCode}>
                Generate Embedded Code
              </button>
              <Image src={Code} alt="Coding" height={20} />
            </div>
          </div>
          <div className="bg-[#F2F2F7] w-full py-12 px-0 lg:px-5 min-h-[100vh]">
            <Suspense fallback={<div>Loading...</div>}>
              {selectedContent === 'Plans' && <PlansContent selectContentWithData={selectContentWithData} />}
              {selectedContent === 'Stores' && <StoreList />}
              {selectedContent === 'Guidelines' && <Guidelines />}
              {selectedContent === 'Instructions' && <Instructions />}
              {selectedContent === 'ImportExport' && <ImportExport />}
              {selectedContent === 'Account' && <Account />}
              {selectedContent === 'Settings' && <Settings />}
              {selectedContent === 'Subscribe' && <StripeSubscription title={title} price={price} priceId={priceId} />}
            </Suspense>
          </div>
        </div>
      </div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} iframeCode={iframeCode} scriptCode={scriptCode} /> {/* Display popup */}
      <style jsx>{`
     
        @media (max-width: 1020px) {
          .menu-div {
            position: fixed;
            top: 0;
            left: -100%;
            width: 30%;
            height: 100%;
            z-index: 1000;
            transition: left 0.3s ease;
          }
          .menu-div.open {
            left: 0;
          }
        }

        @media (max-width: 430px) {
          .menu-div {
            width: 55%;
          }
        }
        
      `}</style>
    </>
  );
}

export default Dashboard;
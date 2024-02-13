'use client'
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import PlansContent from '../drawer/PlansContent';
import StoreList from '../drawer/StoreList';
import Settings from '../drawer/Settings';
import Instructions from '../drawer/Instructions';
import { useRouter } from 'next/navigation';
import Account from '../drawer/Account';
import ImportExport from '../drawer/Import-Export';

function Dashboard() {
  const [selectedContent, setSelectedContent] = useState('Stores');
  const router = useRouter();

  const selectContent = (content) => {
    setSelectedContent(content);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/signin'); 
    }

    const queryContent = router.query?.content;
    if (queryContent) {
      setSelectedContent(queryContent);
    }
  }, [router]);

  return (
    <>
    <Header2 />
      <div className='grid' style={{ gridTemplateColumns: '1fr 3fr', height: '100vh' }}>
          <div
            style={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              zIndex: '1',
              top: '0', 
              backgroundColor: '#e6edf8',
              overflowY: 'hidden',
              transition: '0.5s',
              paddingTop: '40px',
              color: 'white',
            }}
          >
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Stores')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Stores
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Settings')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Settings
            </a>

            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('ImportExport')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Import/Export
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Account')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Account
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Plans')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Plans
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '10px 8px 10px 100px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Instructions')} 
              className="hover:bg-[#add8e6] transition-colors duration-300 hover:text-white" 
            >
              Instructions
            </a>
          </div>

          <div className="max-w-[1240px] scroll-bar min-h-screen transition-margin duration-300 ease-in-out">
            <div className="w-[100%] mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
              {selectedContent === 'Plans' && <PlansContent />}
              {selectedContent === 'Stores' && <StoreList />}
              {selectedContent === 'Settings' && <Settings />}
              {selectedContent === 'Instructions' && <Instructions />}
              {selectedContent === 'ImportExport' && <ImportExport />}
              {selectedContent === 'Account' && <Account />}
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Dashboard;
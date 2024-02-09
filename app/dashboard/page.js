'use client'
import React, { useState } from 'react';
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
  const [selectedContent, setSelectedContent] = useState(null);
  const router = useRouter();

  const selectContent = (content) => {
    setSelectedContent(content);
  };

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
              paddingLeft: '50px',
              color: 'white',
            }}
          >
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Stores')} 
            >
              Stores
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Settings')} 
            >
              Settings
            </a>

            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('ImportExport')} 
            >
              Import/Export
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Account')} 
            >
              Account
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Plans')} 
            >
              Plans
            </a>
            <a
              style={{ color: '#000', 'font-weight': '700', padding: '8px 8px 8px 32px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
              onClick={() => selectContent('Instructions')} 
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
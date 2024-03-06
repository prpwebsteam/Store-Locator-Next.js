'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BannerImg from '../assests/hero.png'

export default function Homepage() {
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
      setWindowWidth(window.innerWidth);

      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleWindowResize);

      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    const backgroundStyle = {
      'background-color': '#0046B5', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: 'auto',
      height: 'auto',
      padding: windowWidth >= 768 ? '100px 10px' : '100px 10px',
      position: 'relative',
      display: 'flex',
      'justify-content': 'center',
    };

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    }, []);

    return (
      <div className='overflow-y-hidden bg-[#fff] w-full' style={backgroundStyle}>
          <div className="landing-page page-width">
              <div className="content-overlay flex justify-center flex-col md:flex-row text-center w-full md:px-8 pt-12 md:pt-24">
                      <div className="banner-content mx-auto p-4 w-full md:w-[57%]">
                          <h1 className="text-white text-left text-[32px] md:text-[4rem] leading-[1.2] mb-8 font-bold">A Beautiful Store Locator App, Customized For Your Website.</h1>
                          <p className="text-white text-left text-[18px] mb-8 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <div className='flex justify-start'>
                            <a href='/signup' className='bg-transparent hover:bg-white font-semibold text-white hover:text-[#0046B5] px-4 py-2 border border-white hover:border-[#0046B5] rounded-lg'>Book a demo</a>
                          </div>
                      </div>
                      <div className="banner-content mx-auto p-4 w-full md:w-[43%]">
                        <Image src={BannerImg} />
                      </div>
              </div>
          </div>
      </div>
    );
}
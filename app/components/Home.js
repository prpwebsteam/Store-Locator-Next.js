'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import BannerImg from '../assests/herobanner.jpg'

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
      background: "linear-gradient(135deg, #0046B5 50%, #6699CC 100%)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: 'auto',
      height: 'auto',
      padding: windowWidth >= 768 ? '100px 10px' : '100px 10px',
      position: 'relative',
    };

    // Only run on the client-side
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    }, []);

    return (
      <div className='overflow-y-hidden bg-[#fff]'>
          <div className="landing-page bg-transparent" style={backgroundStyle}>
              <div className="content-overlay text-center">
                  <header className="banner">
                      <div className="banner-content max-w-[1440px] mx-auto p-4">
                          <h1 className="text-white pt-16 text-[32px] md:text-[4.5rem] font-bold">Welcome to Our StoreLocator</h1>
                          <p className="text-white text-[24px] mb-12 font-normal">Your go-to destination for all your needs.</p>
                      </div>
                  </header>
              </div>
              <div className="relative max-w-screen-lg px-4 mx-auto lg:px-0" data-hero-video="">
                  <iframe className="hidden w-full -mb-10 rounded-lg shadow-lg aspect-video" data-src="https://www.youtube-nocookie.com/embed/TebnpN3Tacg?rel=0&amp;autoplay=1&amp;showinfo=0&amp;controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="">
                  </iframe>

                  <div className="absolute inset-0" data-play="">
                          <Image src={BannerImg} layout="fill" objectFit="cover" alt="Banner Image" />
                          <div className="bg-[#0046B5] flex items-center px-6 py-4 m-auto text-white transition-all rounded-full shadow-lg cursor-pointer bg-purple shadow-purple/20 hover:shadow-xl hover:-translate-y-1 motion-safe:animate-fade-in">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg> 00:45 Intro
                          
                      </div>
                  </div>
                  <div className="-mb-10 aspect-[945/552]" data-hero-image="">
                    <picture>
                        <source srcSet="
                            https://spp.co/images/screenshots/3000/orders.webp 3000w,
                            https://spp.co/images/screenshots/2000/orders.webp 2000w,
                            https://spp.co/images/screenshots/1500/orders.webp 1500w,
                            https://spp.co/images/screenshots/1000/orders.webp 1000w,
                            https://spp.co/images/screenshots/700/orders.webp 700w,
                            https://spp.co/images/screenshots/400/orders.webp 400w" sizes="(min-width: 1024px) 1024px, calc(100vw - 2rem)" type="image/webp" />
                        <img src="https://spp.co/images/screenshots/orders.png" className="h-auto w-full rounded-lg shadow-lg" alt="All your orders inside SPP" title="Sell and deliver productized services from one place" />
                    </picture>
                </div>
              </div>
          </div>
      </div>
    );
}
import React from 'react';
import aboutImg from '../assests/About.png'
import Image from 'next/image';

const IntroSection = () => {
  return (
    <section id="about-card" className="px-4 overflow-x-auto w-full flex justify-center items-center">
      <div className="content-overlay flex page-width justify-center flex-col md:flex-row-reverse text-center w-full py-12 md:pt-24">
        <div className="banner-content mx-auto p-4 w-full md:w-[45%]">
          <h1 className="text-black text-left text-[28px] md:text-[3.5rem] leading-[1.2] mb-8 font-bold">Works on all website platforms & devices.</h1>
          <p className="text-black text-left text-[18px] mb-12 font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="banner-content mx-auto p-4 w-full md:w-[55%]">
          <Image src={aboutImg} />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
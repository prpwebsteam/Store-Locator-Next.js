// owner.js
import Image from 'next/image';
import React from 'react';
import CEO from '../assests/cg.png'

const Owner = () => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-screen-lg mx-auto overflow-hidden rounded-lg shadow-xl" style={{ backgroundImage: "linear-gradient(135deg, #0046B5 50%, #6699CC 100%)" }}>
        <div className="grid gap-0 sm:grid-cols-10">
          <div className="flex items-center py-16 sm:col-start-1 sm:col-end-8 md:pl-20">
            <div className="px-8">
              <h1 className='mb-4 font-bold text-white md:text-4xl'>CEO Speaks</h1>
              <blockquote className="mb-8 italic text-white md:text-xl">
              “Thinking of managing better? With
              PW Store Locator, <br/>don't wait — begin.”
              </blockquote>

              <div className="mb-4">
                <a href="/" target="_blank" rel="noopener noreferrer" className="block font-bold text-white transition-transform hover:text-blue-50 hover:-translate-y-0.5">Chitragupt Pandey</a>
              </div>

              <div className="mb-4 text-sm text-white md:text-base">
                CEO, PW Store Locator
              </div>
            </div>
          </div>
          <div className="flex items-end sm:col-start-8 sm:col-end-11">
            <Image
              src={CEO}
              alt="CG Pandey"
              width={250} 
              height={300} 
              unoptimized={true} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Owner;
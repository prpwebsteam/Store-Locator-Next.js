'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Attendance1 from '../assests/time_attendance.png'
import Attendance3 from '../assests/integrations.png'
import Attendance4 from '../assests/all_in_one.png'


const tabs = [
    { name: 'Time & Attendance', 
      content: (
        <div className="relative bg-[#F2F7FF] pt-[18px] lg:pt-[32px] px-5 lg:px-0">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap gap-4 sm:gap-8 lg:gap-0 align-middle">
              <div className="w-full px-4 lg:w-6/12">
                <div className="hero-content">
                  <h2 className="mb-4 font-bold leading-snug text-dark w-10/12 text-[42px] lg:text-[40px] xl:text-[42px] text-left"
                  >
                    Time and Attendance
                  </h2>
                  <p className='text-left'>
                  Face Recognition and Time based attendance to reduce the amount of manual work and make it seamless.
                  </p>
                  <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
                    <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Time Based attendance</span><br/>Allows the attendance based on actual hours worked in comparison to existing systems of check in and check out.</li>
                    <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Informative Attendance Dashboard</span><br/>Helps to track everything at one place.</li>
                    <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Optional Mobile App feature</span><br/>Helps to automate attendance using Face Recognition.</li>
                  </ul>
                </div>
              </div>
              <div className="hidden  lg:block lg:w-0/12"></div>
              <div className="w-full px-4 lg:w-6/12">
                  <div className="relative z-10 inline-block pt-2 bg-[#E6EDF8] px-2 py-2 rounded-[24px]">
                    <Image
                      src={Attendance1}
                      alt="hero"
                      width={500} 
                      height={300} 
                      className="rounded-[20px]"
                    />
                  </div>
              </div>
            </div>
          </div>
      </div>
      ),
      videoUrl: ''
    },
    { name: 'Productivity', 
      content: (
      <div className="relative bg-[#F2F7FF] pt-[18px] lg:pt-[32px] px-5">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap gap-4 sm:gap-8 lg:gap-0 align-middle">
            <div className="w-full px-4 lg:w-6/12">
              <div className="hero-content">
                <h2 className="mb-4 font-bold leading-snug text-dark w-10/12 text-[42px] lg:text-[40px] xl:text-[42px] text-left"
                >
                  Productivity
                </h2>
                <p className='text-left'>
                Streamlining Tasks and Workflow to Enhance Efficiency and Output.
                </p>
                <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Focused Task Management</span><br/>Centralizes all tasks in one interface, prioritizing according to deadlines and importance to maximize efficiency in task completion.</li>
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Performance Analytics</span><br/>Gathers data on work patterns and productivity levels, offering insights to improve individual and team performance.</li>
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Automated Workflow Solutions</span><br/>Reduces repetitive manual processes through automation, allowing for more time to be spent on strategic, high-value tasks.</li>
                </ul>
              </div>
            </div>
            <div className="hidden  lg:block lg:w-0/12"></div>
            <div className="w-full px-4 lg:w-6/12">
                <div className="relative z-10 inline-block pt-2 bg-[#E6EDF8] px-2 py-2 rounded-[24px]">
                    <Image
                      src={Attendance3}
                      alt="hero"
                      width={500} 
                      height={300} 
                      className="rounded-[20px]"
                    />
                </div>
            </div>
          </div>
        </div>
    </div>
    ),
    videoUrl: ''
  },
    { name: 'All In one Place', 
      content: (
      <div className="relative bg-[#F2F7FF] pt-[18px] lg:pt-[32px] px-5">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap gap-4 sm:gap-8 lg:gap-0 align-middle">
            <div className="w-full px-4 lg:w-6/12">
              <div className="hero-content">
                <h2 className="mb-4 font-bold leading-snug text-dark w-10/12 text-[42px] lg:text-[40px] xl:text-[42px] text-left"
                >
                  All in One Place
                </h2>
                <p className='text-left'>
                Consolidated Management for Attendance, Payroll, and Time Tracking.
                </p>
                <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Comprehensive Attendance System</span><br/>Integrates facial recognition and time-based tracking to record attendance accurately, reducing manual input and errors.</li>
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Streamlined Payroll Processing</span><br/>Automates calculations and consolidates pay-related data, ensuring timely and accurate payroll execution.</li>
                  <li className="text-[#292929]"><span className='text-[#0046B5] font-semibold'>Efficient Time Tracking</span><br/>Captures real-time work hours with intuitive time tracking, providing clear insights into team productivity.</li>
                </ul>
              </div>
            </div>
            <div className="hidden  lg:block lg:w-0/12"></div>
            <div className="w-full px-4 lg:w-6/12">
                <div className="relative z-10 inline-block pt-2 bg-[#E6EDF8] px-2 py-2 rounded-[24px]">
                    <Image
                      src={Attendance4}
                      alt="hero"
                      width={500} 
                      height={300} 
                      className="rounded-[20px]"
                    />
                </div>
            </div>
          </div>
        </div>
    </div>
    ),
    videoUrl: ''
  },
  ];

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [state, setState] = useState(null);

  return (
    <div id="tabs" className='hidden lg:block'>
        <section className="lg:pt-[65px] pt-[58px] p-4 pb-[58px] lg:pb-[65px] mx-auto flex justify-center bg-[#F2F7FF] py-20">
            <div className="page-width flex flex-col items-center">
            {/* Tab headers */}
            <div className="flex space-x-1 bg-white px-4 py-2 rounded-lg w-fit">
                {tabs.map((tab) => (
                <button
                    key={tab.name}
                    className={`px-4 py-2 font-normal ${activeTab === tab.name ? 'text-white bg-[#0046B5] rounded-lg border-blue-600 font-medium' : ''}`}
                    onClick={() => setActiveTab(tab.name)}
                >
                    {tab.name}
                </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="flex flex-row mt-4">
                <div className="w-full p-4">
                {tabs.find((tab) => tab.name === activeTab)?.content}
                </div>
            </div>
            </div>
        </section>
    </div>
  );
};

export default TabComponent;
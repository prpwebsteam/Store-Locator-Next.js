'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Attendance1 from '../assests/time_attendance.png';
import Attendance3 from '../assests/integrations.png';
import Attendance4 from '../assests/all_in_one.png';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const tabs = [
  {
    name: 'Bulk CSV Import/Export',
    content: (
      <div className="accordion-content">
        <p>
          Face Recognition and Time based attendance to reduce the amount of manual work and make it seamless.
        </p>
        <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Time Based attendance</span><br />
            Allows the attendance based on actual hours worked in comparison to existing systems of check in and check out.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Informative Attendance Dashboard</span><br />
            Helps to track everything at one place.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Optional Mobile App feature</span><br />
            Helps to automate attendance using Face Recognition.
          </li>
        </ul>
      </div>
    ),
    image: Attendance1,
  },
  {
    name: 'Easy to Edit Map Theme',
    content: (
      <div className="accordion-content">
        <p>
          Streamlining Tasks and Workflow to Enhance Efficiency and Output.
        </p>
        <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Focused Task Management</span><br />
            Centralizes all tasks in one interface, prioritizing according to deadlines and importance to maximize efficiency in task completion.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Performance Analytics</span><br />
            Gathers data on work patterns and productivity levels, offering insights to improve individual and team performance.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Automated Workflow Solutions</span><br />
            Reduces repetitive manual processes through automation, allowing for more time to be spent on strategic, high-value tasks.
          </li>
        </ul>
      </div>
    ),
    image: Attendance3,
  },
  {
    name: 'Custom Image Marker Option',
    content: (
      <div className="accordion-content">
        <p>
          Consolidated Management for Attendance, Payroll, and Time Tracking.
        </p>
        <ul className="mb-8 list-disc space-y-2 pl-5 text-left">
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Comprehensive Attendance System</span><br />
            Integrates facial recognition and time-based tracking to record attendance accurately, reducing manual input and errors.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Streamlined Payroll Processing</span><br />
            Automates calculations and consolidates pay-related data, ensuring timely and accurate payroll execution.
          </li>
          <li className="text-[#292929]">
            <span className='text-[#0046B5] font-semibold'>Efficient Time Tracking</span><br />
            Captures real-time work hours with intuitive time tracking, providing clear insights into team productivity.
          </li>
        </ul>
      </div>
    ),
    image: Attendance4,
  },
];

const AccordionTabComponent = () => {
  const [activeTab, setActiveTab] = useState(0); 

  return (
    <div className="accordion py-6 md:py-12 flex flex-row w-full justify-center gap-8">
      <div className='page-width flex mx-4 md:mx-8 flex-col md:flex-row w-full justify-between gap-8'>
        <div className="accordion-tabs flex-grow md:w-1/2">
          {tabs.map((tab, index) => (
            <div
              className={`accordion-item page-width my-4 rounded-lg ${activeTab === index ? 'shadow-xl active' : ''}`}
              key={index}
            >
              <button
                className="w-full font-bold flex justify-between items-center py-4 px-8"
                onClick={() => setActiveTab(activeTab === index ? null : index)}
              >
                {tab.name}
                {activeTab === index ? (
                  <IoIosArrowUp className="text-lg" />
                ) : (
                  <IoIosArrowDown className="text-lg" />
                )}
              </button>
              {activeTab === index && (
                <div className='accordion-content px-8 py-4'>
                  <div className="accordion-text">{tab.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="accordion-image flex justify-center items-center md:w-1/2">
          {tabs[activeTab] && (
            <Image
              src={tabs[activeTab].image}
              alt="Active tab image"
              height={300}
              className="rounded-[20px] w-[80%] object-fill"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionTabComponent;
'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import Logo from '../assests/logo-1.svg'; 

function Header2() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home or sign-in page
  };

  return (
    <nav className='bg-[#0040A9]'>
      <div className="max-w-[1440px] mx-auto flex flex-row justify-between">
        <div className="flex justify-between items-center p-4 w-[100%]">
          <a href='/'>
            <Image src={Logo} alt="Logo" width={128} height={64} /> 
          </a>
          <div className="relative">
            <button
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              className="text-white lg:hidden focus:outline-none"
              aria-expanded={isDropdownVisible}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <div className={`absolute right-0 mt-2 bg-white border border-gray-300 z-1 rounded-lg shadow-lg ${isDropdownVisible ? 'block' : 'hidden'}`} ref={dropdownRef}>
              <ul className={`py-2 px-4 ${isDropdownVisible ? 'block' : 'hidden'}`}>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#0040A9]">
                  <Link href="/" className="block font-bold">Home</Link>
                </li>
                {isLoggedIn && (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#0040A9]">
                    <Link href="/dashboard" className="block font-bold">Dashboard</Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li className="hover-bg-[#96b6e9] py-2 px-4 rounded-lg text-[#0040A9]">
                    <Link href="/signin" className="block font-bold">SignIn</Link>
                  </li>
                ) : (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#0040A9]">
                    <button onClick={handleLogout} className="block font-bold">SignOut</button>
                  </li>
                )}
              </ul>
            </div>
            <div className='lg:flex hidden'>
              <ul className='flex'>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-white">
                  <Link href="/" className="block font-bold">Home</Link>
                </li>
                {isLoggedIn && (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-white">
                    <Link href="/dashboard" className="block font-bold">Dashboard</Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-white">
                    <Link href="/signin" className="block font-bold">SignIn</Link>
                  </li>
                ) : (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-white">
                    <button onClick={handleLogout} className="block font-bold">SignOut</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header2;
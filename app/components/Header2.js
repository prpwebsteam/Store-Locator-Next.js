'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import Logo from '../assests/Logo.png'; 
import { GiHamburgerMenu } from "react-icons/gi";

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
        <div className="flex bg-white rounded-lg justify-between items-center mx-4 md:mx-8 my-8 py-2 px-4 w-full">
          <a href='/' className='text-[32px] text-white font-bold'>
            <Image src={Logo} alt="Logo" width={40} height={40} />
          </a>
          <div className="relative">
            <button
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              className="text-white lg:hidden focus:outline-none"
              aria-expanded={isDropdownVisible}
              aria-label="Toggle navigation menu"
            >
              <GiHamburgerMenu className='w-7 h-7 text-black' />
            </button>
            <div className={`absolute right-[-15px] mt-[0.6rem] bg-white border border-gray-300 z-1 rounded-lg shadow-lg ${isDropdownVisible ? 'block' : 'hidden'}`} ref={dropdownRef}>
              <ul className={`py-2 px-4 ${isDropdownVisible ? 'block' : 'hidden'}`}>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                  <Link href="/" className="block font-bold">Features</Link>
                </li>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                  <Link href="/" className="block font-bold">Pricing</Link>
                </li>
                {!isLoggedIn && (
                  <li className="bg-[#0046B5] hover:bg-[#96b6e9] py-2 mx-2 px-4 rounded-lg hover:text-[#000] text-[#fff]">
                    <Link href="/signin" className="block font-bold">Free Trial</Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                    <Link href="/dashboard" className="block font-bold">Dashboard</Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                    <Link href="/signin" className="block font-bold">SignIn</Link>
                  </li>
                ) : (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                    <button onClick={handleLogout} className="block font-bold">SignOut</button>
                  </li>
                )}
              </ul>
            </div>
            <div className='lg:flex hidden'>
              <ul className='flex'>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                  <Link href="#about-card" className="block font-bold">Features</Link>
                </li>
                <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                  <Link href="#payment-card" className="block font-bold">Pricing</Link>
                </li>
                {!isLoggedIn && (
                  <li className="bg-[#0046B5] hover:bg-[#96b6e9] py-2 mx-2 px-4 rounded-lg hover:text-[#000] text-[#fff]">
                    <Link href="/signin" className="block font-bold">Free Trial</Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                    <Link href="/dashboard" className="block font-bold">Dashboard</Link>
                  </li>
                )}
                {!isLoggedIn ? (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
                    <Link href="/signin" className="block font-bold">SignIn</Link>
                  </li>
                ) : (
                  <li className="hover:bg-[#96b6e9] py-2 px-4 rounded-lg text-[#000]">
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
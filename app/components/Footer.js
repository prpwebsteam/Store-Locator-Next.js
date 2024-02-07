'use client'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assests/logo-1.svg'; 
import FB from '../assests/fb.png';
import LinkedIn from '../assests/linkedin.png';
import Insta from '../assests/insta.png';

function Footer() {
  return (
    <footer className="bg-[#0046B5] text-white py-[32px] my-0 mx-auto px-[20px]">
      <div className='max-w-[1440px] mx-auto'>
      <div className="logo mb-8 flex flex-col lg:flex-row justify-between w-[100%] gap-8 items-start lg:items-center">
        <div>
            <a href='/'>
              <Image src={Logo} alt="Logo" width={128} height={64} /> 
            </a>
        </div>
        <div className='flex flex-row mt-4 lg:mt-0 lg:w-[30%] justify-end lg:p-4'>
          <a href="https://www.facebook.com" className="mr-4 w-[40px] lg:w-[30px]">
          <Image src={FB} alt="Logo" width={128} height={64} />
          </a>
          <a href="https://www.twitter.com" className="mr-4 w-[40px]  lg:w-[30px]">
          <Image src={LinkedIn} alt="Logo" width={128} height={64} />
          </a>
          <a href="https://www.instagram.com" className=' w-[40px] lg:w-[30px]'>
          <Image src={Insta} alt="Logo" width={128} height={64} />
          </a>
        </div>
      </div>
      <div className="container gap-4 mx-0 grid grid-cols-2 lg:flex ;g:flex-wrap items-start lg:justify-between w-[100%]">

        <div className="menu-products">
          <h3 className="font-bold mb-4">PRODUCTS</h3>
          <ul className="flex flex-col">
            <li><a href="#">Maps Overview</a></li>
            <li><a href="#">StoreLocator</a></li>
          </ul>
        </div>

        <div className="menu-solutions">
          <h3 className="font-bold mb-4">SOLUTIONS</h3>
          <ul className="flex flex-col">
            <li><a href="#">Logistics</a></li>
            <li><a href="#">Automotive</a></li>
          </ul>
        </div>

        <div className="menu-developers">
          <h3 className="font-bold mb-4">DEVELOPERS</h3>
          <ul className="flex flex-col">
            <li><a href="#">Quickstart</a></li>
            <li><a href="#">Documentation</a></li>
          </ul>
        </div>

        <div className="menu-resources">
          <h3 className="font-bold mb-4">RESOURCES</h3>
          <ul className="flex flex-col">
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="menu-company">
          <h3 className="font-bold mb-4">COMPANY</h3>
          <ul className="flex flex-col">
            <li><a href="#">Who we are</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div className="address-contact font-bold">
          <address>123 Mansarovar, Jaipur, India</address>
          <p>Phone: (123) 456-7890</p>
          <p>Email: team@prpwebs.com</p>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
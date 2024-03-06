'use client'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assests/Logo.png'; 
import FB from '../assests/fb.png';
import LinkedIn from '../assests/linkedin.png';
import Insta from '../assests/insta.png';

function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-[16px] flex justify-center my-0 mx-auto px-[20px]">
      <div>
        <p>Copyright © 2011-2024 | <a href="https://prpwebs.com">PRP Webs</a></p>
      </div>
    </footer>
  );
}

export default Footer;
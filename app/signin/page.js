'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import Dashboard from '../dashboard/page';
import { useRouter } from 'next/navigation';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const [verificationMessage, setVerificationMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/verify?email=${formData.email}&password=${formData.password}`);

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ email: formData.email, token: data.token }));
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("bhairav", user);

        setVerificationMessage("User verified successfully!"); 
        router.push('/dashboard');
      } else {
        setVerificationMessage('Sign-in failed. Please check your credentials.'); 
      }
    } catch (error) {
      console.error('Sign-in Error:', error);
      setVerificationMessage('Internal Server Error'); // Set an error message
    }
  };

  return (
    <>
    <Header2 />
    <div className="flex flex-col items-center justify-center py-10 min-h-[100vh] overflow-hidden bg-white">
      <h2 className="text-[24px] font-bold py-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] md:w-[45%]">
        <div className="input-wrapper w-[100%]">
          <input
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-wrapper w-[100%]">
          <input
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <p className="my-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
        <button
          className="bg-[#0040A9] text-white rounded-md px-8 py-2 my-4 font-bold"
          type="submit"
        >
          Sign In
        </button>
        {verificationMessage && (
          <p className="my-4 text-green-500">{verificationMessage}</p>
        )}
      </form>
    </div>
    <Footer />
    </>
  );
}

export default SignIn;
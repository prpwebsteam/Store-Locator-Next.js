'use client'
import Link from 'next/link';
import { useState } from 'react';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    const [successMessage, setSuccessMessage] = useState('');
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            setSuccessMessage('Signup successfully!');
            setTimeout(() => {
              setSuccessMessage('');
            }, 3000);
          } else {
            console.error('Signup failed');
          }
        } catch (error) {
          console.error('Signup Error:', error);
        }
      };

  return (
    <>
    <Header2 />
    <div className="flex flex-col items-center justify-center py-10 min-h-[100vh] overflow-hidden bg-white">
      <h2 className="text-2xl font-bold py-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] md:w-[45%]">
        <div className="input-wrapper w-full">
          <label htmlFor="name" className="block">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            required
          />
        </div>
        <div className="input-wrapper w-full">
          <label htmlFor="email" className="block">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            required
          />
        </div>
        <div className="input-wrapper w-full">
          <label htmlFor="phone" className="block">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            required
          />
        </div>
        <div className="input-wrapper w-full">
          <label htmlFor="password" className="block">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            required
          />
        </div>
        <div className="input-wrapper w-full">
          <label htmlFor="confirmPassword" className="block">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
            required
          />
        </div>
          <p className="my-2">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-500">
              Sign in
            </Link>
          </p>
        <button className="bg-[#0040A9] text-white rounded-md px-8 py-2 my-4 font-bold" type="submit">
          Sign Up
        </button>
        {successMessage && (
            <p className="text-green-500 my-4">{successMessage}</p>
          )}
      </form>
    </div>
    <Footer />
    </>
  );
}

export default SignUp;
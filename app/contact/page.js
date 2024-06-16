'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("formData:-",formData)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response:-",response)
            if (response.status === 200) {
                setMessage('Your query has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    query: '',
                });
                setTimeout(() => {
                    setMessage('');
                    router.push('/');
                }, 3000);
            } else {
                setMessage('Failed to send your query. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header2 />
            <div className="flex flex-col items-center justify-center py-10 min-h-[100vh] bg-white">
                <h2 className="text-2xl font-bold py-4">Contact Us</h2>
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
                        <label htmlFor="query" className="block">Query:</label>
                        <textarea
                            id="query"
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-5 py-2 my-2 w-full"
                            required
                        ></textarea>
                    </div>
                    <button className="bg-[#0040A9] text-white rounded-md px-8 py-2 my-4 font-bold" type="submit">
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                    {message && (
                        <p className="my-4 text-green-500">{message}</p>
                    )}
                </form>
            </div>
            <Footer />
        </>
    );
}

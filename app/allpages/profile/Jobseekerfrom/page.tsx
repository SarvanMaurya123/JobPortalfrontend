"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/redux/hooks';
import url from '@/app/lib/url';

// ----------------------
// Interfaces
// ----------------------
interface FormDataType {
    full_name: string;
    email: string;
    phone_number: string;
    location: string;
    interested_area: string;
    about: string;
    date_of_birth: string;
    resume_link: string;
}

// ----------------------
// Main Component
// ----------------------
const JobseekerProfileInfo = () => {
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);
    const User = useAppSelector((state) => state.auth.user);

    if (!User?.id) {
        router.push('/login');
    }

    const [formData, setFormData] = useState<FormDataType>({
        full_name: '',
        email: '',
        phone_number: '',
        location: '',
        interested_area: '',
        about: '',
        date_of_birth: '',
        resume_link: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };





    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            await axios.post(`${url}/profile`, {
                ...formData,
                user_id: User?.id, // explicitly include user_id in the body
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            router.push('/candidate/profile');
        } catch (error: unknown) {
            console.error('Submit Error:', error);
            if (axios.isAxiosError(error)) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                });
            } else if (error instanceof Error) {
                setMessage({
                    type: 'error',
                    text: error.message || 'Something went wrong',
                });
            } else {
                setMessage({
                    type: 'error',
                    text: 'Something went wrong',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ------------------
    // Animations
    // ------------------
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
            <motion.h2
                className="text-2xl font-bold mb-6 text-center text-blue-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Job Seeker Profile
            </motion.h2>
            {message && (
                <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >

                {/* Full Name */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Phone Number */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Location */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Date of Birth */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Interested Area */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interested Area</label>
                    <input
                        type="text"
                        name="interested_area"
                        value={formData.interested_area}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* About */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </motion.div>

                {/* Resume Upload */}
                <input
                    type="url"
                    name="resume_link" // ✅ changed from resume_url to resume_link
                    value={formData.resume_link}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Paste Google Drive link (e.g. https://drive.google.com/...)"
                    required
                />



                {/* Submit */}
                <motion.button
                    type="submit"
                    className={`w-full text-white py-2 rounded-md ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Profile'}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default JobseekerProfileInfo;

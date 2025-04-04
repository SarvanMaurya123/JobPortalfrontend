'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    // Change the type to string | null instead of just null
    const [focused, setFocused] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would normally handle form submission to your backend
        console.log('Form submitted:', formState);

        // Show success animation
        setSubmitted(true);

        // Reset form after delay
        setTimeout(() => {
            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const inputVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        },
        focus: {
            scale: 1.01,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.4
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        },
        success: {
            backgroundColor: "#10B981",
            color: "white",
            transition: { duration: 0.3 }
        }
    };

    const successVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10 mb-10">
            <motion.h2
                className="text-3xl font-bold text-gray-800 mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                Get in Touch
            </motion.h2>

            {submitted ? (
                <motion.div
                    className="flex flex-col items-center justify-center py-16"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">{`We'll`} get back to you as soon as possible.</p>
                </motion.div>
            ) : (
                <motion.form
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={inputVariants}
                    >
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <motion.input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                variants={inputVariants}
                                animate={focused === 'name' ? 'focus' : 'visible'}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <motion.input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                variants={inputVariants}
                                animate={focused === 'email' ? 'focus' : 'visible'}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                            />
                        </div>
                    </motion.div>

                    <motion.div className="space-y-2" variants={inputVariants}>
                        <label className="block text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <motion.input
                            type="text"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            variants={inputVariants}
                            animate={focused === 'subject' ? 'focus' : 'visible'}
                            onFocus={() => setFocused('subject')}
                            onBlur={() => setFocused(null)}
                        />
                    </motion.div>

                    <motion.div className="space-y-2" variants={inputVariants}>
                        <label className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <motion.textarea
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            variants={inputVariants}
                            animate={focused === 'message' ? 'focus' : 'visible'}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="w-full py-4 px-6 bg-green-500 text-white font-medium rounded-lg shadow-md"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            )}
        </div>
    );
};

export default ContactForm;
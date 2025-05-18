'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// FAQ item type
interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const FAQPage = () => {
    // Sample FAQ data
    const routes = useRouter()
    const faqData: FAQItem[] = [
        {
            id: 1,
            question: "How do I get started with your service?",
            answer: "Getting started is easy! Simply create an account on our website, select a plan that fits your needs, and follow the onboarding process. Our intuitive setup wizard will guide you through each step. If you need any assistance, our support team is available 24/7.",
            category: "Getting Started"
        },
        {
            id: 2,
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers. For enterprise customers, we also offer invoicing options with net-30 payment terms.",
            category: "Billing"
        },
        {
            id: 3,
            question: "Can I upgrade or downgrade my plan later?",
            answer: "Absolutely! You can upgrade your plan at any time, and the new features will be immediately available. If you downgrade, the changes will take effect at the start of your next billing cycle. There are no penalties or fees for changing your plan.",
            category: "Billing"
        },
        {
            id: 4,
            question: "How secure is my data?",
            answer: "Security is our top priority. We use industry-standard encryption protocols, regular security audits, and maintain SOC 2 compliance. All data is stored in secure, redundant servers with 24/7 monitoring. We never share your data with third parties without your explicit consent.",
            category: "Security"
        },
        {
            id: 5,
            question: "Do you offer a mobile app?",
            answer: "Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store. The mobile app includes all the core features of our web application, allowing you to stay productive on the go.",
            category: "Features"
        },
        {
            id: 6,
            question: "What kind of support do you offer?",
            answer: "We provide multiple support channels including email, live chat, and phone support for higher-tier plans. Our knowledge base is extensive and includes tutorials, guides, and FAQs. Enterprise customers also receive a dedicated account manager for personalized assistance.",
            category: "Support"
        },
        {
            id: 7,
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel your subscription at any time from your account settings page. If you cancel, You will still have access to your current plan until the end of your billing period. We don't offer prorated refunds for unused time, but there are no cancellation fees.",
            category: "Billing"
        },
        {
            id: 8,
            question: "Do you offer custom solutions for enterprises?",
            answer: "Definitely! We offer tailored enterprise solutions with custom features, dedicated support, and flexible deployment options. Contact our sales team to discuss your specific requirements, and  create a solution that perfectly matches your organizations needs.",
            category: "Enterprise"
        }
    ];

    // All categories from FAQ data
    const categories = Array.from(new Set(faqData.map(item => item.category)));

    // State for selected category and expanded items
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Filter FAQs based on selected category
    const filteredFAQs = selectedCategory
        ? faqData.filter(item => item.category === selectedCategory)
        : faqData;

    // Toggle FAQ item expansion
    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const contentVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            transition: {
                height: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                },
                opacity: { duration: 0.25 }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Find answers to common questions about our services and features.
                    </motion.p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.button
                        className={`px-4 py-2 cursor-pointer rounded-full font-medium text-sm sm:text-base transition-colors ${selectedCategory === null
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setSelectedCategory(null)}
                        variants={itemVariants}
                        whileTap={{ scale: 0.95 }}
                    >
                        All
                    </motion.button>

                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={`px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-colors cursor-pointer ${selectedCategory === category
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            onClick={() => setSelectedCategory(category)}
                            variants={itemVariants}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* FAQ Items */}
                <motion.div
                    className="max-w-3xl mx-auto space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredFAQs.map((faq) => (
                        <motion.div
                            key={faq.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                            variants={itemVariants}
                            layout
                        >
                            <motion.button
                                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleExpand(faq.id)}
                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                <motion.div
                                    animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {expandedId === faq.id && (
                                    <motion.div
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 pt-2 text-gray-600 border-t border-gray-100">
                                            <p>{faq.answer}</p>

                                            <div className="mt-4 flex items-center">
                                                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                                    {faq.category}
                                                </span>
                                                <span className="ml-auto text-sm text-blue-600 flex items-center cursor-pointer hover:underline">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Was this helpful?
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Not finding answer section */}
                <motion.div
                    className="mt-16 bg-blue-50 rounded-xl p-8 max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Can not find the answer you are looking for? Please chat with our friendly team.
                    </p>
                    <motion.button
                        className="bg-green-500 cursor-pointer text-white font-medium py-3 px-8 rounded-lg shadow-md "
                        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { routes.push("/contact") }}
                    >
                        Contact Support
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Team member type
interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
}

const AboutUs = () => {
    // Animation variants
    const router = useRouter();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
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

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8
            }
        }
    };

    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Founder & CEO",
            bio: "Alex has over 15 years of experience in the industry and founded our company with a vision to create innovative solutions.",
        },
        {
            id: 2,
            name: "Jamie Smith",
            role: "Creative Director",
            bio: "Jamie leads our creative team with passion and has a background in design from renowned studios in New York and London.",
        },
        {
            id: 3,
            name: "Taylor Wong",
            role: "Lead Developer",
            bio: "Taylor has been coding since age 12 and brings expertise in the latest technologies to our development process.",
        },
        {
            id: 4,
            name: "Morgan Rivera",
            role: "Customer Success",
            bio: "Morgan ensures our clients receive exceptional support and helps them maximize value from our products.",
        }
    ];

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="relative h-96 bg-green-500 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-blue-700"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                />

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <motion.h1
                        className="text-5xl font-bold text-white mb-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
                    >
                        About Our Journey
                    </motion.h1>
                    <motion.p
                        className="text-xl text-blue-100 max-w-2xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                    >
                        {`We're`} on a mission to create beautiful, functional experiences that make a difference.
                    </motion.p>
                </div>

                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-20 bg-white"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        borderTopLeftRadius: '50% 80%',
                        borderTopRightRadius: '50% 80%',
                        transform: 'scaleX(1.2)'
                    }}
                />
            </motion.section>

            {/* Our Story Section */}
            <motion.section
                className="container mx-auto px-6 py-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-12 text-center"
                    variants={itemVariants}
                >
                    Our Story
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div variants={itemVariants}>
                        <div className="rounded-xl overflow-hidden shadow-xl">
                            <div className="h-64 w-full relative">
                                <Image
                                    src="/slider_bg.jpg"
                                    alt="image"
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>


                    <motion.div className="space-y-6" variants={itemVariants}>
                        <h3 className="text-2xl font-semibold text-gray-800">From a simple idea to where we are today</h3>
                        <p className="text-gray-600">
                            Founded in 2018 our company began with a simple yet powerful idea: to make technology more human.
                            What started as a small team of three passionate individuals has grown into a thriving company with
                            clients across the globe.
                        </p>
                        <p className="text-gray-600">
                            Our journey {`hasn't`} always been smooth but our commitment to quality and innovation has never wavered.
                            Through challenges and triumphs {`we've`} remained dedicated to our core values and the people we serve.
                        </p>
                        <p className="text-gray-600">
                            Today {`we've`} proud of what {`we've`} built and excited about where {`we've`} headed. Our team continues to gro
                            our products continue to evolve and our passion continues to drive us forward.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Values Section */}
            <motion.section
                className="bg-gray-50 py-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-12 text-center"
                        variants={itemVariants}
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-md"
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                            <p className="text-gray-600">
                                We embrace new ideas and technologies to push boundaries and create solutions that make a difference.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-md"
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
                            <p className="text-gray-600">
                                We believe in building strong relationships with our clients partners and the wider community.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-md"
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h3>
                            <p className="text-gray-600">
                                We act with honesty transparency and accountability in everything we do.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section
                className="container mx-auto px-6 py-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-4 text-center"
                    variants={itemVariants}
                >
                    Meet Our Team
                </motion.h2>

                <motion.p
                    className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
                    variants={itemVariants}
                >
                    {`We're`} a diverse group of passionate individuals who love what we do.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map(member => (
                        <motion.div
                            key={member.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="h-48 bg-gray-300 relative">
                                {/* Replace with actual team member images */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src="/slider_bg.jpg"
                                        alt="image"
                                        layout="fill"
                                        objectFit="cover"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-blue-600 mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="bg-green-500 py-16"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to work together?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        {`We're`} always looking for new challenges and exciting projects. {`Let's`} create something amazing together.
                    </p>
                    <motion.button
                        className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/contact')}

                    >
                        Contact Us

                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;
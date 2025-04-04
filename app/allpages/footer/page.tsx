"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";


export default function Footer() {
    return (
        <footer className="relative bg-white text-gray-800 py-12 border-t border-gray-200">
            {/* Background Image */}
            <div className="absolute bottom-0 left-0 w-full h-40 opacity-40">
                <Image
                    src="/city_bg.png" // Replace with your actual image path
                    alt="Footer Background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className="relative container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Column 1: Company Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">JP</span>
                            </div>
                            <h1 className="text-xl font-bold text-green-600 hidden sm:block">Job Portal</h1>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex gap-4 mt-4">
                        <SocialIcon link="#" Icon={Facebook} />
                        <SocialIcon link="#" Icon={Twitter} />
                        <SocialIcon link="#" Icon={Instagram} />
                    </div>
                </motion.div>

                {/* Column 2: Job Categories */}
                <FooterColumn title="Job Categories" links={["Work from Home", "Internship Job", "Freelancer Job", "Part Time Job", "Full Time Job"]} />

                {/* Column 3: Job Type */}
                <FooterColumn title="Job Type" links={["Create Account", "Career Counseling", "My Oficina", "FAQ", "Report a Problem"]} />

                {/* Column 4: Resources */}
                <FooterColumn title="Resources" links={["My Account", "Support", "How It Works", "Underwriting", "Employers"]} />

                {/* Column 5: Quick Links */}
                <FooterColumn title="Quick Links" links={["Jobs Listing", "About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"]} />
            </div>

            {/* Bottom Copyright Text */}
            <div className="relative text-center text-gray-500 text-sm mt-10 border-t-[1px] border-gray-400 pt-3">
                Copyright © {new Date().getFullYear()} All Rights Reserved.
            </div>
        </footer>
    );
}

// Reusable Footer Column Component
const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="text-lg font-semibold mb-3 border-b-2 border-green-500 inline-block">{title}</h2>
        <ul className="text-md text-gray-600 space-y-2">
            {links.map((link, index) => (
                <motion.li key={index} whileHover={{ scale: 1.05, x: 5 }}>
                    <Link href="#" className="hover:text-gray-800">{link}</Link>
                </motion.li>
            ))}
        </ul>
    </motion.div>
);

const SocialIcon = ({ link, Icon }: { link: string; Icon: React.ElementType }) => (
    <motion.div whileHover={{ scale: 1.2 }}>
        <Link href={link} className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center">
            <Icon size={18} />
        </Link>
    </motion.div>
);

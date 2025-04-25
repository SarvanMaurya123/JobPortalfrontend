'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="relative h-[500px] w-full">
            {/* Background Image */}
            <Image
                src="/slider_bg.jpg"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                className="brightness-75"
            />

            {/* Overlay Content */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-bold leading-tight"
                >
                    Find Your Dream Job
                </motion.h1>
                <p className="mt-4 text-md md:text-2xl text-gray-200 max-w-3xl">
                    Search from thousands of job opportunities across various industries worldwide.
                </p>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-white p-5 md:p-6 rounded-xl shadow-xl mt-8 w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-5 md:mb-0"
                >
                    {/* Role Input */}
                    <Input
                        type="text"
                        placeholder="Job Role"
                        className="flex-1 text-gray-800 text-lg bg-transparent outline-none"
                    />

                    {/* Location Select */}
                    <Select>
                        <SelectTrigger className="flex-1 text-gray-800 text-lg bg-transparent outline-none">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                            <SelectItem value="bangalore">Bangalore</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            <SelectItem value="chennai">Chennai</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Category Select */}
                    <Select>
                        <SelectTrigger className="flex-1 text-gray-800 text-lg bg-transparent outline-none">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="it">IT & Software</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Search Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-[#2cb67d] text-white px-8 py-3 text-lg flex items-center gap-2 rounded-xl">
                            <Search size={20} /> Search
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Popular Searches Tags */}
                <div className="mt-6 flex flex-wrap justify-center gap-4 hidden md:flex">
                    {["Software Engineer", "Data Analyst", "UX Designer", "Remote"].map((job, index) => (
                        <span
                            key={index}
                            className="text-lg bg-[#2cb67d] bg-opacity-20 px-5 py-2 rounded-full backdrop-blur-md cursor-pointer transition-all duration-300 transform
                hover:scale-110 hover:bg-opacity-30 hover:bg-[#2cb67d] hover:shadow-lg"
                        >
                            {job}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
}

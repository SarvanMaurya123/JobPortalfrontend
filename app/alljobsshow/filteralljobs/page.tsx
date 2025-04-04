// File: components/JobBoard.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Heart, Search, MapPin } from "lucide-react";

const JOBS = [
    {
        id: 1,
        title: "Product Redesign",
        type: "FULL TIME",
        location: "2708 Scenic Way, IL 62373",
        logo: "/logos/product-redesign.png",
        color: "#4CAF50",
        isFavorite: true
    },
    {
        id: 2,
        title: "New Product Mockup",
        type: "FULL TIME",
        location: "2708 Scenic Way, IL 62373",
        logo: "/logos/product-mockup.png",
        color: "#2196F3",
        isFavorite: false
    },
    {
        id: 3,
        title: "Custom Php Developer",
        type: "FULL TIME",
        location: "3755 C Street, Worcester",
        logo: "/logos/php-dev.png",
        color: "#9C27B0",
        isFavorite: true
    },
    {
        id: 4,
        title: "Wordpress Developer",
        type: "PART TIME",
        location: "2719 Duff Avenue, Winooski",
        logo: "/logos/wordpress-dev.png",
        color: "#FF5722",
        isFavorite: false
    },
    {
        id: 5,
        title: "Web Maintenence",
        type: "INTERNSHIP",
        location: "2708 Scenic Way, IL 62373",
        logo: "/logos/web-maintenance.png",
        color: "#F44336",
        isFavorite: true
    },
    {
        id: 6,
        title: "Photoshop Designer",
        type: "PART TIME",
        location: "2865 Emma Street, Lubbock",
        logo: "/logos/photoshop-designer.png",
        color: "#FFC107",
        isFavorite: false
    },
    {
        id: 7,
        title: "HTML5 & CSS3 Coder",
        type: "FULL TIME",
        location: "2713 Burnside Avenue, Logan",
        logo: "/logos/html-css-coder.png",
        color: "#673AB7",
        isFavorite: true
    },
    {
        id: 8,
        title: ".Net Developer",
        type: "PART TIME",
        location: "3815 Forest Drive, Alexandria",
        logo: "/logos/net-developer.png",
        color: "#00BCD4",
        isFavorite: true
    }
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.2
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

const favoriteVariants = {
    unfavorited: { scale: 1 },
    favorited: {
        scale: [1, 1.3, 1],
        transition: { duration: 0.3 }
    }
};

export default function JobBoard() {
    const [favorites, setFavorites] = useState<Record<number, boolean>>(
        JOBS.reduce((acc, job) => ({ ...acc, [job.id]: job.isFavorite }), {})
    );
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const toggleFavorite = (id: number) => {
        setFavorites(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="max-w-6xl mx-auto font-sans mt-5 mb-5">
            {/* Search Box with Shadow */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Job Title, Keywords or Company Name..."
                            className="pl-10 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <Select>
                        <SelectTrigger className="md:w-1/3 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent className="border-none shadow-lg">
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="il">Illinois</SelectItem>
                            <SelectItem value="worcester">Worcester</SelectItem>
                            <SelectItem value="winooski">Winooski</SelectItem>
                            <SelectItem value="lubbock">Lubbock</SelectItem>
                            <SelectItem value="logan">Logan</SelectItem>
                            <SelectItem value="alexandria">Alexandria</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="md:w-1/3 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="border-none shadow-lg">
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow transition-all duration-300 hover:shadow-md"
                    >
                        SEARCH
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-2">
                <motion.h2
                    className="text-xl font-semibold text-gray-700 mb-4 md:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    98 Jobs & Vacancies
                </motion.h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <span className="text-sm text-gray-500">Short By</span>
                    <Select defaultValue="recent">
                        <SelectTrigger className="w-40 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all">
                            <SelectValue placeholder="Most Recent" />
                        </SelectTrigger>
                        <SelectContent className="border-none shadow-lg">
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="salary">Highest Salary</SelectItem>
                            <SelectItem value="title">Job Title</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="10">
                        <SelectTrigger className="w-40 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all">
                            <SelectValue placeholder="10 Per Page" />
                        </SelectTrigger>
                        <SelectContent className="border-none shadow-lg">
                            <SelectItem value="10">10 Per Page</SelectItem>
                            <SelectItem value="20">20 Per Page</SelectItem>
                            <SelectItem value="50">50 Per Page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {JOBS.map(job => (
                        <motion.div
                            key={job.id}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="p-3">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${job.type === "FULL TIME" ? "bg-green-100 text-green-800" :
                                            job.type === "PART TIME" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-red-100 text-red-800"
                                            }`}>
                                            {job.type}
                                        </span>
                                        <motion.button
                                            className={`rounded-full focus:outline-none ${favorites[job.id] ? 'text-red-500' : 'text-gray-300'}`}
                                            variants={favoriteVariants}
                                            animate={favorites[job.id] ? "favorited" : "unfavorited"}
                                            onClick={() => toggleFavorite(job.id)}
                                        >
                                            <Heart className="h-5 w-5" fill={favorites[job.id] ? "currentColor" : "none"} />
                                        </motion.button>
                                    </div>
                                    <div className="flex justify-center py-4">
                                        <motion.div
                                            className="w-20 h-20 rounded-full shadow-sm flex items-center justify-center overflow-hidden"
                                            style={{ background: `linear-gradient(135deg, ${job.color}22, ${job.color}44)` }}
                                            variants={logoVariants}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="hover"
                                        >
                                            {/* For demo purposes, using colored circles with initials */}
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                                                <span className="font-bold text-xl" style={{ color: job.color }}>
                                                    {job.title.charAt(0)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <CardContent className="px-0 pt-4 pb-0">
                                        <h3 className="text-center font-semibold text-lg mb-2">{job.title}</h3>
                                        <p className="text-center text-sm text-gray-500 mb-2 flex items-center justify-center gap-1">
                                            <MapPin className="h-3 w-3" /> {job.location}
                                        </p>
                                        <motion.button
                                            className="w-full mt-4 py-2 px-4 border border-gray-300 hover:border-green-500 text-sm rounded-md text-gray-700 hover:text-green-600 font-medium bg-white hover:bg-green-50 transition-all duration-300"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            APPLY NOW
                                        </motion.button>
                                    </CardContent>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                className="hover:text-green-600 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {[1, 2, 3].map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === page}
                                    className={`${currentPage === page ? 'bg-green-500 text-white' : 'hover:text-green-600'} transition-colors`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(page);
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                className="hover:text-green-600 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </motion.div>
        </div>
    );
}
// File: components/JobBoard.tsx
"use client";
import { useEffect, useState } from 'react';
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
import { Search, MapPin } from "lucide-react";
import axios from 'axios';
import { useAppSelector } from '@/app/redux/hooks';
import urlemployer from '@/app/lib/employer';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';


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

type Job = {
    id: number;
    employer_id: number;
    title: string;
    location: string;
    employment_type: string;
    experience_level: string;
};

export default function JobBoard() {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();



    const [jobs, setJobs] = useState([]);

    const handleApply = (job: Job) => {
        router.push(`/jobs/${job.id}`);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${urlemployer}/jobseeker/jobs/${user?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        if (token && user?.id) {
            fetchJobs();
        }
    }, [token, user?.id]); // ✅ Add `user?.id` as a dependency




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
                    {jobs.map((job: Job, index: number) => (

                        <motion.div
                            key={index}

                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="p-3">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${job.employment_type === "FULL TIME" ? "bg-green-100 text-green-800" :
                                            job.employment_type === "PART TIME" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-red-100 text-red-800"
                                            }`}>
                                            {job.employment_type}
                                        </span>
                                    </div>

                                    <div className="flex justify-center py-4">

                                        <motion.div
                                            className={clsx(
                                                "w-20 h-20 rounded-full shadow-sm flex items-center justify-center overflow-hidden",
                                                {
                                                    "bg-blue-500": job.title === "Full-time",
                                                    "bg-green-500": job.title === "Part-time",
                                                    "bg-yellow-500": job.title === "Internship",
                                                    "bg-purple-500": job.title === "Freelance",
                                                    "bg-red-500": job.title === "Contract",
                                                    "bg-pink-500": job.title === "Temporary",
                                                    "bg-gray-500": job.title === "Others"
                                                }
                                            )}
                                            variants={logoVariants}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="hover"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                                                <span className="font-bold text-xl">
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
                                            className="w-full mt-4 py-2 px-4 border border-gray-300 hover:border-green-500 text-sm rounded-md text-gray-700 hover:text-green-600 font-medium bg-white hover:bg-green-50 transition-all duration-300 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleApply(job)} // job.id is passed here
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
                        {[1, 2, 3].map((page, index) => (
                            <PaginationItem key={index}>
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
'use client'
import { useState } from "react";
import { Heart, Calendar, MapPin, DollarSign } from "lucide-react";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
export default function JobSection() {
    const [activeTab, setActiveTab] = useState("latest");
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});
    const routes = useRouter()
    const jobs = [
        {
            id: 0,
            title: "Senior Frontend Developer",
            company: "TechCorp Solutions",
            location: "San Francisco, CA (Remote)",
            type: "Full-time",
            statusColor: "bg-blue-100 text-blue-800",
            salary: "$120k - $150k",
            posted: "2 days ago",
            description: "Join our team to build cutting-edge web applications using React and modern frontend technologies.",
            tags: ["React", "TypeScript", "UI/UX"]
        },
        {
            id: 1,
            title: "DevOps Engineer",
            company: "Cloud Systems Inc.",
            location: "New York, NY",
            type: "Contract",
            statusColor: "bg-purple-100 text-purple-800",
            salary: "$95k - $115k",
            posted: "1 week ago",
            description: "Help us scale our infrastructure and improve deployment processes using modern cloud technologies.",
            tags: ["AWS", "Docker", "CI/CD"]
        },
        {
            id: 2,
            title: "UX/UI Designer",
            company: "Creative Digital",
            location: "Chicago, IL (Hybrid)",
            type: "Part-time",
            statusColor: "bg-green-100 text-green-800",
            salary: "$75k - $90k",
            posted: "3 days ago",
            description: "Create beautiful, intuitive user interfaces for our client-facing applications and products.",
            tags: ["Figma", "Design Systems", "Prototyping"]
        },
        {
            id: 3,
            title: "DevOps Engineer",
            company: "Cloud Systems Inc.",
            location: "New York, NY",
            type: "Contract",
            statusColor: "bg-purple-100 text-purple-800",
            salary: "$95k - $115k",
            posted: "1 week ago",
            description: "Help us scale our infrastructure and improve deployment processes using modern cloud technologies.",
            tags: ["AWS", "Docker", "CI/CD"]
        },
        {
            id: 4,
            title: "UX/UI Designer",
            company: "Creative Digital",
            location: "Chicago, IL (Hybrid)",
            type: "Part-time",
            statusColor: "bg-green-100 text-green-800",
            salary: "$75k - $90k",
            posted: "3 days ago",
            description: "Create beautiful, intuitive user interfaces for our client-facing applications and products.",
            tags: ["Figma", "Design Systems", "Prototyping"]
        },
        {
            id: 5,
            title: "DevOps Engineer",
            company: "Cloud Systems Inc.",
            location: "New York, NY",
            type: "Contract",
            statusColor: "bg-purple-100 text-purple-800",
            salary: "$95k - $115k",
            posted: "1 week ago",
            description: "Help us scale our infrastructure and improve deployment processes using modern cloud technologies.",
            tags: ["AWS", "Docker", "CI/CD"]
        },
    ];

    const toggleFavorite = (jobId: number) => {
        setFavorites(prev => ({
            ...prev,
            [jobId]: !prev[jobId]
        }));
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-10 px-4 mb-10">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <div className="flex bg-[#2cb67d] rounded-lg p-2 gap-2">
                    <button
                        onClick={() => setActiveTab("latest")}
                        className={`px-6 py-2 text-lg font-semibold cursor-pointer rounded-md transition ${activeTab === "latest" ? "bg-white bg-[#2cb67d]" : "text-white"
                            }`}
                    >
                        Latest Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab("recent")}
                        className={`px-6 py-2 text-lg font-semibold cursor-pointer rounded-md transition ${activeTab === "recent" ? "bg-white bg-[#2cb67d]" : "text-white"
                            }`}
                    >
                        Recent Jobs
                    </button>
                </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 relative flex flex-col h-full border border-gray-100"
                    >
                        {/* Job Type Label */}
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.statusColor} inline-block mb-2 w-fit`}>
                            {job.type}
                        </span>

                        {/* Company and Job Info */}
                        <div className="space-y-3 mb-auto">
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{job.title}</h3>
                            <p className="text-gray-700 font-medium">{job.company}</p>

                            <div className="flex items-center text-gray-600 text-sm">
                                <MapPin size={16} className="mr-1 flex-shrink-0" />
                                <span className="truncate">{job.location}</span>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <DollarSign size={16} className="flex-shrink-0" />
                                    <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} className="flex-shrink-0" />
                                    <span>{job.posted}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mt-2">{job.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {job.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <button
                                onClick={() => toggleFavorite(job.id)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                                aria-label={favorites[job.id] ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Heart
                                    size={20}
                                    className={favorites[job.id] ? "text-red-500" : "text-gray-400"}
                                    fill={favorites[job.id] ? "currentColor" : "none"}
                                />
                            </button>

                            <button className="px-4 py-2 bg-[#2cb67d] text-white font-medium rounded-lg hover:bg-[#2cb67d] transition focus:ring-2 focus:bg-[#2cb67d] focus:ring-opacity-50 text-sm cursor-pointer">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-12">
                <motion.button
                    className="bg-[#2cb67d] hover:bg-[#25a06e] text-white font-medium py-3 px-8 rounded-md transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { routes.push(`/alljobsshow`) }}
                >

                    VIEW MORE JOBS
                </motion.button>
            </div>
        </div>
    );
}
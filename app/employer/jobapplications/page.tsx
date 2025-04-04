'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function JobApplications() {
    // Sample data - you would replace this with your actual data fetching logic
    const [applications, setApplications] = useState([
        {
            id: 1,
            position: "Frontend Developer",
            company: "TechCorp Inc.",
            applicantName: "John Smith",
            appliedDate: "2025-03-28",
            status: "Under Review",
            resume: "resume_jsmith.pdf"
        },
        {
            id: 2,
            position: "UX Designer",
            company: "Design Solutions",
            applicantName: "Sarah Johnson",
            appliedDate: "2025-03-29",
            status: "Interview Scheduled",
            resume: "resume_sjohnson.pdf"
        },
        {
            id: 3,
            position: "Backend Developer",
            company: "TechCorp Inc.",
            applicantName: "Michael Brown",
            appliedDate: "2025-03-30",
            status: "New",
            resume: "resume_mbrown.pdf"
        },
        {
            id: 4,
            position: "Project Manager",
            company: "Innovative Solutions",
            applicantName: "Emily Davis",
            appliedDate: "2025-04-01",
            status: "Rejected",
            resume: "resume_edavis.pdf"
        },
        {
            id: 5,
            position: "Data Analyst",
            company: "DataFlow",
            applicantName: "David Wilson",
            appliedDate: "2025-04-02",
            status: "New",
            resume: "resume_dwilson.pdf"
        }
    ]);
    setApplications

    // Filter states
    const [statusFilter, setStatusFilter] = useState("All");

    // Get all unique statuses for filter dropdown
    const statuses = ["All", ...new Set(applications.map(app => app.status))];

    // Filtered applications based on selected status
    const filteredApplications = statusFilter === "All"
        ? applications
        : applications.filter(app => app.status === statusFilter);

    // Animation variants for list items
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Function to determine status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "bg-blue-500";
            case "Under Review": return "bg-yellow-500";
            case "Interview Scheduled": return "bg-purple-500";
            case "Rejected": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Applications</h1>
                <p className="text-gray-600">Manage and track all submitted job applications</p>
            </motion.div>

            {/* Filters and actions */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <label htmlFor="statusFilter" className="text-gray-700">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-md p-2"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Export to CSV
                </button>
            </div>

            {/* Applications list */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="bg-white rounded-lg shadow-md overflow-hidden"
            >
                {filteredApplications.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApplications.map((application) => (
                                <motion.tr
                                    key={application.id}
                                    variants={item}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{application.applicantName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{application.position}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{application.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(application.appliedDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No applications match your filter criteria.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
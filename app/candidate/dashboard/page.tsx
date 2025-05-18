"use client"
import url from '@/app/lib/url';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '@/app/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';



type Application = {
    id: number;
    company: string;
    title: string; // You used `position` in JSX, so we’ll map it accordingly
    status: string;
    application_date: string;
};
type Skill = {
    id: number
    jobseeker_profile_id: number
    skill_name: string
    proficiency: string
}

type Job = {
    id: number;
};


export default function CandidateDashboard() {


    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((stats: RootState) => stats.auth.token)
    const profile = useSelector((state: RootState) => state.profile)
    const router = useRouter(); // ✅ Next.js Router
    const employer = useAppSelector((state) => state.authemployer.employer)
    if (employer) {
        router.push('/')
        return toast.message("this page is for candidate only")
    }

    if (!user?.id) {
        router.push('/login')// Redirect to login page if user is not authenticated
    }

    const [applications, setApplications] = useState<Application[]>([]);
    const [skills, setSkills] = useState<Skill[]>([])

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`${url}/applications/${user?.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setApplications(res.data.applications); // Correct use
            } catch (error) {
                toast.error('Failed to load applications: ' + error);
            }
        };

        if (user?.id) fetchApplications();
    }, [user?.id]);


    useEffect(() => {
        if (user?.id && token) {
            fetchSkills()
        }
    }, [user, token])
    const fetchSkills = async () => {
        try {
            const res = await axios.get(`${url}/skills/${profile.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            //console.log(res.data)
            setSkills(res.data.data)
        } catch (err) {
            console.error('Error fetching skills:', err)
        }
    }

    const handleApply = (job: Job) => {
        console.log(job)
        router.push(`/jobs/${job.id}`);
    };

    // const handleDeleteSkill = async (id: number) => {
    //     try {
    //         await axios.delete(`${url}/skills/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         })
    //         fetchSkills()
    //     } catch (err) {
    //         console.error('Error deleting skill:', err)
    //     }
    // }


    const [upcomingInterviews, setUpcomingInterviews] = useState([
        { id: 1, company: "Tech Solutions Inc.", position: "Senior Developer", date: "2025-04-10", time: "14:00", type: "Technical" },
        { id: 2, company: "DataCore Systems", position: "Backend Developer", date: "2025-04-15", time: "11:00", type: "HR Screening" },
    ])


    const stats = {
        totalApplications: 12,
        interviewRate: "33%",
        responseRate: "75%",
        averageResponseTime: "5 days"
    }



    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
                <p className="text-gray-600">Welcome back,<span className='text-xl font-bold text-green-600'>{user?.full_name}!</span> {`Here's`} your job search overview.</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Total Applications</p>
                    <p className="text-2xl font-bold">{stats.totalApplications}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Interview Rate</p>
                    <p className="text-2xl font-bold">{stats.interviewRate}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Response Rate</p>
                    <p className="text-2xl font-bold">{stats.responseRate}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="text-2xl font-bold">{stats.averageResponseTime}</p>
                </div>
            </div>

            {/* Two column layout for main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Applications */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Your Applications</h2>
                            <button className="text-blue-600 hover:text-blue-800">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="text-left bg-gray-50">
                                    <tr>
                                        <th className="p-3">Company</th>
                                        <th className="p-3">Position</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {applications.map(app => (
                                        <tr key={app.id}>
                                            <td className="p-3">{app.company}</td>
                                            <td className="p-3">{app.title}</td> {/* previously 'position' */}
                                            <td className="p-3">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${app.status === 'Offer'
                                                        ? 'bg-green-100 text-green-800'
                                                        : app.status === 'Interview'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : app.status === 'Rejected'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {new Date(app.application_date).toLocaleDateString()}
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    //onClick={() => handleApply(app)}
                                                    className="text-blue-600 hover:text-blue-800 mr-2 cursor-pointer"
                                                >
                                                    View
                                                </button>
                                                <button className="text-red-600 hover:text-red-800 mr-2 cursor-pointer">delete</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Upcoming Interviews */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                        {upcomingInterviews.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingInterviews.map((interview, index) => (
                                    <div key={index} className="flex items-center p-4 border rounded-lg">
                                        <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-lg font-bold">{interview.date.split('-')[2]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{interview.company}</h3>
                                            <p className="text-sm text-gray-600">{interview.position} - {interview.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{interview.time}</p>
                                            <p className="text-sm text-gray-600">{interview.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No upcoming interviews scheduled.</p>
                        )}
                    </section>
                </div>

                {/* Right column - 1/3 width */}
                <div className="space-y-8">
                    {/* Profile Card */}
                    <section className="bg-white p-6 rounded-lg shadow text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                            {/* Profile image would go here */}
                            <div className="h-full text-3xl w-full flex items-center justify-center text-gray-500">
                                {user?.full_name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">{user?.full_name}</h2>
                        <p className="text-gray-600 mb-4">{profile.interested_area}</p>
                        <div className="flex justify-center space-x-2">
                            <Link href={'/candidate/profile'} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">Edit Profile</Link>
                            <Link href={`${profile.resume_link}`} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">Resume</Link>
                        </div>
                    </section>

                    {/* Saved Jobs */}
                    {/* <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
                        <div className="space-y-4">
                            {savedJobs.map(job => (
                                <div key={job.id} className="border rounded-lg p-4">
                                    <h3 className="font-medium">{job.position}</h3>
                                    <p className="text-gray-600 text-sm">{job.company}</p>
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span>{job.location}</span>
                                        <span className="font-medium">{job.salary}</span>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex-1">Apply</button>
                                        <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex-1">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section> */}

                    {/* Recommended Skills */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Recommended Skills</h2>
                        <motion.div
                            className="flex flex-wrap gap-2"
                            layout
                        >
                            <AnimatePresence>
                                {skills.slice(0, Math.ceil(skills.length)).map((skill) => (
                                    <motion.div
                                        key={skill.id}
                                        className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        layout
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {skill.skill_name} ({skill.proficiency})
                                        {/* <motion.button
                                            onClick={() => handleDeleteSkill(skill.id)}
                                            className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            ✕
                                        </motion.button> */}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </section>
                </div>
            </div>
        </div>
    )
}
"use client"
import { isTokenExpired } from '@/app/lib/checkToken';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '@/app/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function CandidateDashboard() {

    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter(); // ✅ Next.js Router
    const employer = useAppSelector((state) => state.authemployer.employer)
    if (employer) {
        router.push('/')
        return toast.message("this page is for candidate only")
    }

    if (!user?.id) {
        router.push('/login')// Redirect to login page if user is not authenticated
    }

    // Mock data - in a real app this would come from an API
    const [applications, setApplications] = useState([
        { id: 1, company: "Tech Solutions Inc.", position: "Senior Developer", status: "Interview", date: "2025-04-10" },
        { id: 2, company: "Global Innovations", position: "Full Stack Engineer", status: "Applied", date: "2025-03-28" },
        { id: 3, company: "Future Systems", position: "Frontend Developer", status: "Rejected", date: "2025-03-15" },
        { id: 4, company: "Creative Digital", position: "UX Developer", status: "Offer", date: "2025-03-30" },
    ])

    const [upcomingInterviews, setUpcomingInterviews] = useState([
        { id: 1, company: "Tech Solutions Inc.", position: "Senior Developer", date: "2025-04-10", time: "14:00", type: "Technical" },
        { id: 2, company: "DataCore Systems", position: "Backend Developer", date: "2025-04-15", time: "11:00", type: "HR Screening" },
    ])

    const [savedJobs, setSavedJobs] = useState([
        { id: 5, company: "Innovative Tech", position: "React Developer", location: "Remote", salary: "$120k-150k" },
        { id: 6, company: "Dream Corp", position: "Senior Frontend Engineer", location: "New York", salary: "$130k-160k" },
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
                                            <td className="p-3">{app.position}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'Offer' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                                                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-3">{app.date}</td>
                                            <td className="p-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
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
                                {upcomingInterviews.map(interview => (
                                    <div key={interview.id} className="flex items-center p-4 border rounded-lg">
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
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                                JD
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">John Doe</h2>
                        <p className="text-gray-600 mb-4">Senior Frontend Developer</p>
                        <div className="flex justify-center space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit Profile</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Resume</button>
                        </div>
                    </section>

                    {/* Saved Jobs */}
                    <section className="bg-white p-6 rounded-lg shadow">
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
                    </section>

                    {/* Recommended Skills */}
                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Recommended Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Node.js</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">GraphQL</span>
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">AWS</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
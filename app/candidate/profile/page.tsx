"use client"
import { useAppSelector } from '@/app/redux/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ProfileJobSeeker() {

    const router = useRouter()
    const isAuthenticated = useAppSelector((state) => state.auth.user)
    if (!isAuthenticated) {
        router.push('/login')
    }
    // Sample data - in a real app this would come from props or API
    const profileData = {
        name: "John Doe",
        title: "Frontend Developer",
        location: "San Francisco, CA",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        about: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications.",
        skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "UI/UX Design"],
        experience: [
            {
                company: "Tech Solutions Inc.",
                position: "Senior Frontend Developer",
                duration: "2020 - Present"
            },
            {
                company: "Web Innovations",
                position: "Frontend Developer",
                duration: "2018 - 2020"
            }
        ],
        education: [
            {
                institution: "University of Technology",
                degree: "BS in Computer Science",
                year: "2018"
            }
        ],
        applications: [
            { company: "Acme Corp", position: "UI Developer", status: "In Review", date: "Mar 28, 2025" },
            { company: "TechGiant", position: "Frontend Engineer", status: "Interview Scheduled", date: "Mar 25, 2025" },
            { company: "StartupXYZ", position: "React Developer", status: "Applied", date: "Mar 22, 2025" }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header with profile overview */}
            <div className="bg-white shadow rounded-lg mb-6 p-6">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-2xl">
                            {profileData.name.split(' ').map(name => name[0]).join('')}
                        </div>
                    </div>
                    <div className="w-full md:w-3/4">
                        <h1 className="text-2xl font-bold mb-1">{profileData.name}</h1>
                        <h2 className="text-xl text-gray-600 mb-2">{profileData.title}</h2>
                        <div className="flex flex-wrap mb-4">
                            <div className="mr-4 mb-2">
                                <span className="text-gray-600">📍 {profileData.location}</span>
                            </div>
                            <div className="mr-4 mb-2">
                                <span className="text-gray-600">✉️ {profileData.email}</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-gray-600">📱 {profileData.phone}</span>
                            </div>
                        </div>
                        <p className="text-gray-700">{profileData.about}</p>
                    </div>
                </div>
            </div>

            {/* Dashboard Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Job Application Stats */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Application Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-500">8</div>
                            <div className="text-sm text-gray-600">Total Applications</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-500">3</div>
                            <div className="text-sm text-gray-600">Interviews</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-500">4</div>
                            <div className="text-sm text-gray-600">In Review</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-500">1</div>
                            <div className="text-sm text-gray-600">Offers</div>
                        </div>
                    </div>
                </div>

                {/* Profile Completion */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Profile Completion</h3>
                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Overall</span>
                            <span className="text-gray-700">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Basic Info</span>
                            <span className="text-green-600">✓ Complete</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Work Experience</span>
                            <span className="text-green-600">✓ Complete</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Education</span>
                            <span className="text-green-600">✓ Complete</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Portfolio</span>
                            <span className="text-yellow-600">⚠ Incomplete</span>
                        </div>
                    </div>
                </div>

                {/* Recommended Jobs */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Recommended Jobs</h3>
                    <div className="space-y-4">
                        <div className="border-b pb-3">
                            <h4 className="font-medium">Senior React Developer</h4>
                            <p className="text-gray-600 text-sm">TechCorp • San Francisco, CA</p>
                            <p className="text-gray-500 text-sm">$120k - $150k • Remote</p>
                        </div>
                        <div className="border-b pb-3">
                            <h4 className="font-medium">Frontend Engineer</h4>
                            <p className="text-gray-600 text-sm">InnovateTech • New York, NY</p>
                            <p className="text-gray-500 text-sm">$110k - $140k • Hybrid</p>
                        </div>
                        <div className="pb-2">
                            <h4 className="font-medium">UI/UX Developer</h4>
                            <p className="text-gray-600 text-sm">DesignMasters • Seattle, WA</p>
                            <p className="text-gray-500 text-sm">$100k - $130k • On-site</p>
                        </div>
                    </div>
                    <button className="mt-3 text-blue-600 text-sm font-medium">View all recommendations →</button>
                </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Recent Applications</h3>
                    <button className="text-blue-600 text-sm font-medium">View all →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {profileData.applications.map((app, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.company}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${app.status === 'Interview Scheduled' ? 'bg-green-100 text-green-800' :
                                                app.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-blue-600 hover:text-blue-900">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Skills and Experience Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Experience</h3>
                    <div className="space-y-4">
                        {profileData.experience.map((exp, index) => (
                            <div key={index} className={index < profileData.experience.length - 1 ? "border-b pb-4" : ""}>
                                <h4 className="font-medium">{exp.position}</h4>
                                <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client"
import urlemployer from '@/app/lib/employer';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '@/app/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AnalyticsDashboard from './lineandbargraph/page';

type Job = {
    id: number;
    employer_id: number;
    title: string;
    company: string;
    location: string;
    employment_type: string;
    experience_level: string;
    salary: string;
    description: string;
    requirements: string;
    benefits: string;
    application_deadline: string;
    contact_email: string;
    created_at: string;
    // Optional:
    applicants?: number;
    department?: string; // If added later
};


export default function EmployeeJobDashboard() {
    // Sample data - in a real application, this would come from an API or props
    const [activeTab, setActiveTab] = useState('posted');
    const [postedJobs, setPostedJobs] = useState<Job[]>([]);
    const employer = useAppSelector((state: RootState) => state.authemployer.employer)
    const router = useRouter()
    const user = useAppSelector((state: RootState) => state.auth.user)

    if (user?.id) {
        router.push("/")// redirect to login page
        return toast.message("this page is for employer only")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${urlemployer}/jobs/${employer?.id}`);
                setPostedJobs(res.data);
                console.log(res.data); // Handle your response data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    // const postedJobs = [
    //     { id: 1, title: "Frontend Developer", applicants: 12, status: "Active", postedDate: "2025-03-28", location: "Remote", department: "Engineering", salary: "$90,000 - $120,000" },
    //     { id: 2, title: "UI/UX Designer", applicants: 8, status: "Active", postedDate: "2025-03-25", location: "New York", department: "Design", salary: "$85,000 - $105,000" },
    //     { id: 3, title: "Backend Engineer", applicants: 5, status: "Closed", postedDate: "2025-03-15", location: "San Francisco", department: "Engineering", salary: "$100,000 - $130,000" },
    //     { id: 4, title: "Product Manager", applicants: 10, status: "Active", postedDate: "2025-03-30", location: "Chicago", department: "Product", salary: "$110,000 - $140,000" }
    // ];

    const applicantStats = {
        totalApplications: 35,
        newToday: 6,
        interviewScheduled: 8,
        rejected: 4,
        hired: 2,
        averageResponseTime: "1.5 days",
        topSourceChannel: "LinkedIn"
    };

    const recentActivity = [
        { id: 1, type: "Application", job: "Frontend Developer", applicant: "Alex Johnson", time: "2 hours ago" },
        { id: 2, type: "Interview", job: "UI/UX Designer", applicant: "Maria Garcia", time: "Yesterday" },
        { id: 3, type: "Job View", job: "Product Manager", applicant: null, time: "Today", views: 24 },
        { id: 4, type: "Hired", job: "Backend Engineer", applicant: "James Wilson", time: "3 days ago" }
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className='text-black text-2xl'>Welcome <span className='text-green-600'>{employer?.first_name}</span></p>
                    <p className="text-gray-600">View and manage your job postings, applicant stats,</p>
                </div>
                <div className="flex space-x-2">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                        Export Data
                    </button>

                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => (router.push("/employer/post-job"))}
                    >
                        Post New Job
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">Total Jobs Posted</p>
                    <p className="text-2xl font-bold">{postedJobs.length}</p>
                    <p className="text-sm text-green-600 mt-1">+2 this month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">Total Applicants</p>
                    <p className="text-2xl font-bold">{applicantStats.totalApplications}</p>
                    <p className="text-sm text-green-600 mt-1">+12 this week</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">New Applications Today</p>
                    <p className="text-2xl font-bold">{applicantStats.newToday}</p>
                    <p className="text-sm text-gray-500 mt-1">Avg. {applicantStats.averageResponseTime} response</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-500">Interviews Scheduled</p>
                    <p className="text-2xl font-bold">{applicantStats.interviewScheduled}</p>
                    <p className="text-sm text-gray-500 mt-1">2 this week</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h2 className="text-lg font-medium mb-3">Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivity.map(activity => (
                        <div key={activity.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${activity.type === "Application" ? "bg-blue-100 text-blue-600" :
                                activity.type === "Interview" ? "bg-yellow-100 text-yellow-600" :
                                    activity.type === "Job View" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                                }`}>
                                {activity.type === "Application" ? "A" :
                                    activity.type === "Interview" ? "I" :
                                        activity.type === "Job View" ? "V" : "H"}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{activity.type} - {activity.job}</p>
                                <p className="text-xs text-gray-500">
                                    {activity.applicant ? activity.applicant : activity.type === "Job View" ? `${activity.views} views` : ""} • {activity.time}
                                </p>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex -mb-px">
                    <button
                        onClick={() => setActiveTab('posted')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'posted'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Posted Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('applicants')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applicants'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Applicant Tracking
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        Settings
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'posted' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 flex justify-between items-center border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <input type="text" placeholder="Search jobs..." className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
                            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Closed</option>
                                <option>Draft</option>
                            </select>
                            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Design</option>
                                <option>Product</option>
                            </select>
                        </div>
                        <div>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm1 5a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 5a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Job Title
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Posted Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applicants
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {postedJobs.map((job, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                        <div className="text-xs text-gray-500">{job.salary}</div>
                                    </td>



                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {job.location}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.application_deadline && new Date(job.application_deadline) > new Date()
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {/* Show Active/Expired based on deadline */}
                                            {job.application_deadline && new Date(job.application_deadline) > new Date()
                                                ? 'Active'
                                                : 'Closed'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(job.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* Placeholder until you count applicants */}
                                        {job.applicants || 0}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">View</button>
                                        <button className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">Edit</button>
                                        <button className="text-red-600 hover:text-red-900 cursor-pointer">Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{postedJobs.length}</span> of <span className="font-medium">{postedJobs.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="border border-gray-300 px-3 py-1 rounded text-sm disabled:opacity-50">Previous</button>
                            <button className="border border-gray-300 px-3 py-1 rounded text-sm bg-blue-50 text-blue-600 font-medium">1</button>
                            <button className="border border-gray-300 px-3 py-1 rounded text-sm disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'applicants' && (
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium mb-4">Applicant Status Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-blue-700 font-medium">New Applications</p>
                                <p className="text-2xl font-bold">{applicantStats.newToday}</p>
                                <p className="text-xs text-blue-600">+2 today</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="text-gray-700 font-medium">In Review</p>
                                <p className="text-2xl font-bold">{applicantStats.totalApplications - applicantStats.interviewScheduled - applicantStats.rejected - applicantStats.hired}</p>
                                <p className="text-xs text-gray-600">5 need attention</p>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-yellow-700 font-medium">Interview Stage</p>
                                <p className="text-2xl font-bold">{applicantStats.interviewScheduled}</p>
                                <p className="text-xs text-yellow-600">3 this week</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-red-700 font-medium">Rejected</p>
                                <p className="text-2xl font-bold">{applicantStats.rejected}</p>
                                <p className="text-xs text-red-600">2 recently</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <p className="text-green-700 font-medium">Hired</p>
                                <p className="text-2xl font-bold">{applicantStats.hired}</p>
                                <p className="text-xs text-green-600">+1 this month</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Application Sources</h3>
                                <span className="text-xs text-gray-500">Top source: {applicantStats.topSourceChannel}</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-2/5"></div>
                            </div>
                            <div className="flex text-xs mt-1 text-gray-500 justify-between">
                                <span>LinkedIn: 40%</span>
                                <span>Indeed: 25%</span>
                                <span>Company Site: 20%</span>
                                <span>Referrals: 15%</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Recent Applicants</h3>
                            <button className="text-blue-600 text-sm hover:text-blue-800">View All</button>
                        </div>

                        <div className="overflow-hidden overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">Alex Johnson</div>
                                            <div className="text-xs text-gray-500">alex.j@example.com</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">Frontend Developer</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">New</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LinkedIn</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900">Review</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">Maria Garcia</div>
                                            <div className="text-xs text-gray-500">maria.g@example.com</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">UI/UX Designer</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yesterday</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Interview</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Indeed</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900">Review</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium">James Wilson</div>
                                            <div className="text-xs text-gray-500">james.w@example.com</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">Backend Engineer</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 days ago</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Hired</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Referral</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900">View</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <AnalyticsDashboard />

            )
            }

            {
                activeTab === 'settings' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium mb-4">Dashboard Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-md font-medium mb-3">Notification Preferences</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm">New application notifications</label>
                                        <div className="relative inline-block w-10 h-5">
                                            <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-blue-600 rounded-full"></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm">Job post expiration warnings</label>
                                        <div className="relative inline-block w-10 h-5">
                                            <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked />
                                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-blue-600 rounded-full"></span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm">Daily activity summary</label>
                                        <div className="relative inline-block w-10 h-5">
                                            <input type="checkbox" className="opacity-0 w-0 h-0" />
                                            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Template Settings */}
                            <div>
                                <h3 className="text-md font-medium mb-3">Job Template Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Default Job Template
                                    </label>
                                    <select

                                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    >
                                        <option value="Standard Job Template">Standard Job Template</option>
                                        <option value="Engineering Template">Engineering Template</option>
                                        <option value="Design Template">Design Template</option>
                                        <option value="Marketing Template">Marketing Template</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                )
            }
        </div>
    )
}
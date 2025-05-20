"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import urlemployer from '@/app/lib/employer';

interface JobPerformance {
    title: string;
    views: number;
    applications: number;
    conversion_rate: string;
    time_to_fill: string;
    cost_per_hire: string;
}

export default function AnalyticsDashboard() {
    const [jobsPostedData, setJobsPostedData] = useState([]);
    const [applicationsData, setApplicationsData] = useState([]);
    const [jobPerformanceData, setJobPerformanceData] = useState<JobPerformance[]>([]);
    const [timeRange, setTimeRange] = useState('30');

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get(`${urlemployer}/analytics`);
            setJobsPostedData(res.data.jobsPostedData);
            setApplicationsData(res.data.applicationsData);
            setJobPerformanceData(res.data.jobPerformanceData);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };




    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Job Performance Analytics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Jobs Posted per Month</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={jobsPostedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" fontSize={11} />
                                    <YAxis fontSize={11} />
                                    <Tooltip />
                                    <Bar dataKey="jobs" fill="#4f46e5" name="Jobs Posted" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Applications per Month</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={applicationsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" fontSize={11} />
                                    <YAxis fontSize={11} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="applications" stroke="#4f46e5" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-500">Job Posting Performance</h3>
                        <select
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                            <option value="365">This Year</option>
                        </select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time to Fill</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cost per Hire</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobPerformanceData.map((job, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-2 text-sm">{job.title}</td>
                                        <td className="px-3 py-2 text-sm">{job.views}</td>
                                        <td className="px-3 py-2 text-sm">{job.applications}</td>
                                        <td className="px-3 py-2 text-sm">{job.conversion_rate}</td>
                                        <td className="px-3 py-2 text-sm">{job.time_to_fill}</td>
                                        <td className="px-3 py-2 text-sm">{job.cost_per_hire}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

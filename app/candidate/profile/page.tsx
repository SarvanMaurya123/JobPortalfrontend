"use client";
import { motion } from 'framer-motion';
import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {

    MapPin,
    Mail,
    Phone,
    Clock,
    AlertTriangle,
    CheckCircle,
    Briefcase,
    Award,
    CheckSquare,

    PieChart,
} from "lucide-react";
import axios from "axios";
import url from "@/app/lib/url";
import { toast } from 'sonner';
import SkillSection from './skilles/page';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile as setProfileRedux } from "@/app/store/slices/profileSlice"; // ✅ rename the Redux one
import { isTokenExpired } from '@/app/lib/checkToken';
import ProfileCompletion from './progressbar/page';


interface BasicProfileData {
    full_name: string;
    title: string; // <- from interested_area
    location: string;
    email: string;
    phone: string; // <- from phone_number
    about: string;
    resume_link: string;
}


export default function ProfileJobSeeker() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);

    const [profileData, setProfileData] = useState<BasicProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!token && !!user && !isTokenExpired(token);

    const employer = useAppSelector((state) => state.authemployer.employer)
    if (employer) {
        router.push('/')
        return toast.message("this page is for candidate only")
    }
    useEffect(() => {
        if (!isAuthenticated) {
            return router.push("/login");
        }

        if (user?.id) {
            fetchProfileData();
        }
    }, [user]);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${url}/profile/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = res.data?.data;
            dispatch(setProfileRedux(data)); // ✅ correct Redux action

            if (!data || Object.keys(data).length === 0) {
                setProfileData(null); // triggers create profile UI
            } else {
                setProfileData({
                    full_name: data.full_name,
                    title: data.interested_area,
                    location: data.location,
                    email: data.email,
                    phone: data.phone_number,
                    about: data.about,
                    resume_link: data.resume_link,
                });
            }
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message === "Profile not found") {
                setProfileData(null);
            } else {
                setError(err.response?.data?.message || err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await axios.delete(`${url}/profile/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            toast.success("Profile deleted successfully");
            // Add logic to reset user state or redirect if needed
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete profile");
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl flex items-center">
                    <Clock className="animate-spin mr-2" size={24} />
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-red-500 flex items-center">
                    <AlertTriangle className="mr-2" size={24} />
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {updateSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center">
                    <CheckCircle className="mr-2" size={18} />
                    <span className="block sm:inline">Profile updated successfully!</span>
                </div>
            )}

            {profileData ? (
                <div className="bg-white shadow rounded-lg mb-6 p-6">

                    <div className='flex flex-col sm:flex-row gap-3 mt-2 md:mt-0'>
                        <h1 className="text-2xl font-bold mb-1">{profileData.full_name}</h1>
                        <div className='m-2'>
                            {<a className="px-4 py-2 bg-green-600 rounded-xl text-white text-center hover:bg-green-700 transition"

                                href={`${user?.portfolio}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Portfolio</a>}
                            {<a className="px-4 mx-2.5 py-2 bg-green-600 rounded-xl text-white text-center hover:bg-green-700 transition"

                                href={`${user?.linked_in}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Go To Linkedin</a>}
                        </div>
                    </div>
                    <h2 className="text-xl text-gray-600 mb-2">{profileData.title}</h2>
                    <div className="flex flex-wrap mb-4">
                        <div className="mr-4 mb-2 flex items-center text-gray-600">
                            <MapPin size={16} className="mr-1" />
                            {profileData.location}
                        </div>
                        <div className="mr-4 mb-2 flex items-center text-gray-600">
                            <Mail size={16} className="mr-1" />
                            {profileData.email}
                        </div>
                        <div className="mb-2 flex items-center text-gray-600">
                            <Phone size={16} className="mr-1" />
                            {profileData.phone}
                        </div>
                    </div>
                    <p className="text-gray-700">{profileData.about}</p>
                    <motion.section>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">Resume</h3>
                        <div className="flex items-center flex justify-between">
                            <a
                                href={profileData.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600  text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors cursor-pointer"
                            >
                                <span className="mr-2">📄</span>
                                <span>Download Resume</span>
                            </a>
                            <div>
                                <button
                                    onClick={() => router.push("/candidate/profile/basicinfoupdate")}
                                    className="bg-green-600  text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors cursor-pointer"
                                >
                                    Update
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors cursor-pointer m-4">
                                    Delete
                                </button >

                            </div>
                        </div>
                    </motion.section>
                </div>

            ) : (
                <div className="bg-white shadow rounded-lg mb-6 p-6 flex justify-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => router.push("/candidate/profile/profileinfogive")}
                    >
                        Create Profile
                    </button>
                </div>
            )}

            {/* Dashboard Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Application Stats */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <PieChart size={20} className="mr-2" />
                        Application Status
                    </h3>
                    {/* {profileData?.applications ? (
                        <div className="grid grid-cols-2 gap-4">
                            <DashboardStat
                                count={profileData.applications.length}
                                label="Total Applications"
                                icon={<Briefcase size={14} />}
                                color="text-blue-500"
                            />
                            <DashboardStat
                                count={profileData.applications.filter(a => a.status === "Interview Scheduled").length}
                                label="Interviews"
                                icon={<Calendar size={14} />}
                                color="text-green-500"
                            />
                            <DashboardStat
                                count={profileData.applications.filter(a => a.status === "In Review").length}
                                label="In Review"
                                icon={<Clock size={14} />}
                                color="text-yellow-500"
                            />
                            <DashboardStat
                                count={profileData.applications.filter(a => a.status === "Offer").length}
                                label="Offers"
                                icon={<Award size={14} />}
                                color="text-purple-500"
                            />
                        </div>
                    ) : (
                        <p>Loading applications...</p>
                    )} */}

                </div>

                {/* Profile Completion */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <CheckSquare size={20} className="mr-2" />
                        Profile Completion
                    </h3>
                    <ProfileCompletion />
                </div>

                {/* Recent Applications */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Briefcase size={20} className="mr-2" />
                        Recent Applications
                    </h3>
                    <div className="space-y-3">
                        {/* {profileData?.applications?.slice(0, 3).map((app, index) => (
                            <div key={index} className="border-b pb-2 last:border-b-0">
                                <div className="font-medium">{app.position}</div>
                                <div className="text-sm text-gray-600 flex items-center">
                                    <Building size={14} className="mr-1" />
                                    {app.company}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">{app.date}</div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
            {/* Skills */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-wrap gap-2">
                    <SkillSection />
                </div>
            </div>
        </div>


    );
}

// ✅ Reusable Component: Dashboard Stat Box
function DashboardStat({ count, label, icon, color }: { count: number; label: string; icon: React.ReactNode; color: string }) {
    return (
        <div className="border rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-sm text-gray-600 flex items-center justify-center">
                {icon}
                {label}
            </div>
        </div>
    );
}

// // ✅ Reusable Component: Progress Bar
// function Progress({ label, percent }: { label: string; percent: number }) {
//     return (
//         <div className="mb-4">
//             <div className="flex justify-between mb-1">
//                 <span className="text-gray-700">{label}</span>
//                 <span className="text-gray-700">{percent}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
//             </div>
//         </div>
//     );
// }

// // ✅ Reusable Component: Completion Item
// function CompletionItem({ label, complete }: { label: string; complete: boolean }) {
//     const icon = complete ? <CheckCircle size={14} className="mr-1" /> : <AlertTriangle size={14} className="mr-1" />;
//     const color = complete ? "text-green-600" : "text-yellow-600";
//     return (
//         <div className="flex justify-between">
//             <span className="text-gray-600 flex items-center">

//             </span>
//             <span className={`${color} flex items-center`}>{icon} {complete ? "Complete" : "Incomplete"}</span>
//         </div>
//     );
// }


{/* Skills and Experience Section */ }
<div className="">
    {/* Skills */}
    <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
            <Award size={20} className="mr-2" />
            Skills
        </h3>
        <div className="flex flex-wrap gap-2">
            <SkillSection />
        </div>
    </div>
    <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
            <Briefcase size={20} className="mr-2" />
            Education
        </h3>
        <div className="">

        </div>
    </div>
</div>




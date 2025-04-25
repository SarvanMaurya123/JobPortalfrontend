"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import url from "@/app/lib/url";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export interface PersonalInfo {
    full_name: string;
    email: string;
    phone_number: string;
    linked_in?: string;
    portfolio?: string;
}

export interface Education {
    degree: string;
    field_of_study: string;
    institution: string;
    start_year: string;
    end_year: string;
}

export interface Experience {
    title: string;
    company: string;
    start_date: string;
    end_date: string;
    description: string;
}

export interface Skill {
    name: string;
    proficiency: string;
}

export interface JobSeekerProfile {
    personalInfo: PersonalInfo;
    education?: Education[];
    experience?: Experience[];
    skills?: Skill[];
    about?: string;
    resume_link?: string;
}

interface JobSeekerProfileProps {
    profile: JobSeekerProfile;
}


const JobseekerProfileView = () => {
    const [profileData, setProfileData] = useState<JobSeekerProfileProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const profileId = useSelector((state: RootState) => state.profile.id);
    const userId = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${url}/resume/${profileId}/${userId?.id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to fetch");

                setProfileData(data.data);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Something went wrong");
                }
                setLoading(false);

            }
        };

        if (profileId && userId) {
            fetchProfileData();
        }
    }, [profileId, userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    if (!profileData) {
        return <div>No profile data available</div>;
    }

    const { profile } = profileData;  // Destructure profile from profileData

    const { personalInfo, about, resume_link, education, experience, skills } = profile;

    const formatDate = (dateString: string) => {
        if (!dateString || dateString === "Present") return "Present";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-r from-white to-gray-50 shadow-xl rounded-lg p-8 mt-10 mb-10 space-y-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-bold mb-2 text-gray-800">{personalInfo.full_name}</h2>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>{personalInfo.email}</span>
                    <span className="text-gray-300">|</span>
                    <span>{personalInfo.phone_number}</span>
                </p>
                {personalInfo.linked_in && <p className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-1">LinkedIn: {personalInfo.linked_in}</p>}
                {personalInfo.portfolio && <p className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-1">Portfolio: {personalInfo.portfolio}</p>}
                {resume_link && <a href={resume_link} target="_blank" className="inline-block mt-2 text-blue-600 hover:text-blue-800 underline transition-colors">View Resume</a>}
            </div>

            {about && (
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
                    <p className="text-gray-700 leading-relaxed">{about}</p>
                </div>
            )}

            {education && education.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Education</h3>
                    {education.map((edu, idx) => (
                        <div key={idx} className="mb-4 pl-3 border-l-2 border-blue-300">
                            <p className="font-medium text-gray-800">{edu.degree} in {edu.field_of_study}</p>
                            <p className="text-sm text-gray-600">{edu.institution} ({edu.start_year} - {edu.end_year})</p>
                        </div>
                    ))}
                </div>
            )}


            {experience && experience.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Experience</h3>
                    {experience.map((exp: Experience, idx: number) => (
                        <div key={idx} className="mb-4 pl-3 border-l-2 border-green-300">
                            <p className="font-medium text-gray-800">{exp.title} at {exp.company}</p>
                            <p className="text-sm text-gray-600 mb-1">
                                {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {skills && skills.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Skills</h3>
                    <ul className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill: Skill, idx: number) => (
                            <li key={idx} className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-sm px-4 py-1.5 rounded-full shadow-sm transition-transform hover:scale-105">
                                {skill.name} ({skill.proficiency})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </motion.div>
    );
};

export default JobseekerProfileView;

"use client";

import { JSX, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertTriangle, User, Briefcase, GraduationCap, FileText, PenTool, Sparkles } from "lucide-react";
import { RootState } from "@/app/store";
import url from "@/app/lib/url";

type CompletionState = {
    basicInfo: {
        full_name?: string;
        resume_link?: string;
    } | null;
    education: boolean;
    experience: boolean;
    skills: boolean;
    portfolio: boolean;
};


function Progress({ label, percent }: { label: string; percent: number }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-gray-700">{label}</span>
                <span className="text-gray-700">{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}

function CompletionItem({ label, complete }: { label: string; complete: boolean }) {
    const icon = complete ? <CheckCircle size={14} className="mr-1" /> : <AlertTriangle size={14} className="mr-1" />;
    const color = complete ? "text-green-600" : "text-yellow-600";
    const iconMap: Record<string, JSX.Element> = {
        "Basic Info": <User size={14} className="mr-1" />,
        "Work Experience": <Briefcase size={14} className="mr-1" />,
        "Education": <GraduationCap size={14} className="mr-1" />,
        "Resume": <FileText size={14} className="mr-1" />,
        "Portfolio": <PenTool size={14} className="mr-1" />,
        "Skills": <Sparkles size={14} className="mr-1" />, // ✅ Added icon
    };

    return (
        <div className="flex justify-between items-center py-1">
            <span className="text-gray-600 flex items-center">
                {iconMap[label]} {label}
            </span>
            <span className={`${color} flex items-center`}>{icon} {complete ? "Complete" : "Incomplete"}</span>
        </div>
    );
}

export default function ProfileCompletion() {
    const profileId = useSelector((state: RootState) => state.profile.id);
    const token = useSelector((state: RootState) => state.auth.token);
    const router = useRouter();

    const [completion, setCompletion] = useState<CompletionState>({
        basicInfo: null,
        education: false,
        experience: false,
        skills: false,
        portfolio: false,
    });

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchCompletion = async () => {
            try {
                const res = await axios.get(`${url}/completion/${profileId}`);
                const data = res.data.data;
                setCompletion({
                    basicInfo: data.basicInfo || null,
                    education: data.education.length > 0,
                    experience: data.experience.length > 0,
                    skills: data.skills.length > 0,
                    portfolio: !!data.portfolio,
                });


            } catch (err) {
                console.error("Error fetching profile completion data:", err);
            }
        };

        if (profileId) {
            fetchCompletion();
        }
    }, [profileId, token]);

    const completedSections = Object.values(completion).filter(Boolean).length;
    const totalSections = Object.keys(completion).length;
    const percentComplete = Math.floor((completedSections / totalSections) * 100);

    return (
        <div className="max-w-xl mx-auto mt-8 p-4 bg-white ">
            <Progress label="Completed" percent={percentComplete} />
            <div className="space-y-2">
                <CompletionItem label="Basic Info" complete={!!completion.basicInfo?.full_name} />
                <CompletionItem label="Education" complete={completion.education} />
                <CompletionItem label="Work Experience" complete={completion.experience} />
                <CompletionItem label="Resume" complete={!!completion.basicInfo?.resume_link} />
                <CompletionItem label="Portfolio" complete={completion.portfolio} />
                <CompletionItem label="Skills" complete={completion.skills} />
            </div>
        </div>
    );
}

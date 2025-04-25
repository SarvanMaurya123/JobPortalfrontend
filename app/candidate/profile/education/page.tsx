"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import url from "@/app/lib/url";
import { isTokenExpired } from "@/app/lib/checkToken";
import { useRouter } from "next/navigation";

interface EducationEntry {
    id: number;
    jobseeker_profile_id: Number;
    institution_name: string;
    degree?: string;
    field_of_study?: string;
    start_year?: number;
    end_year?: number;
    grade_or_percentage?: string;
}

export default function Education() {
    const [educationList, setEducationList] = useState<EducationEntry[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        institution_name: "",
        degree: "",
        field_of_study: "",
        start_year: "",
        end_year: "",
        grade_or_percentage: "",
    });
    const router = useRouter()
    const profileId = useSelector((state: RootState) => state.profile.id);
    const user = useSelector((state: RootState) => state.auth.user)
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = !!token && !!user && !isTokenExpired(token);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const res = await axios.get(`${url}/education/${profileId}`);
            setEducationList(res.data.education);
        } catch (err) {
            console.error("Error fetching education:", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(`${url}/education`, {
                ...formData,
                jobseeker_profile_id: profileId,
                start_year: Number(formData.start_year),
                end_year: Number(formData.end_year),

            });
            fetchEducation(); // Refresh list
            setShowForm(false);
            setFormData({
                institution_name: "",
                degree: "",
                field_of_study: "",
                start_year: "",
                end_year: "",
                grade_or_percentage: "",
            });
        } catch (err) {
            console.error("Error adding education:", err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${url}/education/${id}`);
            fetchEducation(); // Refresh list
        } catch (err) {
            console.error("Error deleting education:", err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Education Details</h2>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 cursor-pointer"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Cancel" : "Add Education"}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow mb-6">
                    <input
                        name="institution_name"
                        placeholder="Institution Name"
                        value={formData.institution_name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        name="degree"
                        placeholder="Degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        name="field_of_study"
                        placeholder="Field of Study"
                        value={formData.field_of_study}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        name="start_year"
                        placeholder="Start Year"
                        type="number"
                        value={formData.start_year}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        name="end_year"
                        placeholder="End Year"
                        type="number"
                        value={formData.end_year}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        name="grade_or_percentage"
                        placeholder="Grade / Percentage"
                        value={formData.grade_or_percentage}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
                        Save
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {educationList.map((edu) => (
                    <div key={edu.id} className="border p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{edu.institution_name}</p>
                                <p className="text-sm">{edu.degree} in {edu.field_of_study}</p>
                                <p className="text-sm">{edu.start_year} - {edu.end_year}</p>
                                <p className="text-sm">Grade: {edu.grade_or_percentage}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(edu.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

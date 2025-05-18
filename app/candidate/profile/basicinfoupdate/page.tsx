'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '@/app/redux/hooks'
import url from '@/app/lib/url'
import { FileText, Save } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function UpdateProfilePage() {
    const router = useRouter()
    const token = useAppSelector((state) => state.auth.token)
    const user = useAppSelector((state) => state.auth.user)

    const [formData, setFormData] = useState({
        full_name: '',
        interested_area: '',
        location: '',
        phone_number: '',
        about: '',
        resume_link: '',
        email: '',
        date_of_birth: ''
    })

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }
    },);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${url}/profile/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = res.data.data
            setFormData({
                full_name: data.full_name,
                interested_area: data.interested_area,
                location: data.location,
                phone_number: data.phone_number,
                about: data.about,
                resume_link: data.resume_link,
                email: data.email,
                date_of_birth: data.date_of_birth?.split('T')[0], // format to YYYY-MM-DD
            })
        }

        fetchData()
    }, [token, user?.id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const handleSubmit = async () => {
        await axios.put(`${url}/profile/${user?.id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        toast.success("Profile updated!")
    }

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">

                Update Profile
            </h2>

            <div className="mb-4 relative">

                <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="mb-4 relative">
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="mb-4 relative">
                <input
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    type="date"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>


            <div className="mb-4 relative">

                <input
                    name="interested_area"
                    value={formData.interested_area}
                    onChange={handleChange}
                    placeholder="Title / Interest"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="mb-4 relative">

                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="mb-4 relative">

                <input
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <div className="mb-4 relative">

                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="About"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                />
            </div>

            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText size={16} className="text-gray-400" />
                </div>
                <input
                    name="resume_link"
                    value={formData.resume_link}
                    onChange={handleChange}
                    placeholder="Resume Link"
                    className="w-full border border-gray-300 pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div
                onClick={() => router.push("/candidate/profile")}
            >
                <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300 font-medium"

                >
                    <Save size={16} className="mr-2"

                    />
                    Save Profile
                </button>
            </div>
        </div>
    )
}

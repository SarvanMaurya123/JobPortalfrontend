'use client';
import Loader from "@/app/componente/Loader";
import url from "@/app/lib/url";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function JobSeekerRegister() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        linkedIn: "",
        portfolio: "",
        termsAccepted: false
    });
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!formData.termsAccepted) {
            toast.error("You must accept the terms and conditions.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${url}/register`, {
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phone: formData.phone,
                linked_in: formData.linkedIn, // ✅ FIXED
                portfolio: formData.portfolio,
                terms_accepted: formData.termsAccepted, // ✅ FIXED
            });
            console.log("res", res)

            toast.success(res.data.message || "Registration successful!");

            // Reset form
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                linkedIn: "",
                portfolio: "",
                termsAccepted: false,
            });
            router.push("/login")

        } catch (err: any) {
            const errorMsg =
                err.response?.data?.message ||
                (err.response?.data?.errors?.password?.[0] ?? "Something went wrong!");
            setError(errorMsg);
            toast.error(errorMsg);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Job Seeker Registration</h1>
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                        <div>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                            <input
                                type="url"
                                id="linkedIn"
                                name="linkedIn"
                                value={formData.linkedIn}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio/Website</label>
                            <input
                                type="url"
                                id="portfolio"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://yourportfolio.com"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>
                    </div>


                </div>

                {/* Terms and Submission */}
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="termsAccepted"
                                name="termsAccepted"
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                required
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader fullScreen />

                        ) : (
                            "Create Account"
                        )}
                    </button>


                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
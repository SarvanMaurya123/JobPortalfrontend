"use client"
import Loader from "@/app/componente/Loader";
import urlemployer from "@/app/lib/employer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EmployeeRegister() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        termsAccepted: false
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked :
                    value
        }));
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(`${urlemployer}/register`, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phone: formData.phone,
                date_of_birth: formData.dateOfBirth,
                gender: formData.gender,
                terms_accepted: formData.termsAccepted,
            });
            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                dateOfBirth: "",
                gender: "",
                termsAccepted: false
            });
            console.log("Registration successful:", response.data);
            toast.success("Registration successful!");
            router.push("/login");
        } catch (error: any) {
            setError(error.message);
            console.error("Registration failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Employee Registration</h1>
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                        <div>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold mb-4 text-green-600">Personal Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
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
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
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
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
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
                                className="h-4 w-4 text-green-600 border-gray-300 rounded cursor-pointer"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                                I confirm that all information provided is accurate and complete. I understand that providing false information may result in termination of employment.
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                    >
                        {isLoading ? (
                            <Loader fullScreen />

                        ) : (
                            "Create Account"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login } from "../store/slices/authSlice";
import { toast } from "sonner"

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await dispatch(
                login({
                    email: credentials.email,
                    password: credentials.password,
                    rememberMe: credentials.rememberMe, // ✅ add this line
                })
            ).unwrap();


            // ✅ Store login state (optional)
            if (credentials.rememberMe) {
                localStorage.setItem("isLoggedIn", "true");
            }

            toast.success("Login successful ");
            router.push("/candidate/dashboard");
        } catch (err: any) {
            setError(err || "Login failed");
            toast.error("Login failed", err)
        } finally {
            setLoading(false);
        }
    };

    const navigateToRegistration = (type: string) => {
        setShowRegistrationModal(false);
        router.push(`/register/${type}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <button
                            type="button"
                            onClick={() => setShowRegistrationModal(true)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            create a new account
                        </button>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Email address"
                                value={credentials.email}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="flex items-center text-sm text-gray-700">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={credentials.rememberMe}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="text-center text-sm">
                        New to our platform?{" "}
                        <button
                            type="button"
                            onClick={() => setShowRegistrationModal(true)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Register here
                        </button>
                    </div>
                </form>
            </div>

            {showRegistrationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm z-50 transition-all duration-300">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300 scale-100">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Choose Your Path</h3>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => navigateToRegistration("jobseeker")}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-200 transition-all duration-200 flex items-center shadow-sm hover:shadow"
                            >
                                <div className="bg-blue-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-lg">Job Seeker</div>
                                    <div className="text-sm text-gray-600">Find your dream job</div>
                                </div>
                            </button>

                            <button
                                onClick={() => navigateToRegistration("employee")}
                                className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg border border-green-200 transition-all duration-200 flex items-center shadow-sm hover:shadow"
                            >
                                <div className="bg-green-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-lg">Employer</div>
                                    <div className="text-sm text-gray-600">Find perfect candidates</div>
                                </div>
                            </button>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setShowRegistrationModal(false)}
                                    className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

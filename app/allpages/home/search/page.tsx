"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

export default function NewsletterSubscription() {
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle subscription logic here
        console.log("Subscribing email:", email)
        setEmail("")
        alert("Thank you for subscribing!")
    }

    return (
        <div className="w-full bg-emerald-500 py-16 relative overflow-hidden">
            {/* Hexagonal pattern background */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                            <polygon
                                points="25,0 50,14.4 50,43.4 25,57.8 0,43.4 0,14.4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">Subscribe Our Newsletter!</h2>
                    <p className="text-white text-lg mb-10">
                        Lorem Ipsum is simply dummy text printing and type setting industry Lorem Ipsum been industry standard dummy
                        text ever since when unknown printer took a galley.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg">
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-grow flex items-center bg-white rounded-l-md p-2">
                                <Mail className="h-6 w-6 text-emerald-500 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Enter your Email..."
                                    className="w-full outline-none text-gray-700"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-emerald-500 text-white font-semibold py-3 px-6 rounded-md mt-2 sm:mt-0"
                            >
                                SUBSCRIBE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


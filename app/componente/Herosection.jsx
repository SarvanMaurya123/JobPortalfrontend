"use client"
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="w-full">
            {/* Header Banner */}
            <div
                className="w-full bg-cover bg-center h-48 flex flex-col items-center justify-center text-white"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/single_page_header.png?height=400&width=1920")',
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse by Categories</h1>
                <div className="flex items-center text-sm">
                    <Link href="/" className="hover:underline flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span>Browse by Categories</span>
                </div>
            </div>
        </div>
    );
}

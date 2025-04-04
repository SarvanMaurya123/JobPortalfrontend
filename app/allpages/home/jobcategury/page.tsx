"use client"
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Globe, Monitor, Wine, Ruler, Pencil } from 'lucide-react';

export default function JobCategories() {
    const categories = [
        { title: "Web & Software Dev", jobs: 122, icon: <BarChart3 className="h-10 w-10 text-white" /> },
        { title: "Data Science & Analytics", jobs: 155, icon: <Pencil className="h-10 w-10 text-white" /> },
        { title: "Accounting & Consulting", jobs: 300, icon: <Briefcase className="h-10 w-10 text-white" /> },
        { title: "Writing & Translations", jobs: 80, icon: <Ruler className="h-10 w-10 text-white" /> },
        { title: "Sales & Marketing", jobs: 120, icon: <Briefcase className="h-10 w-10 text-white" /> },
        { title: "Graphics & Design", jobs: 78, icon: <Wine className="h-10 w-10 text-white" /> },
        { title: "Digital Marketing", jobs: 90, icon: <Globe className="h-10 w-10 text-white" /> },
        { title: "Education & Training", jobs: 210, icon: <Monitor className="h-10 w-10 text-white" /> }
    ];

    return (
        <div className="w-full bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2d4a6d] mb-4">Job Categories</h2>
                    <p className="text-gray-500 max-w-3xl mx-auto">
                        Lorem Ipsum is simply dummy text printing and type setting industry Lorem Ipsum been industry
                        standard dummy text ever since when unknown printer took a galley.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="bg-[#2cb67d] rounded-full w-20 h-20 flex items-center justify-center mb-4">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[#2d4a6d] mb-2">{category.title}</h3>
                            <span className="bg-[#e6f7ef] text-[#2cb67d] px-4 py-1 rounded-full">
                                {category.jobs} Jobs
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <motion.button
                        className="bg-[#2cb67d] hover:bg-[#25a06e] text-white font-medium py-3 px-8 rounded-md transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        VIEW ALL CATEGORIES
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
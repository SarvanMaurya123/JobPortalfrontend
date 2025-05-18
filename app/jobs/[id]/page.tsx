
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import urlemployer from '@/app/lib/employer';
import { motion } from "framer-motion";
import Link from 'next/link';
import url from '@/app/lib/url';
import { useAppSelector } from '@/app/redux/hooks';
import { RootState } from '@/app/store';
import { toast } from 'sonner';

type Job = {
    employer_id: string;
    title: string;
    company: string;
    location: string;
    employment_type: string;
    experience_level: string;
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
    application_deadline: string;
    contact_email: string;
};

export default function JobDetails() {
    const params = useParams();
    const id = params?.id as string;
    const [job, setJob] = useState<Job | null>(null);
    const user = useAppSelector((state: RootState) => state.auth.user)

    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${urlemployer}/jobs/${id}`);
                const data = response.data;

                const selectedJob = Array.isArray(data)
                    ? data.find((job) => job.id.toString() === id)
                    : data;

                if (selectedJob) {
                    setJob({
                        ...selectedJob,
                        requirements: typeof selectedJob.requirements === 'string'
                            ? selectedJob.requirements.split('\n').filter(Boolean)
                            : [],
                        benefits: typeof selectedJob.benefits === 'string'
                            ? selectedJob.benefits.split('\n').filter(Boolean)
                            : [],
                    });
                } else {
                    console.error("Job not found with the provided ID.");
                }
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    const handleApply = async () => {
        try {
            setIsApplying(true);
            const response = await axios.post(`${url}/applications/apply`, {
                jobseeker_id: user?.id,
                job_id: id,
                name: user?.full_name
            });

            if (response.data.success) {
                setApplied(true);
                toast.success("Application submitted successfully!");
            } else {
                toast.message(response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.message("You've already applied for this job.");
            } else {
                toast.error("Error applying for job.");
            }
        } finally {
            setIsApplying(false);
        }
    };


    const [isHovered, setIsHovered] = useState(false);


    // Animation variants
    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", scale: 1.01 }
    };

    const contentVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    };


    if (loading) return <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center"
    >
        <motion.div
            className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
            className="text-gray-700 font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
            Loading job details...
        </motion.p>
    </div>;
    if (!job) return <div className="p-6 text-red-500">Job not found.</div>;

    return (

        <>
            <motion.div
                className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-10 mb-10"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <motion.div variants={contentVariants} initial="initial" animate="animate">
                    <div className='flex justify-between items-center '>
                        <motion.h1 variants={itemVariants} className="text-2xl font-bold mb-2">{job.title}</motion.h1>
                        <motion.button variants={buttonVariants}

                        >
                            <Link href={`/alljobsshow`}>
                                <p
                                    className="inline-block px-4 py-1 text-sm text-white bg-gray-600 rounded-full hover:bg-gray-800 cursor-pointer transition"
                                >
                                    ← Back
                                </p>
                            </Link>

                        </motion.button>
                    </div>
                    <motion.p variants={itemVariants} ><strong>Company Name:</strong> {job.company}</motion.p>
                    <motion.p variants={itemVariants} className=""><strong>Location:</strong> {job.location} </motion.p>

                    <motion.div variants={itemVariants} className="mt-4 space-y-2">
                        <p><strong>Employment Type:</strong> {job.employment_type}</p>
                        <p><strong>Experience Level:</strong> {job.experience_level}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Application Deadline:</strong> {job.application_deadline}</p>
                        <p><strong>Contact Email:</strong> {job.contact_email}</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-6">
                        <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-2">Job Description</motion.h2>
                        <motion.p variants={itemVariants} className="text-gray-800">{job.description}</motion.p>
                    </motion.div>

                    {job.requirements && job.requirements.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="mt-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto", transition: { duration: 0.5 } }}
                        >
                            <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-2">Requirements</motion.h2>
                            <motion.ul className="list-disc list-inside text-gray-700">
                                {job.requirements.map((req, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                    >
                                        {req}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}

                    {job.benefits && job.benefits.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="mt-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto", transition: { duration: 0.5 } }}
                        >
                            <motion.h2 variants={itemVariants} className="text-xl font-semibold mb-2">Benefits</motion.h2>
                            <motion.ul className="list-disc list-inside text-gray-700">
                                {job.benefits.map((benefit, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                    >
                                        {benefit}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}

                    <motion.div className="mt-8 text-center">
                        <motion.button
                            onClick={handleApply}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial="initial"
                            disabled={isApplying || applied}
                        >
                            {applied
                                ? "Application Submitted"
                                : isHovered
                                    ? "Submit Application"
                                    : "Apply Now"}
                        </motion.button>
                    </motion.div>

                </motion.div>
            </motion.div>

        </>
    );
};



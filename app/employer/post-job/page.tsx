'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface JobData {
    title: string;
    company: string;
    location: string;
    employmentType: string;
    experienceLevel: string;
    salary: string;
    description: string;
    requirements: string;
    benefits: string;
    applicationDeadline: string;
    contactEmail: string;
}

interface JobErrors {
    title?: string;
    company?: string;
    location?: string;
    description?: string;
    applicationDeadline?: string;
    submit?: string;
}


export default function PostJobs() {
    const [jobData, setJobData] = useState<JobData>({
        title: '',
        company: '',
        location: '',
        employmentType: 'Full-time',
        experienceLevel: 'Entry-level',
        salary: '',
        description: '',
        requirements: '',
        benefits: '',
        applicationDeadline: '',
        contactEmail: ''
    });

    const [errors, setErrors] = useState<JobErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];
    const experienceLevels = ['Entry-level', 'Mid-level', 'Senior', 'Manager', 'Director', 'Executive'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setJobData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is being edited
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };


    const validateForm = () => {
        const newErrors: { [key in keyof JobData]?: string } = {};
        if (!jobData.title.trim()) newErrors.title = 'Job title is required';
        if (!jobData.company.trim()) newErrors.company = 'Company name is required';
        if (!jobData.location.trim()) newErrors.location = 'Location is required';
        if (!jobData.description.trim()) newErrors.description = 'Job description is required';
        if (!jobData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // This is where you would make your actual API call
            // const response = await fetch('/api/jobs', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(jobData)
            // });

            // if (!response.ok) throw new Error('Failed to post job');

            setSuccessMessage('Job posted successfully!');

            // Reset form after successful submission
            setJobData({
                title: '',
                company: '',
                location: '',
                employmentType: 'Full-time',
                experienceLevel: 'Entry-level',
                salary: '',
                description: '',
                requirements: '',
                benefits: '',
                applicationDeadline: '',
                contactEmail: ''
            });

        } catch (error) {
            console.error('Failed to post job. Please try again.', error)
            //setErrors({ submit: error.message || 'Failed to post job. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto p-6"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a New Job</h1>
                <p className="text-gray-600">Complete the form below to create a new job listing</p>
            </motion.div>

            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
                >
                    {successMessage}
                </motion.div>
            )}

            {errors.submit && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Job Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g. Frontend Developer"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Company */}
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={jobData.company}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g. TechCorp Inc."
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g. San Francisco, CA (or Remote)"
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                            Employment Type
                        </label>
                        <select
                            id="employmentType"
                            name="employmentType"
                            value={jobData.employmentType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        >
                            {employmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Experience Level
                        </label>
                        <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={jobData.experienceLevel}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        >
                            {experienceLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                            Salary Range
                        </label>
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            value={jobData.salary}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="e.g. $80,000 - $100,000"
                        />
                    </div>

                    {/* Application Deadline */}
                    <div>
                        <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                            Application Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="applicationDeadline"
                            name="applicationDeadline"
                            value={jobData.applicationDeadline}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md ${errors.applicationDeadline ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.applicationDeadline && <p className="mt-1 text-sm text-red-500">{errors.applicationDeadline}</p>}
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={jobData.contactEmail}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="e.g. careers@techcorp.com"
                        />
                    </div>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full p-3 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Provide a detailed description of the job..."
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                {/* Requirements */}
                <div className="mb-6">
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                        Requirements
                    </label>
                    <textarea
                        id="requirements"
                        name="requirements"
                        value={jobData.requirements}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="List the qualifications and skills required..."
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">Tip: Use bullet points for better readability</p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                    <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
                        Benefits
                    </label>
                    <textarea
                        id="benefits"
                        name="benefits"
                        value={jobData.benefits}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="List the benefits offered with this position..."
                    ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Job'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
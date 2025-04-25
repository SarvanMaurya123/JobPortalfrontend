// Rewritten and fixed ExperienceForm component
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'sonner';
import url from '@/app/lib/url';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Plus, ChevronUp, ChevronDown, Delete } from 'lucide-react';

interface Experience {
  id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
  currently_working: boolean;
}

const ExperienceForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
    currently_working: false,
  });

  const profileId = useSelector((state: RootState) => state.profile.id);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!profileId || !token) return;
      try {
        const res = await axios.get(`${url}/experience/${profileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExperiences(res.data.data);
      } catch (error) {
        toast.error('Failed to load experiences');
      }
    };
    fetchExperiences();
  }, [profileId, token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the input is a checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (!profileId || !token) return;
    try {
      await axios.post(`${url}/experience/${profileId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Experience added');
      setFormData({
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
        currently_working: false,
      });
      const res = await axios.get(`${url}/experience/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExperiences(res.data.data);
    } catch (error) {
      toast.error('Failed to add experience');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await axios.delete(`${url}/experience/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Experience deleted');
      setExperiences(experiences.filter(exp => exp.id !== id));
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  return (
    <div className="mt-6">
      <motion.button
        onClick={() => setShowForm(!showForm)}

        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Briefcase className="mr-2" size={20} />
            <h3 className="text-base sm:text-lg font-semibold">Work Experience</h3>
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md  flex items-center justify-center gap-2 shadow-sm transition-all duration-200 w-full sm:w-auto cursor-pointer"
            onClick={() => setShowForm(!showForm)} // optional toggle
          >
            {showForm ? <ChevronUp size={18} /> : <Plus size={18} />}
            <span className="text-sm sm:text-base">
              {showForm ? 'Hide Experience Section' : 'Add Experience'}
            </span>
          </button>
        </div>


      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            key="experience-form"
            className="mt-6 border p-6 rounded-lg bg-white shadow-md inset-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >


            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Google"
                  className="p-3 border rounded-md w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineer"
                  className="p-3 border rounded-md w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar size={16} className="mr-1" /> Start Date
                </label>
                <input
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar size={16} className="mr-1" /> End Date
                </label>
                <input
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className={`p-3 border rounded-md w-full ${formData.currently_working ? 'bg-gray-100' : ''}`}
                  disabled={formData.currently_working}
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your responsibilities and achievements..."
                  className="p-3 border rounded-md w-full"
                />
              </div>
              <label className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  name="currently_working"
                  checked={formData.currently_working}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm">I currently work here</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Save Experience
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 space-y-4">
        {experiences.length === 0 ? (
          <p className="text-gray-500">No work experience added yet.</p>
        ) : (
          experiences.map(exp => (
            <motion.div
              key={exp.id}
              className="border p-4 rounded-lg bg-white shadow-sm w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold text-lg">{exp.position}</h4>
                  <div className='flex items-center gap-3'>
                    <p className="text-md font-medium">{exp.company_name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <Calendar size={14} className="inline mr-1" />
                      {new Date(exp.start_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {` `}
                      to
                      {` `}

                      {exp.currently_working
                        ? 'Present'
                        : new Date(exp.end_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                    </p>
                  </div>

                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
                <motion.button
                  onClick={() => handleDelete(exp.id)}
                  className="text-red-500 hover:text-red-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Delete size={20} className='cursor-pointer' />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Award, Clock, PlusCircle } from 'lucide-react'
import { useAppSelector } from '@/app/redux/hooks'
import url from '@/app/lib/url'
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceForm from '../experiences/page'
import Education from '../education/page'

type Skill = {
    id: number
    jobseeker_profile_id: number
    skill_name: string
    proficiency: string
}

const SkillSection = () => {
    const token = useAppSelector((state) => state.auth.token)
    const user = useAppSelector((state) => state.auth.user)
    const profile = useAppSelector((state) => state.profile.id)
    const [skills, setSkills] = useState<Skill[]>([])
    const [skillName, setSkillName] = useState('')
    const [proficiency, setProficiency] = useState('Beginner')
    const [profileId, setProfileId] = useState<number | null>(null)
    const [showInput, setShowInput] = useState(false)

    const fetchProfileId = async () => {
        try {
            const res = await axios.get(`${url}/profile/${user?.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProfileId(res.data.data.id)
        } catch (err) {
            console.error("Error fetching profile ID", err)
        }
    }
    useEffect(() => {
        if (user?.id && token) {
            fetchProfileId()
            fetchSkills()
        }
    }, [user, token])
    const fetchSkills = async () => {
        try {
            const res = await axios.get(`${url}/skills/${profile}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data)
            setSkills(res.data.data)
        } catch (err) {
            console.error('Error fetching skills:', err)
        }
    }

    useEffect(() => {
        if (user?.id && token) {
            fetchProfileId()
            fetchSkills()
        }
    }, [user, token])

    const handleAddSkill = async () => {
        if (!profile) {
            console.error("Profile ID is missing.")
            return
        }

        try {
            await axios.post(`${url}/skills`, {
                jobseeker_profile_id: profile,
                skill_name: skillName,
                proficiency,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setSkillName('')
            setProficiency('Beginner')
            setShowInput(false)
            fetchSkills()
        } catch (err) {
            console.error('Error adding skill:', err)
        }
    }

    const handleDeleteSkill = async (id: number) => {
        try {
            await axios.delete(`${url}/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchSkills()
        } catch (err) {
            console.error('Error deleting skill:', err)
        }
    }

    return (<>
        <div className="flex flex-col md:flex-row gap-6 w-full">

            {/* Left Column */}
            <motion.div
                className="bg-white shadow rounded-lg p-6 flex-1 md:w-1/2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h3
                    className="text-lg font-bold mb-4 flex items-center justify-between"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <motion.span
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Award size={20} className="mr-2" />
                        Skills
                    </motion.span>
                    <motion.button
                        onClick={() => setShowInput(!showInput)}
                        className="text-white flex p-2 text-sm rounded-xl bg-green-500 items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PlusCircle size={20} className="mr-1" />
                        {showInput ? 'Cancel' : 'Add Skill'}
                    </motion.button>
                </motion.h3>

                <AnimatePresence>
                    {showInput && (
                        <motion.div
                            className="flex flex-col gap-2 mb-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.input
                                type="text"
                                value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                                placeholder="Skill name"
                                className="border rounded px-3 py-2 w-full"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.1 }}
                            />
                            <motion.select
                                value={proficiency}
                                onChange={(e) => setProficiency(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </motion.select>
                            <motion.button
                                onClick={handleAddSkill}
                                className="bg-blue-600 text-white px-4 py-2 p-3 rounded hover:bg-blue-700"
                                initial={{ x: -5 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Save
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="flex flex-wrap gap-2"
                    layout
                >
                    <AnimatePresence>
                        {skills.slice(0, Math.ceil(skills.length)).map((skill) => (
                            <motion.div
                                key={skill.id}
                                className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                layout
                                whileHover={{ scale: 1.05 }}
                            >
                                {skill.skill_name} ({skill.proficiency})
                                <motion.button
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
                className="bg-white shadow rounded-lg p-6 flex-1 md:w-1/2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <motion.div
                    className="flex flex-wrap gap-2"
                    layout
                >
                    <AnimatePresence>
                        <ExperienceForm />
                    </AnimatePresence>
                </motion.div>
            </motion.div>

        </div>
        <div>
            <Education />
        </div>
    </>

    )
}

export default SkillSection

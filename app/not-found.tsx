'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NotFound() {
    const [isHovering, setIsHovering] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    };

    const buttonVariants = {
        normal: { scale: 1 },
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            transition: { type: 'spring', stiffness: 400, damping: 10 }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
            <motion.div
                className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-9xl font-bold text-purple-500 mb-6"
                    variants={itemVariants}
                >
                    404
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-4"
                    variants={itemVariants}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    className="text-gray-600 mb-8"
                    variants={itemVariants}
                >
                    The page you are looking for does not exist or has been moved.
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Link href="/" passHref>
                        <motion.a
                            className="inline-block py-3 px-8 bg-purple-600 text-white font-medium rounded-lg cursor-pointer"
                            variants={buttonVariants}
                            initial="normal"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            Return Home
                            <motion.span
                                className="inline-block ml-2"
                                animate={isHovering ? { x: [0, 5, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
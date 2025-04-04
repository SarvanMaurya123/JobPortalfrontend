"use client"
import { motion } from "framer-motion";

const Loader = ({ fullScreen = false }: { fullScreen?: boolean }) => {
    return (
        <div
            className={`flex justify-center items-center ${fullScreen ? "fixed inset-0 bg-white bg-opacity-70 z-50" : ""
                }`}
            role="status"
            aria-label="Loading..."
        >
            <motion.div
                className="w-16 h-16 flex justify-center items-center"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <motion.div
                    className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                        scale: [0.8, 1.1, 0.8],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Loader;
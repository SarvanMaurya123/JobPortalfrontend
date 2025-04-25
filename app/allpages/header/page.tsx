"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, Menu, User, Briefcase, LogOut } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { toast } from "sonner"
import { isTokenExpired } from "@/app/lib/checkToken";
import { logout } from "@/app/store/slices/authSlice";
import { employerlogout } from "@/app/store/slices/employerSlice";
import { RootState } from "@/app/store";

export default function Header() {
    const [userType, setUserType] = useState("/register/jobseekar");
    const dispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ Dialog state

    const router = useRouter(); // ✅ Next.js Router

    const employer = useAppSelector((state: RootState) => state.authemployer.employer);
    const user = useAppSelector((state) => state.auth.user);
    const userToken = useAppSelector((state) => state.auth.token);
    const employerToken = useAppSelector((state) => state.authemployer.token);
    const token = userToken || employerToken;

    const isAuthenticated = !!token && (user?.role || employer?.role) && !isTokenExpired(token);

    useEffect(() => {
        if (!token) {
            if (user) dispatch(logout());
            if (employer) dispatch(employerlogout());
            router.push("/login");
        }
    }, [token, user, employer, dispatch, router]);


    // Function to handle continue button click
    const handleContinue = () => {
        setIsDialogOpen(false); // ✅ Close dialog
        setTimeout(() => router.push(userType), 300); // ✅ Wait before navigating
    };
    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    const handleLogout = async () => {
        try {
            if (user) {
                await dispatch(logout()).unwrap();
            } else if (employer) {
                await dispatch(employerlogout()).unwrap();
            } else {
                toast.error("No user or employer is currently logged in.");
                return;
            }

            router.push("/login");
            toast.success("Logout success");
        } catch (error: unknown) {
            console.error(error);
            toast.error("Logout failed");
        }
    };


    return (
        <header className="bg-gray-900 w-full sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}

                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-[#2cb67d] flex items-center justify-center">
                                <span className="text-white font-bold text-xl">JP</span>
                            </div>
                            <h1 className="text-xl font-bold text-white hidden sm:block">Job Portal</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/">
                            <Button variant="link" className="text-white font-medium text-base">Home</Button>
                        </Link>

                        {/* Employer Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className="flex items-center gap-1 text-white font-medium text-base">
                                    Employer <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-white">
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/employer/dashboard" className="w-full">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/employer/post-job" className="w-full">Post a Job</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/employer/jobapplications" className="w-full">Applications</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Candidate Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className="flex items-center gap-1 text-white font-medium text-base">
                                    Candidate <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-white">
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/candidate/dashboard" className="w-full">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/alljobsshow" className="w-full">Find Jobs</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/candidate/profile" className="w-full">My Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Pages Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" className="flex items-center gap-1 text-white font-medium text-base">
                                    Pages <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700 text-white">
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/about" className="w-full">About Us</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/pricing" className="w-full">Pricing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                                    <Link href="/faq" className="w-full">FAQ</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="/contact">
                            <Button
                                variant="link"
                                className="text-white font-medium text-base"
                            >
                                Contact
                            </Button>
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium cursor-pointer"
                                >
                                    <LogOut size={18} className="mr-2" />
                                    Logout
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                {/* Login Button */}
                                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                    <Button variant="ghost" className="bg-[#2cb67d] hover:bg-green-600 text-white font-medium cursor-pointer">
                                        <User size={18} className="mr-2" />
                                        <Link href="/login">Login</Link>
                                    </Button>
                                </motion.div>

                                {/* Register Dialog */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                            <Button variant="ghost" className="bg-green-500 hover:bg-[#2cb67d] text-white font-medium cursor-pointer">
                                                <Briefcase size={18} />
                                                Register
                                            </Button>
                                        </motion.div>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-semibold text-center text-white">Register</DialogTitle>
                                            <DialogDescription className="text-gray-300 text-center">
                                                Choose your role before proceeding with the sign-up process.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="flex flex-col gap-4 py-4">
                                            <p className="text-sm text-gray-300 font-medium">Select your role:</p>
                                            <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-col gap-3">
                                                {/* Job Seeker Option */}
                                                <label
                                                    htmlFor="job-seeker"
                                                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${userType === "/register/jobseeker" ? "border-green-500 bg-gray-700" : "border-gray-600 hover:bg-gray-700"}`}
                                                >
                                                    <RadioGroupItem value="/register/jobseeker" id="job-seeker" className="text-green-500" />
                                                    <div>
                                                        <p className="font-medium text-white">Job Seeker</p>
                                                        <p className="text-sm text-gray-300">Looking for new opportunities</p>
                                                    </div>
                                                </label>

                                                {/* Employer Option */}
                                                <label
                                                    htmlFor="employer"
                                                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${userType === "/register/employee" ? "border-green-500 bg-gray-700" : "border-gray-600 hover:bg-gray-700"}`}
                                                >
                                                    <RadioGroupItem value="/register/employee" id="employer" className="text-green-500" />
                                                    <div>
                                                        <p className="font-medium text-white">Employer</p>
                                                        <p className="text-sm text-gray-300">Hiring for your company</p>
                                                    </div>
                                                </label>
                                            </RadioGroup>
                                        </div>

                                        <div className="flex justify-center">
                                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="w-full">
                                                <Link href={userType} passHref>
                                                    <Button
                                                        variant="default"
                                                        className="w-full py-2 text-lg font-medium bg-green-500 hover:bg-green-600 text-white"
                                                    >
                                                        Continue
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                    </div>



                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 bg-gray-800 text-white border-gray-700">
                                <div className="grid gap-6 p-6">
                                    <div className="flex items-center justify-between">
                                        <Link href="/" className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">JP</span>
                                            </div>
                                            <span className="font-bold text-lg text-white">Job Portal</span>
                                        </Link>
                                    </div>
                                    <div className="grid gap-1">
                                        <Link href="/" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Home</Button>
                                        </Link>

                                        <div className="pt-2 pb-1">
                                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Employer</p>
                                        </div>
                                        <Link href="/employer/dashboard" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Dashboard</Button>
                                        </Link>
                                        <Link href="/employer/post-job" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Post a Job</Button>
                                        </Link>
                                        <Link href="/employer/applications" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Applications</Button>
                                        </Link>

                                        <div className="pt-2 pb-1">
                                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidate</p>
                                        </div>
                                        <Link href="/candidate/dashboard" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Dashboard</Button>
                                        </Link>
                                        <Link href="/candidate/jobs" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Find Jobs</Button>
                                        </Link>
                                        <Link href="/candidate/profile" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">My Profile</Button>
                                        </Link>

                                        <div className="pt-2 pb-1">
                                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Pages</p>
                                        </div>
                                        <Link href="/about" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">About Us</Button>
                                        </Link>
                                        <Link href="/pricing" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Pricing</Button>
                                        </Link>
                                        <Link href="/faq" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">FAQ</Button>
                                        </Link>

                                        <Link href="/contact" className="flex items-center font-medium">
                                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">Contact</Button>
                                        </Link>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 gap-3">
                                        <Button variant="ghost" className="w-full bg-green-500 hover:bg-green-600 text-white">
                                            <User size={18} className="mr-2" />
                                            <Link href="/login" className="w-full">Login</Link>
                                        </Button>
                                        {/* Register Dialog */}
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Button
                                                        variant="ghost"
                                                        className="bg-green-500 hover:bg-green-600 text-white font-medium"
                                                        onClick={() => setIsDialogOpen(true)}
                                                    >
                                                        <Briefcase size={18} className="mr-2" />
                                                        Register
                                                    </Button>
                                                </motion.div>
                                            </DialogTrigger>

                                            {/* Modal Content */}
                                            <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-semibold text-center text-white">Register</DialogTitle>
                                                    <DialogDescription className="text-gray-300 text-center">
                                                        Choose your role before proceeding with the sign-up process.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {/* Role Selection */}
                                                <div className="flex flex-col gap-4 py-4">
                                                    <p className="text-sm text-gray-300 font-medium">Select your role:</p>
                                                    <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-col gap-3">
                                                        {/* Job Seeker Option */}
                                                        <label
                                                            htmlFor="job-seeker"
                                                            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${userType === "/register/jobseeker" ? "border-green-500 bg-gray-700" : "border-gray-600 hover:bg-gray-700"
                                                                }`}
                                                        >
                                                            <RadioGroupItem value="/register/jobseeker" id="job-seeker" className="text-green-500" />
                                                            <div>
                                                                <p className="font-medium text-white">Job Seeker</p>
                                                                <p className="text-sm text-gray-300">Looking for new opportunities</p>
                                                            </div>
                                                        </label>

                                                        {/* Employer Option */}
                                                        <label
                                                            htmlFor="employer"
                                                            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${userType === "/register/employee" ? "border-green-500 bg-gray-700" : "border-gray-600 hover:bg-gray-700"
                                                                }`}
                                                        >
                                                            <RadioGroupItem value="/register/employee" id="employer" className="text-green-500" />
                                                            <div>
                                                                <p className="font-medium text-white">Employer</p>
                                                                <p className="text-sm text-gray-300">Hiring for your company</p>
                                                            </div>
                                                        </label>
                                                    </RadioGroup>
                                                </div>

                                                {/* Continue Button */}
                                                <div className="flex justify-center">
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                                                        <Link href={userType} passHref>
                                                            <Button
                                                                variant="default"
                                                                className="w-full py-2 text-lg font-medium bg-green-500 hover:bg-green-600 text-white"
                                                                onClick={handleContinue} // ✅ Close dialog on click
                                                            >
                                                                Continue
                                                            </Button>
                                                        </Link>
                                                    </motion.div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
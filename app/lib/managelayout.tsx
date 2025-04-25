"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/hooks";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "./checkToken";
import { logout } from "../store/slices/authSlice";


export default function AuthChecker() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token || isTokenExpired(token)) {
            dispatch(logout());
            Cookies.remove("token"); // Optional, keep Redux & cookies in sync
            router.push("/login");
        }
    }, []);

    return null; // This runs logic only, doesn't render anything
}

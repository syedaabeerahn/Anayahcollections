"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function AccountPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const router = useRouter();
    const { setUserEmail: setContextUser } = useCart();

    useEffect(() => {
        // Get stored credentials from localStorage
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");
        const storedName = localStorage.getItem("userName");

        if (storedEmail && storedPassword) {
            setUserEmail(storedEmail);
            setUserPassword(storedPassword);
            setUserName(storedName || "");
        } else {
            // If no credentials found, redirect to login
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");
        localStorage.removeItem("userName");
        setContextUser(null);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-accent/10 p-4 rounded-full">
                            <User className="h-8 w-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-gray-900">Welcome, {userName || "User"}</h1>
                            <p className="text-gray-500">Manage your account information</p>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Login Information</h2>

                    <div className="space-y-6">
                        {/* Email */}
                        <div className="border-b border-gray-200 pb-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <p className="text-lg text-gray-900 font-medium">
                                        {userEmail || "Not available"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="border-b border-gray-200 pb-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <p className="text-lg text-gray-900 font-mono">
                                        {userPassword || "Not available"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account Type */}
                        <div className="pb-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <User className="h-5 w-5 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Account Type
                                    </label>
                                    <p className="text-lg text-gray-900 font-medium">
                                        {userEmail === "abeerahnadeem767@gmail.com" ? "Admin" : "Customer"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

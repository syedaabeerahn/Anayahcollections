"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { setUserEmail: setContextUser } = useCart();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Check if user exists
            const { data: existingUser, error: fetchError } = await supabase
                .from('clients')
                .select('*')
                .eq('email', email.trim())
                .single();

            if (fetchError && fetchError.code === 'PGRST116') {
                // User doesn't exist, auto-register
                const { data: newUser, error: signUpError } = await supabase
                    .from('clients')
                    .insert([{
                        email: email.trim(),
                        password: password,
                        name: email.split('@')[0]
                    }])
                    .select()
                    .single();

                if (signUpError) {
                    alert("Error creating account");
                    return;
                }

                localStorage.setItem("userEmail", newUser.email);
                localStorage.setItem("userPassword", newUser.password);
                localStorage.setItem("userName", newUser.name);
                setContextUser(newUser.email);
                router.push("/");
                return;
            }

            if (existingUser && existingUser.password === password.trim()) {
                // Store credentials in localStorage
                localStorage.setItem("userEmail", existingUser.email);
                localStorage.setItem("userPassword", existingUser.password);
                localStorage.setItem("userName", existingUser.name);
                setContextUser(existingUser.email);

                // Check if user is admin
                if (existingUser.email.toLowerCase().trim() === "abeerahnadeem767@gmail.com") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            } else {
                alert("Invalid password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-serif font-bold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        For admin access, please use the designated admin email.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-accent">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full text-white">
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

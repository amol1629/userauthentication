"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // State for loading
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        try {
            setLoading(true);

            e.preventDefault();

            //  Throw the error if there is no email and password
            if (!email || !password) {
                toast.error("Please enter your email and password");
                return new Error("Please enter your email and password");
            }

            //  Throw the error if the email is not valid
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                toast.error("Please enter a valid email");
                return new Error("Please enter a valid email");
            }

            // Call login POST api here :
            const response: any = await axios.post(
                "/api/users/login",
                {
                    email: email,
                    password: password,
                }
            );  

            

            // Store the user id in a variable
            const userId = response.data.user._id;

            console.log("Login Response : ", response);
            //  If the response is successful, redirect to the user profile  page
            if (response.status === 200) {
                toast.success("Login Successful");
                router.push(`profile/${userId}`);
            }

            setLoading(false);
        } catch (error: any) {
            console.log("Error while login : ", error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    Login
                </h2>

                <div className="space-y-4">
                    <div className="group">
                        <label className="block pb-1 text-gray-400 group-hover:text-white transition duration-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Email"
                        />
                    </div>
                    <div className="group">
                        <label className="block pb-1 text-gray-400 group-hover:text-white transition duration-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Password"
                        />
                    </div>

                    <div className="py-4">
                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                        >
                            {loading ? "Processing..." : "Login"}
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-center text-gray-400">
                    Do not have an account?{" "}
                    <Link href="/signup" className="text-indigo-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupPage: React.FC = () => {
    const router = useRouter();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    // State for loading
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignup = async (e: React.FormEvent) => {
        try {
            setLoading(true);

            e.preventDefault();

            // Create different error messages for empty first name, last name, email, password, address
            if (!firstName || !lastName || !email || !password || !address) {
                toast.error("Please enter all fields");
                return new Error("Please enter all fields");
            }

            // Hit the sign up api by passing all states required
            const response = await axios.post("/api/users/signup", {
                firstName,
                lastName,
                email,
                password,
                address,
            });

            console.log("User signup response : ", response);

            toast.success("User signed in successfully");

            // After successful sign up , redirect the user to login page using router
            router.push("/login");
            setLoading(false);
        } catch (error: any) {
            console.log("Error while creating new user : ", error);
            toast.error(error?.response?.data?.message || error?.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    Signup
                </h2>

                <div className="space-y-4">
                    <div className="group">
                        <label className="block pb-1 text-gray-400 group-hover:text-white transition duration-300">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="First Name"
                        />
                    </div>

                    <div className="group">
                        <label className="block pb-1 text-gray-400 group-hover:text-white transition duration-300">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Last Name"
                        />
                    </div>

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

                    <div className="group">
                        <label className="block pb-1 text-gray-400 group-hover:text-white transition duration-300">
                            Address
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Address"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSignup}
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    >
                        {loading ? "Processing..." : "Signup"}
                    </button>
                </div>

                <p className="mt-4 text-center text-gray-400">
                    Already signed up?{" "}
                    <Link href="/login" className="text-indigo-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;

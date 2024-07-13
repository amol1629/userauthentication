import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

// Connect to Database
connect();

// Create login POST API:
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Check if the email and password are provided
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        } 

        // Check if user is present or not
        const user = await User.findOne({ email: email });

        if (user) {
            const isPasswordMatch = await bcryptjs.compare(password, user.password);
            if (isPasswordMatch) {
                return NextResponse.json({ message: "Login Successful", user: user }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Invalid Password" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "Invalid Email" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

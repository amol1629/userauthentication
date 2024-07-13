import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

// Connect to database
connect();

// POST method :
export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const { firstName, lastName, address, email, password } = requestBody;

        // Check if user is present or not 
        const user = await User.findOne({ email: email });

        // If user is present then return error message with status code
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Now hash the password by creating salt
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            password: hashedPassword
        });

        // Save the user
        const savedUser = await newUser.save();

        console.log('User created successfully');


        // Return success message with status code
        return NextResponse.json({ message: "User created successfully", success: true, savedUser }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            {
                message: 'Error while creating user',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

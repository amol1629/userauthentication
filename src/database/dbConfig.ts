import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection;

        connection.on('connect', () => {
            console.log('Connected to MongoDB');
        })

        connection.on('error', (error) => {
            console.log('Error connecting to MongoDB');
            console.log('Error while connecting to MongoDB : ', error);
            process.exit();
        })

    } catch (error) {
        console.log('Something went wrong while connecting to DATABASE')
        console.error(error)
    }
}
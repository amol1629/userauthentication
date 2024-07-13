import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        connection.on('error', (error) => {
            console.log('Error connecting to MongoDB');
            console.log('Error while connecting to MongoDB:', error);
            process.exit(1);
        });

    } catch (error) {
        console.log('Something went wrong while connecting to the DATABASE');
        console.error(error);
        process.exit(1);
    }
}

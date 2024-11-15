import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const connectDB = async () => {
    try {
        // Use process.env to access your MongoDB URI
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;

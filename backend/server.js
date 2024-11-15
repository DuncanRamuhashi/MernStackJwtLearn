import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import custom error handlers
import connectDB from './config/db.js';
import cors from 'cors'
dotenv.config();
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
connectDB();
const app = express();
// Enable CORS for all origins (you can customize this)
app.use( cors({
    origin: 'http://localhost:5173', // React app URL
    credentials: true, // Allow cookies
  }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
// Use the user routes
app.use('/api/users', userRoutes);
// Simple health check route
app.get('/', (req, res) => res.send('Server is ready'));
// 404 handler (must be after all your routes)
app.use(notFound);
// Global error handler (must be after 404 handler)
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${5000}`));

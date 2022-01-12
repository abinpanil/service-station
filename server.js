import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

// connect mongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

// server connection
app.listen(PORT, console.log(`server running on port ${PORT}`))
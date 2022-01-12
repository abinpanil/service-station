import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

// connect mongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

// server connection
app.listen(PORT, console.log(`server running on port ${PORT}`))
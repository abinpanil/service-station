import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import jobcard from './routes/jobcardRoutes.js';
import issue from './routes/issueRoutes.js';
import item from './routes/itemRoutes.js';
import payment from './routes/paymentRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js';

dotenv.config();

// connect mongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/customer', customerRoutes);
app.use('/jobcard', jobcard);
app.use('/issue', issue);
app.use('/item', item);
app.use('/payment', payment);

app.use(notFound);
app.use(errorHandler);

// server connection
app.listen(PORT, console.log(`server running on port ${PORT}`))
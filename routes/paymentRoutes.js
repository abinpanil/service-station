import express from 'express';
import { getPayment, makePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(protect, makePayment)
    .get(protect, getPayment)


export default router;
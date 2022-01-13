import express from 'express';
import { createCustomer, deleteCustomer, getCustomer } from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(protect, createCustomer)
    .get(protect, getCustomer)
    .delete(protect, deleteCustomer)



export default router
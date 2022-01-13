import express from 'express';
import { addIssue, deleteIssue, getIssue } from '../controllers/issueController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(protect, addIssue)
    .get(protect, getIssue)
    .delete(protect, deleteIssue)

export default router;
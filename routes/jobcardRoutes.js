import express from 'express';
import { changeJobStatus, createJobcard, deleteJobcard, getJobcard } from '../controllers/jobcardControllers.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router
    .route('/')
    .post(protect, createJobcard)
    .get(protect, getJobcard)
    .put(protect, changeJobStatus)
    .delete(protect, deleteJobcard)
    

export default router;
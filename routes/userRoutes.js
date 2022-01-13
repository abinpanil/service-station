import express from 'express';
import { authUser, logoutUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser)
router.post('/logout', logoutUser);

export default router;
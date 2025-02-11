import express from 'express';
import asyncHandler from 'express-async-handler';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/auth', authUser);
router.post('/Register', registerUser);
router.post('/logout', logoutUser);
//router.get('/profile', getUserProfile);
//router.put('/profile', updateUserProfile);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

export default router;

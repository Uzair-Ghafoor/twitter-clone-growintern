import express from 'express';
import {
  getUserProfile,
  followUnfollowUsers,
  getSuggestedUsers,
  updateUser,
} from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
const router = express.Router();

router.get('/profile/:username', protectedRoute, getUserProfile);
router.get('/suggested', protectedRoute, getSuggestedUsers);
router.post('/follow/:id', protectedRoute, followUnfollowUsers);
router.post('/update', protectedRoute, updateUser);

export default router;

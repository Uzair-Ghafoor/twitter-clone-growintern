import express from 'express';

const router = express.Router();

import {
  createPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
} from '../controllers/posts.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

router.get('/all', protectedRoute, getAllPosts);
router.get('/following', protectedRoute, getFollowingPosts);
router.get('/liked/:id', protectedRoute, getLikedPosts);
router.post('/create', protectedRoute, createPost);
router.post('/like/:id', protectedRoute, likeUnlikePost);
router.post('/comment/:id', protectedRoute, commentOnPost);
router.delete('/delete/:id', protectedRoute, deletePost);

export default router;

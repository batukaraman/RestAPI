import express from "express";
import {createPost, readPosts, readPost, updatePost, deletePost} from '../controllers/post.controller.js'
import {auth} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/post', auth, createPost);
router.get('/post', readPosts);
router.get('/post/:id', readPost);
router.patch('/post/:id', auth, updatePost);
router.delete('/post/:id', auth, deletePost);

export default router;
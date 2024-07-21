import express from "express";
import {
  createPost,
  getPosts,
  getPostsByQuery,
} from "../controllers/post-controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/getPosts", getPosts);
router.get("/getPosts/:slug", getPosts);
router.get("/getPostsByfilter", getPostsByQuery);

export default router;

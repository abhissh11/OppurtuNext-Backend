import { errorHandler } from "./../utils/error.js";
import Post from "../models/post-model.js";

export const createPost = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.jobType ||
    !req.body.company ||
    !req.body.location ||
    !req.body.jobLocation
  ) {
    return next(errorHandler(403, "Please provide all the required fields!"));
  }

  const slug = req.body.title
    .split("")
    .join("")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// get posts
export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
      .skip(skip)
      .limit(limit)
      .select("-__v") // Exclude __v field from the response
      .lean(); // Convert documents to plain JavaScript objects

    // Add slug field to each post object using map
    const formattedPosts = posts.map((post) => ({
      ...post,
      slug: post.title
        .split("")
        .join("")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-"),
    }));

    res.status(200).json({
      totalItems: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      items: formattedPosts,
    });
  } catch (error) {
    next(error);
  }
};

import { errorHandler } from "./../utils/error.js";
import Post from "../models/post-model.js";

export const createPost = async (req, res, next) => {
  const { title, description, jobType, company, location, jobLocation } =
    req.body;

  if (
    !title ||
    !description ||
    !jobType ||
    !company ||
    !location ||
    !jobLocation
  ) {
    return next(errorHandler(403, "Please provide all the required fields!"));
  }

  const timestamp = Date.now();

  const slug = `${title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${timestamp}`;

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

// Get posts
export const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const { slug } = req.params;

  try {
    let totalPosts;
    let posts;

    if (slug) {
      const post = await Post.findOne({ slug }).lean();

      if (!post) {
        return next(errorHandler(404, "Post not found"));
      }

      totalPosts = 1; // Since we are fetching a single post
      posts = [post];
    } else {
      // Otherwise, fetch all posts with pagination
      totalPosts = await Post.countDocuments();
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean();
    }

    res.status(200).json({
      totalItems: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      items: posts,
    });
  } catch (error) {
    next(error);
  }
};

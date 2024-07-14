import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for a job post
const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    match: [/.+\@.+\..+/, "Please fill a valid email address"], // optional: validate email format
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema and export it
const Post = mongoose.model("Post", postSchema);
export default Post;

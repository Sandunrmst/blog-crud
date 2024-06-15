import mongoose from "mongoose";

// First create connection with DB
// Create Model for store data
// Api routes -> add blog, get blog / fetch, update , delete

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;

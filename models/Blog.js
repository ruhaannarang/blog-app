import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  nameOfPublisher: String,
  dateOfPublishing: String,
  mainBlogOfPublisher : String
});
export const blog = mongoose.model('blog', blogSchema);
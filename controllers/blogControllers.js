import Blog from "../model/blog";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createBlog = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "drxdger3x/rooms",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  // req.body.user = req.user._id;

  const blog = await Blog.create(req.body);

  res.status(200).json({
    success: true,
    blog,
  });
});

const getBlog = catchAsyncErrors(async (req, res) => {
  const blogCount = await Blog.countDocuments();

  const apiFeatures = new APIFeatures(Blog.find().sort({ _id: -1 }), req.query);

  let posts = await apiFeatures.query;

  posts = await apiFeatures.query;

  res.status(200).json({
    success: true,
    posts,
    blogCount,
  });
});

//get room details => /api/rooms/:id

const getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found with this ID"));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

const allAdminRBlogs = catchAsyncErrors(async (req, res) => {
  const posts = await Blog.find();

  res.status(200).json({
    success: true,
    posts,
  });
});

const deleteBlog = catchAsyncErrors(async (req, res) => {
  const blog = await Blog.findById(req.query.id);

  if (!blog) {
    return next(new "Blog not found with this ID"(), 404);
  }

  // Delete images associated with the room
  for (let i = 0; i < blog.images.length; i++) {
    await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog is deleted.",
  });
});

export { createBlog, getBlog, getSingleBlog, deleteBlog, allAdminRBlogs };

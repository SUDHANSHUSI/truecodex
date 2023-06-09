const Blog = require("../models/Blog");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.adminBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .sort({ created_at: -1 })
    .populate({
      path: "user",
      populate: "first_name last_name",
      strictPopulate: false,
    })
    .exec();

  const posts = blogs.map((blog) => ({
    id: blog._id,
    title: blog.title,
    description: blog.description,
    image: `media/images/${blog.image}`,
    created_at: blog.created_at,
  }));
  const totalCount = posts.length;
  if (posts.length == 0)
    return res.status(200).json({
      msg: "There are no blogs",
      totalCount: 0,
    });

  res.status(200).json({ totalCount, posts });
});

exports.adminBlog = asyncHandler(async (req, res) => {
  const token = req.headers.authorization;

  const blog = await Blog.findById(req.params.id)
    .populate("user_id", "first_name last_name")
    .exec();

  const post = {
    id: blog._id,
    title: blog.title,
    description: blog.description,
    image: `media/images/${blog.image}`,
    is_featured: blog.is_featured,
    is_active: blog.is_active,
  };

  res.status(200).json(post);
});

exports.createBlog = asyncHandler(async (req, res) => {
  const { title, description, is_featured, is_active } = req.body;

  let filename = null;
  let isUploadError = false;
  if (req.file && req.file.image) {
    const file = req.file.image;

    if (!file.mimetype.includes("image")) {
      isUploadError = true;
      const errorMessage = "Only image files are allowed";
      res.status(400).json({ error: errorMessage });
      return;
    }
  }
  if (!isUploadError) {
    // Check if a blog with the same title already exists
    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "Blog already exists. Please create a new blog." });
    }
    const blogData = {
      title,
      user_id: req.user,
      description,
      image: req.file.filename,
      is_featured,
      is_active,
      created_at: Date.now(),
    };

    const blog = await Blog.create(blogData);

    const response = {
      status: "success",
      blog,
    };

    res.status(200).json(response);
  }
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const { title, description, is_featured, is_active } = req.body;
  const { id } = req.params;

  let filename = null;
  let isUploadError = false;
  if (req.file && req.file.image) {
    const file = req.file.image;

    if (!file.mimetype.includes("image")) {
      isUploadError = true;
      const errorMessage = "Only image files are allowed";
      res.status(400).json({ error: errorMessage });
      return;
    }
  }

  if (!isUploadError) {
    const updatedBlogData = {
      title,
      description,
      is_featured,
      is_active,
    };

    if (req.file && req.file.filename) {
      updatedBlogData.image = req.file.filename;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
      new: true,
    });

    if (!updatedBlog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }

    res.status(200).json({ status: "successfully updated", blog: updatedBlog });
  }
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id).exec();

  if (blog.image && fs.existsSync(`media/images/${blog.image}`)) {
    fs.unlinkSync(`media/images/${blog.image}`);
  }

  await Blog.findByIdAndRemove(id).exec();

  const response = {
    status: "successfully deleted",
  };

  res.status(200).json(response);
});

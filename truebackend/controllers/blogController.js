const Blog = require("../models/Blog");

// Get Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ is_active: true })
      .select("title description image created_at")
      .populate("user_id", "first_name last_name username")
      .populate("category_id", "category_name")
      .sort({ created_at: 1 });

    const posts = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      short_desc: blog.description.substring(0, 70),
      author: blog.user_id.username,
      image: "media/images/" + blog.image,
      created_at: blog.created_at,
    }));
    const totalCount = posts.length;
    if (posts.length == 0)
      return res.status(200).json({
        msg: "There are no blogs",
        totalCount: 0,
      });

    res.status(200).json({ totalCount, posts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Get Featured Blogs
exports.getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ is_active: true, is_featured: true })
      .select("title description image created_at")
      .populate("user_id", "first_name last_name username")
      .populate("category_id", "category_name")
      .sort({ created_at: 1 });

    const posts = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      short_desc: blog.description.substring(0, 70),
      author: blog.user_id.username,
      image: "media/images/" + blog.image,
      created_at: blog.created_at,
    }));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured blogs" });
  }
};

// Get Recent Blogs
exports.getRecentBlogs = async (req, res) => {
  try {
    const recentPostCount = parseInt(req.query.count) || 5;

    const blogs = await Blog.find({ is_active: true })
      .select("title description image created_at")
      .populate("user_id", "first_name last_name username")
      .populate("category_id", "category_name")
      .sort({ created_at: -1 })
      .limit(recentPostCount);

    const posts = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      short_desc: blog.description.substring(0, 70),
      author: blog.user_id.username,
      image: "media/images/" + blog.image,
      created_at: blog.created_at,
    }));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent blogs" });
  }
};

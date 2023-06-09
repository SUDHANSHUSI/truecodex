// const mongoose = require('mongoose');

// const BlogSchema = new mongoose.Schema({
//   title: String,
//   user_id: mongoose.Schema.Types.ObjectId,
//   category_id: mongoose.Schema.Types.ObjectId,
//   description: String,
//   image: String,
//   is_featured: Boolean,
//   is_active: Boolean,
//   created_at: Date
// });

// const Blog = mongoose.model('Blog', BlogSchema);

// module.exports = Blog;

const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;

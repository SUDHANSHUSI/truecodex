const express = require("express");
const adminBlogController = require("../controllers/adminBlogController");
const validateToken = require("../middleware/middleware");
const uploadPhoto = require("../middleware/upload");

const router = express.Router();

router.use(validateToken);

router.get("/blogs", adminBlogController.adminBlogs);
router.get("/blog/:id", adminBlogController.adminBlog);
router.post("/blog/create", uploadPhoto, adminBlogController.createBlog);
router.put("/blog/:id",uploadPhoto,adminBlogController.updateBlog);
router.delete("/blog/:id", adminBlogController.deleteBlog);

module.exports = router;

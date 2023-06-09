const express = require("express");
const blogController = require("../controllers/blogController");
const validateToken = require("../middleware/middleware");

const router = express.Router();

// router.use(validateToken);

router.get("/all", blogController.getBlogs);
router.get("/featured", blogController.getFeaturedBlogs);
router.get("/recent", blogController.getRecentBlogs);
// router.get("/:id", blogController.getBlogById);

module.exports = router;

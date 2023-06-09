const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
// const authController = require('./controllers/authController');

router.post("/contact", contactController.createContact);
// Insert Contact
// router.post("/insert_contact", contactController.insert_contact);

// Admin Blogs
// router.get("/admin_blogs", contactController.adminBlogs);

module.exports = router;

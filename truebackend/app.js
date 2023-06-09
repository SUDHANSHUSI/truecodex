const express = require("express");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const pageRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminBlogRoutes");
const validateToken = require("./middleware/middleware");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api", contactRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const Page = require('../models/Page');
const slugify = require('slugify');

// Create a new page
exports.createPage = async (req, res) => {
  try {
    const { title, description } = req.body;

    const pageData = {
      title,
      description,
      slug: generateUniqueSlug(title), // Generate a unique slug based on the title
    };

    const page = new Page(pageData);
    const savedPage = await page.save();

    res.status(200).json(savedPage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page' });
  }
};

// Helper function to generate a unique slug
const generateUniqueSlug = (title) => {
  const options = {
    lower: true,
    remove: /[*+~.()'"!:@]/g
  };
  const slug = slugify(title, options);
  return slug;
};


// Get Page by Slug
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug });

    const pagedata = {
      id: page._id,
      title: page.title,
      description: page.description,
    };

    res.status(200).json(pagedata);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
};
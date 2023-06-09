const Category = require("../models/category");
const asyncHandler = require("express-async-handler")

exports.createCategory = asyncHandler(async (req, res) => {

    const { category_name } = req.body;

    const category = await Category.create({ category_name });

    res.status(201).json(category);
  } )

exports.updateCategory =asyncHandler( async (req, res) => {

    const { categoryId } = req.params;
    const { category_name } = req.body;

    const category = await Category.findByIdAndUpdate(categoryId, { category_name }, { new: true });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  })


// Get Categories
exports.getCategories = (async (req, res) => {

    const categories = await Category.find();
    const categoryList = categories.map((category) => ({
      id: category._id,
      name: category.category_name,
    }));
    res.status(200).json(categoryList);
  }) ;
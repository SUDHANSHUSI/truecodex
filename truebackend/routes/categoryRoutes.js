const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/create', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);

module.exports = router;

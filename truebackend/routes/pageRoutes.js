const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

router.get('/:slug', pageController.getPageBySlug);
router.post('/create', pageController.createPage);


module.exports = router;

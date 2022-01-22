const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.postCategory);

module.exports = router;
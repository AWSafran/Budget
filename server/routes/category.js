const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.postCategory);
router.put('/categories/:id', categoryController.putCategory);
router.delete('/categories/:id', categoryController.deactivateCategory);

module.exports = router;
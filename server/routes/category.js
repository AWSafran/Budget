const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.postCategory);
router.put('/:id', categoryController.putCategory);
router.delete('/:id', categoryController.deactivateCategory);

module.exports = router;
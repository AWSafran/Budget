const express = require('express');
const router = express.Router();
const categoryService = require('../services/category');

async function getCategories (req, res, next) {
    const rows = await categoryService.getAllCategories();
    res.json(rows);
}

async function postCategory (req, res, next) {
    const response = await categoryService.addCategory(req.body.name);
    res.json(response);
}

async function putCategory (req, res, next) {
    const response = await categoryService.editCategory(req.params.id, req.body.name, req.body.isActive);
    res.json(response);
}

async function deactivateCategory(req, res, next) {
    const response = await categoryService.deactivateCategory(req.params.id);
    res.json(response);
}

router.get('/', getCategories);
router.post('/', postCategory);
router.put('/:id', putCategory);
router.delete('/:id', deactivateCategory);

module.exports = router;
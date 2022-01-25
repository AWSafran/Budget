const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const categoryService = require('../services/category');

async function getCategories (req, res, next) {
    const rows = await categoryService.getAllCategories();
    res.json(rows);
}

async function postCategory (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await categoryService.addCategory(req.body.name);
    res.json(response);
}

async function putCategory (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await categoryService.editCategory(req.params.id, req.body.name, req.body.isActive);
    res.json(response);
}

async function deactivateCategory(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await categoryService.deactivateCategory(req.params.id);
    res.json(response);
}

router.get('/', getCategories);

router.post(
    '/',
    body('name').isLength({ max: 100, min: 1 }),
    postCategory
);

router.put(
    '/:id',
    body('name').isLength({ max: 100, min: 1 }),
    body('isActive').isBoolean(),
    param('id').isNumeric(),
    putCategory
);

router.delete(
    '/:id',
    param('id').isNumeric(),
    deactivateCategory
);

module.exports = router;
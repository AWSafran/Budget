const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const merchantService = require('../services/merchant');

async function getMerchants(req, res, next) {
    const rows = await merchantService.getMerchants();
    res.json(rows);
}

async function postMerchant(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await merchantService.addMerchant(req.body.name, req.body.categoryId);
    res.json(response);
}

async function putMerchant(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await merchantService.editMerchant(req.params.id, req.body.name, req.body.categoryId);
    res.json(response);
}

router.get('/', getMerchants);

router.post(
    '/',
    body('name').isLength({ max: 100, min: 1 }),
    body('categoryId').isNumeric(),
    postMerchant
);

router.put(
    '/:id',
    body('name').isLength({ max: 100, min: 1 }),
    body('categoryId').isNumeric(),
    param('id').isNumeric(),
    putMerchant
);

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const monthlyTargetService = require('../services/monthlyTarget');

async function getMonthlyTargets(req, res, next) {
    const rows = await monthlyTargetService.getMonthlyTargets();
    res.json(rows);
}

async function addOrUpdateMonthlyTargets(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const result = await monthlyTargetService.addOrUpdateMonthlyTargets(req.body.targets);
    res.json(result);
}

async function deleteMonthlyTarget(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const result = await monthlyTargetService.deleteMonthlyTarget(req.body.categoryId, req.body.month, req.body.year);
    res.json(result);
}

router.get('/', getMonthlyTargets);
router.post(
    '/',
    body('targets').isArray(),
    body('targets.*.amount').isNumeric(),
    body('targets.*.month').isNumeric(),
    body('targets.*.year').isNumeric(),
    body('targets.*.categoryId').isNumeric(),
    addOrUpdateMonthlyTargets
);

router.delete(
    '/',
    body('categoryId').isNumeric(),
    body('month').isNumeric(),
    body('year').isNumeric(),
    deleteMonthlyTarget
);

module.exports = router;

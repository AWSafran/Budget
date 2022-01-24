const express = require('express');
const router = express.Router();
const monthlyTargetService = require('../services/monthlyTarget');

async function getMonthlyTargets(req, res, next) {
    const rows = await monthlyTargetService.getMonthlyTargets();
    res.json(rows);
}

async function addOrUpdateMonthlyTargets(req, res, next) {
    const result = await monthlyTargetService.addOrUpdateMonthlyTargets(req.body.targets);
    res.json(result);
}

async function deleteMonthlyTarget(req, res, next) {
    const result = await monthlyTargetService.deleteMonthlyTarget(req.body.categoryId, req.body.month, req.body.year);
    res.json(result);
}

router.get('/', getMonthlyTargets);
router.post('/', addOrUpdateMonthlyTargets);
router.delete('/', deleteMonthlyTarget);

module.exports = router;

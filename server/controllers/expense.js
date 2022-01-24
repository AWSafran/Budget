const express = require('express');
const { param, body, validationResult } = require('express-validator');
const router = express.Router();
const expenseService = require('../services/expense');

async function getExpenses(req, res, next) {
    const rows = await expenseService.getExpenses();
    res.json(rows);
}

async function postExpenses(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await expenseService.addExpenses(req.body.expenses);
    res.json(response);
}

async function putExpense(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await expenseService.editExpense(req.params.id, req.body.amount, req.body.expenseDate, req.body.merchantId);
    res.json(response);
}

async function deleteExpense(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const response = await expenseService.deleteExpense(req.params.id);
    res.json(response);
}

router.get('/', getExpenses);
router.post(
    '/',
    body('expenses').isArray(),
    body('expenses.*.amount').isNumeric(),
    body('expenses.*.expenseDate').isDate(),
    body('expenses.*.merchantId').isNumeric(),
    postExpenses
);

router.put(
    '/:id',
    param('id').isNumeric(),
    body('amount').isNumeric(),
    body('expenseDate').isDate(),
    body('merchantId').isNumeric(),
    putExpense
);

router.delete(
    '/:id',
    param('id').isNumeric(),
    deleteExpense
);

module.exports = router;
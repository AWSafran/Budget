const express = require('express');
const router = express.Router();
const expenseService = require('../services/expense');

async function getExpenses(req, res, next) {
    const rows = await expenseService.getExpenses();
    res.json(rows);
}

async function postExpenses(req, res, next) {
    console.log(req.body);
    const response = await expenseService.addExpenses(req.body.expenses);
    res.json(response);
}

async function putExpense(req, res, next) {
    const response = await expenseService.editExpense(req.params.id, req.body.amount, req.body.expenseDate, req.body.merchantId);
    res.json(response);
}

async function deleteExpense(req, res, next) {
    const response = await expenseService.deleteExpense(req.params.id);
    res.json(response);
}

router.get('/', getExpenses);
router.post('/', postExpenses);
router.put('/:id', putExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
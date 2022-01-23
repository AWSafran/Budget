const express = require('express');
const expenseController = require('../controllers/expense');
const router = express.Router();

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.postExpenses);
router.put('/:id', expenseController.putExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
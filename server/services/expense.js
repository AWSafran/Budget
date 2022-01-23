const db = require('../database/database');

async function getExpenses() {
    const query = 'SELECT id, amount, expenseDate, month, year, merchantId FROM Expense;';
    const rows = await db.query(query);
    return rows;
}

async function addExpenses(expenses) {
    let addQuery = 'INSERT INTO Expense(amount, expenseDate, merchantId) VALUES ';
    let addParams = [];

    expenses.forEach((expense, index) => {
        addQuery += index === 0 ? '(?,?,?)' : ',(?,?,?)';
        addParams.push(expense.amount, expense.expenseDate, expense.merchantId);
    })

    const result = await db.query(addQuery, addParams);
    return result;
}

async function editExpense(expenseId, amount, expenseDate, merchantId) {
    const existingQuery = 'SELECT id FROM Expense WHERE id = ?';
    const existingParams = [expenseId];
    const existing = db.query(existingQuery, existingParams);
    if (!existing) {
        return '404 Expense not found';
    }

    const updateQuery = 'UPDATE Expense SET amount = ?, expenseDate = ?, merchantId = ? WHERE id = ?';
    const updateParams = [amount, expenseDate, merchantId, expenseId];
    const result = await db.query(updateQuery, updateParams);
    return result;
}

async function deleteExpense(expenseId) {
    const existingQuery = 'SELECT id FROM Expense WHERE id = ?';
    const existingParams = [expenseId];
    const [existing] = await db.query(existingQuery, existingParams);

    if (!existing) {
        return '404 Expense not found';
    }

    const deleteQuery = 'DELETE FROM Expense WHERE id = ?';
    const deleteParams = [expenseId];
    const result = await db.query(deleteQuery, deleteParams);
    return result;
}

module.exports = {
    getExpenses,
    addExpenses,
    editExpense,
    deleteExpense
}
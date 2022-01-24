const db = require('../database/database');

async function getMonthlyTargets() {
    const query = 'SELECT amount, categoryId, month, year FROM MonthlyTarget';
    const rows = await db.query(query);
    return rows;
}

async function addOrUpdateMonthlyTargets(targets) {
    let addQuery = 'INSERT INTO MonthlyTarget(amount, categoryId, month, year) VALUES';
    const addParams = [];

    targets.forEach((target, index) => {
        addQuery += index === 0 ? '(?,?,?,?)' : ', (?,?,?,?)';
        addParams.push(target.amount, target.categoryId, target.month, target.year);
    });

    // MonthlyTarget has a composite key of categoryId, month, year
    addQuery += 'ON DUPLICATE KEY UPDATE amount=VALUES(amount)';

    const result = await db.query(addQuery, addParams);
    return result;
}

async function deleteMonthlyTarget(categoryId, month, year) {
    const existingQuery = 'SELECT categoryId, month, year FROM MonthlyTarget WHERE categoryId = ? AND month = ? AND year = ?';
    const existingParams = [categoryId, month, year];

    const existing = await db.query(existingQuery, existingParams);
    if (existing === null) {
        return '404 Monthly Target not found';
    }
    console.log(existing)
    console.log([categoryId, month, year]);

    const deleteQuery = 'DELETE FROM MonthlyTarget WHERE categoryId = ? AND month = ? AND year = ?';
    const deleteParams = [categoryId, month, year];

    const result = await db.query(deleteQuery, deleteParams);
    return result;
}

module.exports = {
    getMonthlyTargets,
    addOrUpdateMonthlyTargets,
    deleteMonthlyTarget
};
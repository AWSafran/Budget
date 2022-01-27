const db = require('../database/database');

async function getAllCategories() {
    const sql = 'SELECT id, name, isActive FROM Category;';
    const rows = await db.query(sql);
    return rows;
}

async function addCategory(categoryName) {
    const dupeCheckQuery = 'SELECT id FROM Category WHERE name = ?;';
    const dupeCheckParams = [categoryName];
    const rows = await db.query(dupeCheckQuery, dupeCheckParams);
    if (rows.length !== 0) {
        return 'Category Name must be unique';
    }
    const insertQuery = 'INSERT INTO Category(name, isActive) VALUES(?, true);';
    const insertParams = [categoryName];
    await db.query(insertQuery, insertParams);
    return await getAllCategories();
}

async function editCategory(categoryId, newName, isActive) {
    const fetchExistingQuery = 'SELECT id, name, isActive FROM Category WHERE id = ?;';
    const fetchExistingParams = [categoryId];
    const existing = await db.query(fetchExistingQuery, fetchExistingParams);
    if(existing.length === 0) {
        return '404 Category not found';
    }

    const dupeCheckQuery = 'SELECT id FROM Category WHERE name = ?;';
    const dupeCheckParams = [newName];
    const rows = await db.query(dupeCheckQuery, dupeCheckParams);
    if (rows.length !== 0) {
        return 'Category Name must be unique';
    }

    const updateQuery = 'UPDATE Category SET name = ?, isActive = ? WHERE id = ?;';
    const updateParams = [newName, isActive, categoryId];
    await db.query(updateQuery, updateParams);
    return await getAllCategories();
}

async function deactivateCategory(categoryId) {
    const fetchExistingQuery = 'SELECT isActive FROM Category WHERE id = ?;';
    const fetchExistingParams = [categoryId];
    const [ existing ] = await db.query(fetchExistingQuery, fetchExistingParams);
    if (existing === null) {
        return '404 Category not found';
    } else if (!existing.isActive) {
        return 'Category already inactive';
    }
    const deactivateQuery = 'UPDATE Category SET isActive = false WHERE id = ?;';
    const deactivateParams = [categoryId];
    await db.query(deactivateQuery,deactivateParams);
    return await getAllCategories();
}

module.exports = {
    getAllCategories,
    addCategory,
    editCategory,
    deactivateCategory
};
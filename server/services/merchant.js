const db = require('../database/database');

async function getMerchants() {
    const query = 'SELECT m.id, m.name, m.categoryId, c.name as categoryName FROM Merchant m LEFT JOIN Category c ON c.id = m.categoryId;';
    const rows = await db.query(query);
    return rows;
}

async function addMerchant(name, categoryId) {
    const dupeCheckQuery = 'SELECT id FROM Merchant WHERE name = ? AND categoryId = ?;';
    const dupeCheckParams = [name, categoryId];
    const [existingMerchant] = await db.query(dupeCheckQuery, dupeCheckParams);
    if (existingMerchant) {
        return 'Merchant already exists';
    }

    const addQuery = 'INSERT INTO Merchant(name, categoryId) VALUES(?,?);';
    const addParams = [name, categoryId];
    await db.query(addQuery, addParams);
    return await getMerchants();
}

async function editMerchant(merchantId, name, categoryId) {
    const fetchExistingQuery = 'SELECT id FROM Merchant WHERE id = ?;';
    const fetchExistingParams = [merchantId];
    const [existing] = await db.query(fetchExistingQuery, fetchExistingParams);
    if (!existing) {
        return '404 Merchant not found';
    }

    const dupeCheckQuery = 'SELECT id FROM Merchant WHERE name = ? AND categoryId = ?;';
    const dupeCheckParams = [name, categoryId];
    const [duplicate] = await db.query(dupeCheckQuery, dupeCheckParams);
    if (duplicate) {
        return 'Merchant Name must be unique within category';
    }

    const updateQuery = 'UPDATE Merchant SET name = ?, categoryId = ? WHERE id = ?';
    const updateParams = [name, categoryId, merchantId];

    const result = await db.query(updateQuery, updateParams);
    return result;
}

module.exports = {
    getMerchants,
    addMerchant,
    editMerchant
};
const { connect } = require('http2');
const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params = null) {
    const connection = await mysql.createConnection(config.db)
    const [results] = await connection.execute(sql, params);
    return results ? results : [];
}

module.exports = { query };
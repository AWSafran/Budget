const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.mysqlPassword,
    database: 'budget'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
    connection.query('select * from Category;', function (err, result) {
        if (err) throw err;
        console.log(result);
      });
})

module.exports = { connection };
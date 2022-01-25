const env = process.env;

const config = {
    db: {
        host: env.dbHost || 'localhost',
        user: env.dbUser || 'root',
        password: env.mysqlPassword,
        database: env.databaseName
    }
}

module.exports = config;
const { Pool } = require('pg');

const dbConfig = {
    user: 'blockchain',
    host: 'localhost',
    database: 'offchain',
    password: 'blockchain',
    port: 5433,
};

const pool = new Pool(dbConfig);

module.exports = pool;
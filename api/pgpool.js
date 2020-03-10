
const pg = require('pg');
const config = require('./config');

let pool;

module.exports = {
    getPool: () => {
        if(pool) return pool;

        pool = new pg.Pool(config.db);
        return pool;
    }
}
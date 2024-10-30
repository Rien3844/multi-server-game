import { config } from '../config/config.js'
import mysql from 'mysql2/promise'
import { formatDate } from '../utils/dateFormatter.js';

const createPool = (dbConfig) => {
    const pool = mysql.createPool({
        ...config.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    //pool을 통해 query를 실행했을때 해당 쿼리에 대한 로그
    const originalQuery = pool.query;

    pool.query = (sql, params) => {
        const date = new Date();

        console.log(`[${formatDate(date)}], Excuting query: ${sql}${params ? ` ,${JSON.stringify(params)}` : ``}`);

        return originalQuery.call(pool, sql, params)
    }

    return pool;
};

const dbPool = createPool();

export default dbPool;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPool from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchema = async () => {
    const sqlDir = path.join(__dirname, '../sql');

    try{
        // 쿼리 실행
        const sql = fs.readFileSync(sqlDir + '/user_db.sql', 'utf8');

        const queries = sql.split(';')
        .map((query) => query.trim())
        .filter((query) => query.length > 0);

        for (const query of queries){
            await dbPool.query(query);
        }
    }catch(e){
        console.error('데이터DB 마이그레이션 에러, ',e);
    }
}

createSchema().then(() => {
    console.log('마이그레이션이 완료되었습니다.');
})
.catch((e) => {
    console.error(e);
})
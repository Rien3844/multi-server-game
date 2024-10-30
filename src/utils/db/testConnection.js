// 확실한 코드 컨벤션이 있어서 어떤 함수, 어떤 규칙일때는 함수 그자체로 바로 export하고,
// 아니면 다른 규칙이 있을때는 파일 그자체로 default해서 export한다.

import dbPool from "../../db/database.js";

export const testConnection = async (pool) => {
    try{
        //테스트 쿼리 작성.
        const [rows] = await dbPool.query('SELECT 1 + 1 AS solution');
        console.log(`테스트 쿼리 결과:`, rows[0].solution);
    }catch(e){
        console.error(`테스트 쿼리 실행 오류`,e);
    }
}
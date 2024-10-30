import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../constants/env.js";

// 선언해둔 환경변수, 상수들을 해당 객체를 통해 불러오게 함.
export const config = {
    database: {
        database: DB_NAME,
        host: DB_HOST,
        password: DB_PASSWORD,
        port: DB_PORT,
        user: DB_USER,
    }
}
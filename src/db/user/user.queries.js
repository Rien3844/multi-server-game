//user와 관련된 query를 미리 세팅해두기
export const USER_QUERIES = {
    //user select
    FIND_USER_BY_DEVICE_ID: 'SELECT * FROM user WHERE device_id = ?',
    //user create
    CREATE_USER: 'INSERT INTO user (device_id) VALUES (?)',
    //user update
    UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE device_id = ?',
    UPDATE_USER_LOCATION: 'UPDATE user SET x_coord = ?, y_coord = ? WHERE device_id = ? '
};

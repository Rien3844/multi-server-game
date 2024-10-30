import { toCamelCase } from "../../utils/transformCase.js";
import dbPool from "../database.js";
import { USER_QUERIES } from "./user.queries.js"

//실제로 호출할 함수 만들기
export const findUserByDeviceId = async (deviceId) => {
    const [row] = await dbPool.query(USER_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
    return toCamelCase(row[0]);
};
export const createUser = async (deviceId) => {
    await dbPool.query(USER_QUERIES.CREATE_USER, [deviceId]);
    return {deviceId};
};

export const updateUserLogin =  async (deviceId) => {
    await dbPool.query(USER_QUERIES.UPDATE_USER_LOGIN, [deviceId]);
};
// query문의 ? 3개와 파라미터의 위치가 동일해야함.
export const updateUserLocation = async (x, y, deviceId) => {
    await dbPool.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
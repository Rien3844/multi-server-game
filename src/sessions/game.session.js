import Game from "../classes/models/game.class.js";
import { gameSessions } from "./sessions.js";

export const addGameSession = (id) => {
    const session = new Game(id);
    gameSessions.push(session);

    return session;
}

// 게임 세션 삭제
export const removeGameSession = () => {
    delete gameSessions[0];
};

// 게임 세션 불러오기
export const getGameSession = () => {
    //단 하나의 게임세션만 만들 것이기 떄문에 0번째 세션을 가져옴.
    return gameSessions[0];
};
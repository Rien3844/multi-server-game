import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const onConnection = (socket) => {
    console.log(`Client connected from : ${socket.remoteAddress}:${socket.remotePort}`);

    //데이터를 넣었다 뺏다하면서 읽기 위해 connction에서 어떠한 데이터를 받기 이전에 socket.buffer에 아무 크기가 없는 Buffer를 만들어줌.
    socket.buffer = Buffer.alloc(0);

    socket.on('data', onData(socket));
    socket.on('end', onEnd(socket));
    socket.on('error', onError(socket));
}
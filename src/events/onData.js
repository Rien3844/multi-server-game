import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";
import { getHandlerById } from "../handler/index.js";
import { getProtoMessages } from "../init/loadProto.js";
import { getUserBySocket } from "../sessions/user.session.js";
import { packetParser } from "../utils/parser/packetParser.js";

export const onData = (socket) => (data) => {
    // 기존에 있던 socket.buffer에 data를 더해준다.
    socket.buffer = Buffer.concat([socket.buffer, data]);
    // 패킷 구조 - 앞의 4Byte에 메세지의 전체 길이, 그다음 1Byte에 패킷의 타입, 그뒤로부터 실제로 패싱해야하는 메세지.
    const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH; // = 5

    while(socket.buffer.length > totalHeaderLength){
        // 전체의 길이
        const length = socket.buffer.readUInt32BE(0);//0번째부터 읽겠다.
        // 패킷 타입
        const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);
        // socket.buffer의 길이가 전체 길이보다 길다면
        if(socket.buffer.length >= length){
            // 데이터와 헤더가 있고, 헤더가 다 들어왔다고 가정하면 헤더를 잘라낸 나머지부분 = 실제 패킷 정보
            //subarray = slice와 같은 역할. 사용법도 같음.
            const packet = socket.buffer.subarray(totalHeaderLength, length);
            //자른 나머지 부분을 socket.buffer에 넣어줌.
            socket.buffer = socket.buffer.subarray(length);
            try{
                switch(packetType){
                    case PACKET_TYPE.PING:{
                        const protoMessages = getProtoMessages();
                        const Ping = protoMessages.common.Ping;
                        const pingMessage = Ping.decode(packet);
                        const user = getUserBySocket(socket);
                        if(!user){
                            console.error('user not found');
                        }
                        user.handlePong(pingMessage);
                    }
                    break;
                    case PACKET_TYPE.NORMAL: {
                        //패킷 파서
                        const {handlerId, userId, payload} = packetParser(packet);
                        const handler = getHandlerById(handlerId);
                        
                        handler({ socket, userId, payload });
                    }
                }
            }catch(e){
                console.error(e);
            }
        }
        //아니라면
        else{
            break;
        }
    }
};
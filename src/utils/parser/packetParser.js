import { CLIENT_VERSION } from "../../constants/env.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProto.js"

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();

    const commonPacket = protoMessages.common.Packet;
    let packet;
    // 파킷이 끝난 commonPacket을 packet에 넣기.
    try{
        packet = commonPacket.decode(data);
    }catch(e){
        console.error(e);
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.version;

    //서버가 보낸 CLIENT_VERSION과 clientVersion이 일치하지 않는다면 에러 발생.
    if(clientVersion !== CLIENT_VERSION ){
        throw Error();
    };

    //payload에서 필요한 메세지형태(protoType)를 handlerId를 이용해 찾음.
    const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
    //handler/index.js와 같은 내용 검사 - 혹시 모를 경우를 대비해 이중으로 검사.(getProtoTypeNameByHandlerId는 있는데 ProtoType이 없을수도 있으니까.)
    if(!protoTypeName){
        throw Error();
    }

    //찾은 값을 빼서 쓰기 쉽게 .으로 구분
    const [namespace, typeName] = protoTypeName.split('.');
    const payloadType = protoMessages[namespace][typeName];
    let payload;

    try{
        payload = payloadType.decode(packet.payload);
    }catch(e){
        console.error(e);
    }
    // payload에 입력해둔 3개의 값을 찾아옴.
    const expectedFields = Object.keys(payloadType.fields);
    //파싱이 끝난 이후 
    const actualFields = Object.keys(payload);

    //값이 다와야 하는데 전부 오지않앗을때의 에러 처리(ex - InitialPayload의 deviceId, playerId, latency, 중에 하나라도 오지 않았다.)
    //받아야 하는 값이 하나라도 없다면 잘못 보낸 것에 대한 검증
    const missingFields = expectedFields.filter((field) => !actualFields.includes(field))

    if(missingFields > 0){
        throw Error();
    }

    return { handlerId, userId, payload };
}
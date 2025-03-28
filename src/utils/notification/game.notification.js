//배열을 byte배열로 직렬화 하는 함수

import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProto.js"

//리턴할때 헤더등을 받아주는 함수
//serializer - 일련 번호 , Serialization - 직렬화
const serializer = (message, type) => {
    const packetLength = Buffer.alloc(TOTAL_LENGTH);
    packetLength.writeUint32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

    const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
    packetType.writeInt8(type, 0);

    return Buffer.concat([packetLength, packetType, message]);
}

export const createLocationPacket = (users) => {
    const protoMessages = getProtoMessages();
    const location = protoMessages.gameNotification.LocationUpdate;

    const payload = { users };
    const message = location.create(payload);
    const locationPacket = location.encode(message).finish();
    return serializer(locationPacket, PACKET_TYPE.LOCATION);
}

export const createPingPacket = (timestamp) => {
    const protoMessages = getProtoMessages();
    const ping = protoMessages.common.Ping;

    const payload = { timestamp };
    const message = ping.create(payload);
    const pingPacket = ping.encode(message).finish();
    return serializer(pingPacket, PACKET_TYPE.PING);
}
// handler를 총관리하는 index

import { HANDLER_IDS } from "../constants/handlerId.js";

// 파싱을 하는 handler
const handlers = {
    [HANDLER_IDS.INITIAL]: {
        protoType: 'initial.InitialPayload'
    }
}

export const getProtoTypeNameByHandlerId = (handlerId) => {
    //handlers에 해당 handlerId가 존재하지 않는다면
    if(!handlers[handlerId]){
        throw Error();
    }

    return handlers[handlerId].protoType;
}
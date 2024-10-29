// handler를 총관리하는 index

import { HANDLER_IDS } from "../constants/handlerId.js";
import locationUpdateHandler from "./game/LocationUpdate.handler.js";
import initialHandler from "./user/initial.handler.js";


// 파싱을 하는 handler
const handlers = {
    [HANDLER_IDS.INITIAL]: {
        handler: initialHandler,
        protoType: 'initial.InitialPayload',
    },
    [HANDLER_IDS.LOCATION_UPDATE]:{
        handler: locationUpdateHandler,
        protoType: 'game.LocationUpdatePayload',
    },
}

export const getHandlerById = (handlerId) => {
    //handlers에 해당 handlerId가 존재하지 않는다면
    if(!handlers[handlerId]){
        throw Error();
    }

    return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    //handlers에 해당 handlerId가 존재하지 않는다면
    if(!handlers[handlerId]){
        throw Error();
    }

    return handlers[handlerId].protoType;
};
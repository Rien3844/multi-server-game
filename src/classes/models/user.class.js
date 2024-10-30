
class User{
    constructor(socket, id, playerId, latency, coords){
        this.id = id;
        this.socket = socket;
        this. playerId = playerId;
        this.latency = latency;
        this.x = coords.x;
        this.y = coords.y;
        //가장 마지막에 위치, 상태가 업데이트 된 시간을 기록해줌.
        this.lastUpdateTime = Date.now();
    }

    updatePosition(x, y){
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }
}

export default User;
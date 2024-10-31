import { createPingPacket } from "../../utils/notification/game.notification";

class User{
    constructor(socket, id, playerId, latency, coords){
        this.id = id;
        this.socket = socket;
        this. playerId = playerId;
        this.latency = latency;
        this.x = coords.x;
        this.y = coords.y;
        this.lastX = 0
        this.lastY = 0;
        //가장 마지막에 위치, 상태가 업데이트 된 시간을 기록해줌.
        this.lastUpdateTime = Date.now();
        this.speed = 3;//client 스피드 확인해야함.
    }

    updatePosition(x, y){
        this.lastX = x;
        this.lastY = y;
        this.x = x;
        this.y = y;
        this.lastUpdateTime = Date.now();
    }

    ping(){
        const now = Date.now();

        this.socket.write(createPingPacket(now));
    }

    handlerPong(data){
        const now = Date.now();
        this.latency = (now - data.timestamp) / 2; // 갈때 5초 올때 15초면 그걸 정확히 계산하는거보다 /2해서 '그럼 편도로 10초겠네?'같이 간단하게 계산하기 위함.
    }

    //추측항법적용
    calculatePosition(latency){
        //가만히있으면
        if(this.x === this.lastX && this.y === this.lastY){
            return {
                x: this.x,
                y: this.y,
            };
        }
        //거속시
        const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000;
        //이동거리
        const distance = this.speed * timeDiff;
        //방향
        const directionX = this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
        const directionY = this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;

        return {
            x: this.x + directionX * distance,
            y: this.y + directionY * distance,
        }
    }
}

export default User;
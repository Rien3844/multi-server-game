import { createLocationPacket } from "../../utils/notification/game.notification.js";
import LatencyManager from "../managers/latency.manager.js";

class Game {
    constructor(id){
        this.id = id;
        this.users = [];
        this.latencyManager = new LatencyManager();
    }
    //유저추가
    addUser(user) {
        this.users.push(user);

        this.latencyManager.addUser(user.id, user.ping.bind(user), 1000);
    };
    
    getUser(userId) {
        return this.users.find((user) => user.id === userId);
    };

    //findIndex를 이용해 유저가 받을 소켓과 인자로 가진 소켓을 비교해서 결과값이 있다면 splice를 통해 삭제.
    //removeUser 자체를 OnEnd나 OnError에서 사용할 것인데 어떤 데이터나 현재 접속한 유저의 정보를 알 수가 없고 소켓의 정보만 알 수 있음. => socket사용
    removeUser(socket) {
        const index = this.users.findIndex((user) => user.socket === socket);
        if (index != -1){
            if(this.users.length === 1){
                this.latencyManager.clearAll();
            }
            this.latencyManager.removeUser(this.users[index].id);
            return this.users.splice(index, 1)[0];
        }
    };

    getMaxLatency(){
        let maxLatency = 0;
        this.users.forEach((user) => {
            maxLatency = Math.max(maxLatency, user.latency);
        })

        return maxLatency;
    }

    getAllLocation(userId) {
        const maxLatency = this.getMaxLatency();

        const locationData = this.users.filter((user) => user.id !== userId)
        .map((user) => {
            const {x, y} = user.calculatePostiion(maxLatency);
            return { id: user.id, playerId: user.playerId, x, y};
        });

        return createLocationPacket(locationData);
    };
}

export default Game;
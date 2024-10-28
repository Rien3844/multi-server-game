

class Game {
    constructor(id){
        this.id = id;
        this.users = [];
    }
    //유저추가
    addUser(user) {
        this.users.push(user);
    };
    
    getUser(userId) {
        return this.users.find((user) => user.id === userId);
    };

    //findIndex를 이용해 유저가 받을 소켓과 인자로 가진 소켓을 비교해서 결과값이 있다면 splice를 통해 삭제.
    //removeUser 자체를 OnEnd나 OnError에서 사용할 것인데 어떤 데이터나 현재 접속한 유저의 정보를 알 수가 없고 소켓의 정보만 알 수 있음. => socket사용
    removeUser(socket) {
        const index = this.users.findIndex((user) => user.socket === socket);
        if (index != -1){
            return this.users.splice(index, 1)[0];
        }
    };

    getAllLocation() {};
}

export default Game;
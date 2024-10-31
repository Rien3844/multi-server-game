// 클라이언트에서 해당 핸들러로 위치가 이동될때마다(매 프레임마다) x, y좌표의 요청을 보낼것이다.
// common.proto로 감싸져있는 정보를 받기 때문에 userId를 알고 있을 것이고 해당 userId에 맞는 x, y좌표를 업데이트시켜주면됨. 
import { getGameSession } from "../../sessions/game.session.js";

const locationUpdateHandler = ({socket, userId, payload}) => {
    try{
        const { x, y } = payload;
        const gameSession = getGameSession();

        if(!gameSession){
            console.error('Game session not found');
        }
        //console.log(gameSession);
        //내위치 업데이트
        const user = gameSession.getUser(userId);
        if(!user){
            console.error('user not found');
        }
        
        user.updatePosition(x, y);

        const locationData = gameSession.getAllLocation(userId);

        socket.write(locationData);
    }catch(e){
        console.error(e);
    }
};

export default locationUpdateHandler;
import net from 'net';
import { PORT, HOST } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';

const server = net.createServer(onConnection);

//initServer가 정상적으로 로드가 되면 서버를 정상 실행하겠다.
initServer().then(() => {
    server.listen(PORT, HOST, () => {
        console.log(`서버가 ${HOST}:${PORT}에서 실행 중 입니다.`);
    });
}).catch((e) => {
    console.error(e);
    process.exit(1);
})//initServer에서 내부적으로 에러가 발생한다면 catch에서 내부에서 발생하는 에러를 감지하고 서버가 종료되게 함.
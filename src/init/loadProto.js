// 서버 폴더안에 있는 파일들을 경로를 찾아서 들어가서 읽을 것이므로 파일 시스템(fs) 필요.
import fs from 'fs';
//경로를 찾기 위한 path 필요.
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';

//현재 위치의 폴더를 찾는 것.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//프로토버프가 들어있는 폴더 찾기. => 현재 위치에서 뒤로가서 프로토버프폴더 들어가기.
const protoDir = path.join(__dirname, '../protobuf');

//fileList = 모든 proto 파일들의 경로
//폴더안에 폴더가 어느정도로 들어있는지 모르므로 재귀함수 사용.
const getAllProtoFiles = (dir, fileList = []) => {
    //현재 경로를 읽음.
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        //생성된 파일을 forEach문을 통해 files배열 안의 파일 하나의 경로 를 구해줌.
        const filePath = path.join(dir, file);
        
        //파일의 스텟이 폴더라면 getAllProtoFiles를 한번 더 호출.
        if(fs.statSync(filePath).isDirectory()){
            getAllProtoFiles(filePath, fileList);
        }//해당 파일의 확장자가 .proto라면
        else if(path.extname(file) === '.proto'){
            // 빈 배열에 현재의 filePath를 넘겨줌.
            fileList.push(filePath);
        }
    });

    return fileList;
}

//임시로 쓸 protoFiles 생성.(getAllProtoFiles를 호출함.)
const protoFiles = getAllProtoFiles(protoDir);

//프로토버프 폴더안에 있는 파일들을 읽어서 저장할 객체 생성
const protoMessages = {};

//프로토버프 파일 읽기
export const loadProtos = async () => {
    try{
        const root = new protobuf.Root();

        await Promise.all(protoFiles.map((file) => root.load(file)));

        //만든 packetNames를 반복문을 돌면서 해당 이름에 맞는것들을 매핑해서 protoMessages객체 안에 차곡차곡 담아줌.
        for (const [packetName, types] of Object.entries(packetNames)) {
            protoMessages[packetName] = {};
            //해당 패키지 안에 여러개의 패킷이 있을수도 있으므로 한번더 반복.
            for (const [type, typeName] of Object.entries(types)) {
              protoMessages[packetName][type] = root.lookupType(typeName);
            }
          }

        console.log("Protobuf 파일이 로드되었습니다.");
        console.log(protoMessages);
    }catch(e) {
        console.error("Protobuf 파일 로드 중 오류가 발생했습니다.", e);
    }
}

// protoMesseages는 변하면 안되므로 내용물이 변하지 않게 해주는 기능 추가
//Object.freeze(protoMessages);

// protoMesseages를 바깥으로 보내는 함수
export const getProtoMessages = () => {
    return { ...protoMessages };
}
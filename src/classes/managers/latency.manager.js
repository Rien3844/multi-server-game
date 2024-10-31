

class LatencyManager {
    constructor(){
        this.intervals = new Map();
    }

    addUser(userId, callback, timestamp){
        if(this.intervals.has(userId)){
            //todo 에러처리
            console.error('중복된 intervals입니다.');
        }

        this.intervals.set(userId, setInterval(callback, timestamp));
    }

    removeUser(userId){
        if(!this.intervals.has(userId)){
            return;
        }
        clearInterval(this.intervals.get(userId));
    }

    clearAll(){
        this.intervals.forEach((interval) => {
            clearInterval(interval);
        });

        this.intervals.clear();
    }
}

export default LatencyManager;
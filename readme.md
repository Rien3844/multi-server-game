# CH5 멀티플레이 과제

### **필수 기능 *(1~5일차)***

1일차 **프로젝트 생성 및 이벤트 별 코드 처리**

- [O]  프로젝트 시작
- [O]  소켓 이벤트 확인 - TCP Echo 서버 만들기(1) - 3. 서버 기본 세팅의 (2), (3) 참고.
- [O]  기능별 폴더, 파일 분리
- [O]  헤더 및 **패킷 구조 설계**

2일차 **환경변수 및 상수, 에러 처리**

- [O]  헤더 및 **패킷 구조 설계**
- [O]  상수 선언 및 환경 변수 세팅

3일차 **프로토콜 버퍼 적용 및 패킷 파싱**

- [O]  프로토콜 버퍼 적용
- [O]  패킷 파싱 테스트

4일차 **유저 세션 및 게임 세션 관리**

- [O]  유저, 게임 클래스 선언
- [O]  접속 시 생성 이벤트
- [O]  세션 관리 로직 추가

5일차 **접속 및 이동 패킷 교환**

- [ ]  접속 패킷 추가 및 파싱 테스트
- [ ]  클라이언트 접속 테스트
- [ ]  이동 패킷 추가 및 파싱 테스트
- [ ]  멀티플레이어 이동 테스트

---

<aside>
🏆

### **도전 기능 *(6~10일차)***

6일차 **DB 연동**

- [ ]  DB 세팅 및 (유저 정보) 데이터 모델링
- [ ]  (서버) 접속 및 접속 해제 시 유저 정보 기록

7일차 **DB 연동**

- [ ]  (클라이언트) 코드 확인 및 수정

8일차 **레이턴시 매니저, 추측항법 적용 - 서버**

- [ ]  게임 세션 별 레이턴시 매니저 추가
- [ ]  (서버) 추측항법 계산 및 적용

9일차 **핑 체크 - 클라이언트**

- [ ]  (클라이언트) ping 전송 로직 추가
- [ ]  (클라, 서버) ping 테스트

10일차 **최종 확인 및 테스트**

- [ ]  테스트
</aside>

## 패킷 구조
### 1. common
|필드명|타입|설명|
|:---:|:---:|:---:|
|handlerId|unit32|핸들러 ID(4바이트)|
|userId|string|유저 ID(UUID)|
|version|string|클라이언트 버전(문자열)|
|payload|bytes|실제 데이터|

### 2. InitialPayload
|필드명|타입|
|:---:|:---:|
|deviceId|string|
|playerId|unit32|
|latency|float|

### 3. LocationUpdatePayload
|필드명|타입|
|:---:|:---:|
|x|float|
|y|float|

### 4. LocationUpdate
|필드명|타입|
|:---:|:---:|
|id|string|
|playerId|unit32|
|x|float|
|y|float|

### 5. Response
|필드명|타입|설명|
|:---:|:---:|:---:|
|handlerId|unit32|핸들러 ID|
|responseCode|unit32|응답 코드(성공 : 0, 실패 : 에러 코드)|
|timestamp|long|메시지 생성 타임스탬프|
|data|bytes|실제 응답 데이터|

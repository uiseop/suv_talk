# Express에서 Typescript 적용하기.

## Nodemon 설정

nodemon이 ts를 알아먹도록 하기 위해서 실행(exec) 전에 ts파일을 js파일로 트랜스파일 해 줘야 함.
때문에 nodemon.json 파일을 만들고 관련 설정을 해 준다.

설정에는 다음과 같은 설정들이 있다고 한다.

- watch: 변경 감지 경로
- ext: 변경 감지 확장자
- ignore: 변경 감지 제외
- exec: nodemon 수행 명령`

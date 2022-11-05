# Express에서 Typescript 적용하기

## Nodemon 설정

nodemon이 ts를 알아먹도록 하기 위해서 실행(exec) 전에 ts파일을 js파일로 트랜스파일 해 줘야 함.
때문에 nodemon.json 파일을 만들고 관련 설정을 해 준다.

설정에는 다음과 같은 설정들이 있다고 한다.

-   watch: 변경 감지 경로
-   ext: 변경 감지 확장자
-   ignore: 변경 감지 제외
-   exec: nodemon 수행 명령`

## Express에서의 Bulid

`yarn run buil` 커멘드로 BE 코드들을 빌드 할 수 있다. 빌드 시점에서는 ts로 작성된 코드들이 js로 트랜스파일 되어 dist 디렉토리 안에 저장되는데, node로 서버를 실행하기 위함이라고 한다.
실제 서버를 배포할 때에는 dist 디렉토리 안에 있는 파일들이 배포된다.

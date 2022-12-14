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

## Express의 특징

- 매우 유연하다
- Express는 Node.JS의 프레임워크지만 특별한 기능들을 과도하게 추가하지 않으면서 Vanilla JS만을 사용할 때 보다 편리한 기능들을 제공해준다
- 높은 확장성을 지닌다

Express가 이러한 특징을 갖을 수 있게 된 이유는 바로 `요청을 하나의 큰 함수로 처리하지 않고 다양한 함수들로 연결을 통해 가공하여 응답하기 때문이다.` 하나의 큰 요청 핸들러를 공장에서 분업을 하는 방식 처럼 분업을 하는 방식으로 동작하기 때문에 필요한 기능이 있으면 그때마다 추가해서 사용하면 된다.

Express에서 분업은 `Middleware`라고 불린다. 각 Middleware에서 자신만의 일을 처리하고, 다음 Middleware로 전달을 하면서 최종으로 응답을 내려주기 때문에 중간에 새로운 과정이 생기거나, 변경이 필요하면 해당 Middleware만을 수정하기만 하면 된다. 때문에 필요에 따라 3rd party 라이브러리들을 입맛에 따라 가져다가 쓰면 되기 때문에 높은 확장성과 유연성을 갖는다고 한다.

Express에서 Middleware는 기본적으로 `req, res, next` 의 파라미터를 갖는데, next를 통해 다음 Middleware로의 전달을 수행한다.

## Express에서 라우팅

Express에서 라우팅을 하는 방식으로 use를 사용할 수 있다.
`app.use([path], callback)`으로 되어 있는데, path에 '/'를 적어 놓으면 '/' 경로에만 미들웨어가 적용되는 것이 아닌 '/'이하의 모든 경로에 적용된다.
가령 '/abcd/efgd'와 같은 경로에도 해당 미들웨어가 적용된다.

하지만 use를 사용할 경우 모든 요청에 대해서 반응하게 된다. 요청에 대한 메서드는 다양하다. GET, POST, PUT, UPDATE 등등 동일한 주소에 다양한 메서드들이 요청이 온다. 때문에 use 말고 명시적으로 각 메서드에 대한 요청만을 처리하는 미들웨어로 분리할 필요가 있으면 app.get이나 app.post 등으로 분리하도록 한다.

또한 파일이 커지게 되면 관심사를 분리하게 되는데 프론트 개발을 했을 때 처럼 연결되는 주소 별로 별도의 파일을 생성하는 것이 관리에 편리하다. Express에는 라우팅을 편리하게 해 주는 기능이 존재한다.


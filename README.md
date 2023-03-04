# chatgpt-serverless-discord-bot

<p align="center">
  <img src="https://user-images.githubusercontent.com/31124212/222870304-b45c1a34-6d9d-4971-b13e-987818d6b6eb.png" width="300" height="300">
  <br>
  <strong>서버 유지 비용 없는 커스텀 ChatGPT Discord Bot 템플릿</strong>
  <br>
  <br>
</p>




### AWS Lambda와 OpenAI API를 이용한 Serverless ChatGPT 봇 생성 템플릿입니다.

- **서버 유지관리 비용 (거의)없음** : Serverless 아키텍쳐를 이용해 AWS Lambda에 봇을 호스팅합니다. 한 달 동안 100만건의 요청이 무료입니다! 
- **간단한 프롬프트 수정** : 프롬프트를 간단히 수정하여 ChatGPT를 커스터마이징 할 수 있습니다. 친구를 따라하는 봇을 만들어보세요!
- **고가용성** : 서버가 다운되거나 하는 걸 걱정할 필요가 없습니다!
- **배포 및 수정** : 한번 설정해 두었다면, `serverless deploy` 명령 한 번으로 코드를 수정하고 변경할 수 있습니다!


### 설정 방법

**0. 이 리포지토리를 Fork 또는 Clone하고, .env.example 파일을 .env로 이름을 바꿔 주세요.**

**1. Discord 봇 생성**

- https://discordapp.com/developers/applications/ 에 접속하여 New Application을 눌러 새로운 Application을 생성합니다.
- Application 생성 후, 좌측의 `Bot` 탭에서 새로운 봇을 생성해 주세요.
- 그리고 `TOKEN`의 COPY 버튼을 누른 후, .env 파일의 `DISCORD_TOKEN` 부분에 붙여넣어 주세요.
- 이후 General Information 탭에서
   - `APPLICATION ID` 를 .env 파일의 `DISCORD_APPLICATION_ID` 부분에 붙여넣어 주세요.
   - `PUBLIC KEY` 를 .env 파일의 `DISCORD_PUBLIC_KEY` 부분에 붙여넣어 주세요.

**2. OpenAI API Token 발급**

- https://platform.openai.com/ 에 접속하여 가입 후, `Settings > Manage Account > Billing` 에서 카드를 등록해 주세요.
- 이후 `API Keys > +Create New secret key` 를 눌러 API 키를 생성 후, .env 파일의 `OPENAI_API_KEY` 부분에 붙여넣어 주세요.

**3. Node.js 설치 및 Serverless Framework 설정**

- https://nodejs.org/en/download/ 에 들어가서 Node.js를 다운 후 설치해 주세요.
- 이후 커맨드라인에서 `npm install -g serverless` 를 입력하여 Serverless Framework를 설치해 주세요. ([관련 문서](https://www.serverless.com/framework/docs/getting-started))

**4. AWS 접속 권한 설정**

- AWS에 가입하지 않았다면, AWS에 가입해 주세요. https://console.aws.amazon.com/console/home
- 콘솔에 로그인 후, `IAM -> 사용자 -> 사용자 추가` 를 눌러 새 사용자를 등록해 주세요.
  - 사용자 이름에 적절한 이름을 적어 주세요. 저는 `serverless-framework-deploy` 로 설정했습니다.
  - 이후 권한 설정에서 `직접 정책 연결 -> AdministratorAccess` 를 추가한 후, 다음 버튼을 눌러주세요.
  - 이후 사용자 생성 버튼을 누르면 새로운 사용자가 생성됩니다.
- 이후, `사용자` 방금 탭에서 방금 생성한 유저를 클릭합니다.
- 이후 `보안 자격 증명` 탭에서 `액세스 키 만들기` 를 클릭합니다.
  - `Command Line Interface(CLI)` 를 선택한 후, `위의 권장 사항을 이해했으며 액세스 키 생성을 계속하려고 합니다.` 를 체크 후 `다음`을 클릭합니다.
  - 설명 태그 값에 적당한 이름을 적습니다. 저는 `access key for serverless deploy` 라고 적었습니다.
- ⚠️이후 생성된 키로 Serverless Framework를 설정합니다. 이 때, Key가 유출되지 않도록 조심해 주세요!! 이 키가 유출되면, 누구나 내 AWS 계정을 사용할 수 있습니다!!⚠️
  - 파일에 저장해 두지 말고, 한번 설정한 이후 창을 닫아버리는 것을 추천합니다. 
- 다시 커맨드라인으로 돌아가서, `serverless config credentials --provider aws --key <액세스 키> --secret <비밀 액세스 키>` 를 설정합니다.
  - 이런 모양입니다 : `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

**5. 서버 배포**

- 커맨드라인에서 다음 커맨드를 실행하여, 관련 플러그인을 설치합니다.
  - `serverless plugin install -n serverless-plugin-typescript`
  - `serverless plugin install -n serverless-dotenv-plugin`
- 이후 서버를 배포합니다! `serverless deploy` 커맨드를 입력해 주세요.
- 이후 서버가 AWS에 올라가고, 잠깐 기다리면 `Endpoint : ANY - https://jkjadf823.execute-api.ap-northeast-1.amazonaws.com/` 와 같은 글이 뜹니다.
- 이 URL을 복사해 주세요.

**6. 디스코드 봇에 내 서버 등록 및 봇 초대**

- https://discord.com/developers/applications 에 다시 접속해, 1. 에서 생성한 어플리케이션을 찾습니다.
- `General Information > INTERACTIONS ENDPOINT URL` 에 방금 복사한 URL을 입력하고 저장해 주세요. 이 과정을 통해 내 디스코드 봇과, 서버가 연결됩니다.
- 이후 초대 링크를 생성합니다. `OAuth2 -> URL Generator` 에 접속합니다.
![image](https://user-images.githubusercontent.com/31124212/222872546-9353dc83-6319-4b55-9498-a7e7e6b0db23.png)
- 위와 같이 권한을 설정하고, URL을 저장합니다. 이 URL이 내 봇 초대 링크입니다!
- 이후, 해당 URL로 접속하여 내 서버에 봇을 초대합니다.

**7. 슬래시 커맨드 등록**

- 슬래시 커맨드란, 다음과 같은 것을 말합니다.
<p align="center">
  <img src="https://user-images.githubusercontent.com/31124212/222872631-41bee138-7565-4dad-b38f-1d07a1a2482e.png">
<p>
- 디스코드 서버에 별도로 Slash Command를 등록해야, 채팅창에 `/`를 입력했을 때 위와 같은 커맨드가 등록되게 됩니다.
- 리포지토리에서 `npm install --global yarn` 커맨드를 입력해 yarn을 설치해 주세요.
- 이후 `yarn install`을 입력하여 관련 라이브러리를 설치해 주세요.
- 이후 `yarn register`를 입력하여, 커맨드를 등록해 주세요.
- Registered all commands 가 떴다면, 올바르게 설정된 겁니다!
  
**8. 완료**
- `/질문` 커맨드를 이용하여 ChatGPT와 대화해 보세요!

### FAQ

- **프롬프트를 수정하고 싶어요!**
  - src/openai.ts 에 들어가서, `generatePrompt` 내부의 글자를 수정합니다. 이 때, Question은 유저가 입력한 값입니다.
  - 기본값으론, 예를 들어 유저가 "안녕" 이라고 입력했다면 ChatGPT에게는 다음과 같이 전달됩니다.
    ```
    너는 디스코드에서 운영되고 있는 봇이야.
    너는 가능한 한 친절하게 대답해야 해.
    이 질문에 대해 답해봐.
    질문 : 안녕
    ```
  - 수정을 완료했다면, `serverless deploy`를 입력하여 서버를 업데이트합니다.
- **슬래시 커맨드를 수정하고 싶어요!**
  - src/commands.ts에 들어가서, AVAILABLE_COMMANDS 를 수정합니다. **설정 방법** 의 슬래시 커맨드 등록 부분과 비교하며 글자를 수정해 보세요.
  - 이후 `yarn register`를 입력하여, 수정된 Slash Command를 등록합니다.
  - 이후, 만약 "질문" 부분을 수정했다면 handler.ts를 수정한 커맨드에 맞게 수정해 줍니다.
  ```
  if (message.data.name === "질문") { // << 54번 라인의 이 부분
  const question = message.data.options[0].value;
  ```
  - 이후 `serverless deploy` 를 입력하여 서버를 업데이트합니다.
  - 더 자세한 커스터마이징을 원하면, 관련 문서를 참고해 주세요.
  - 관련 문서 (Discord Interactions) : https://discord.com/developers/docs/interactions/receiving-and-responding
- **애플리케이션이 응답하지 않았어요** 가 떠요!
  - 서버 응답 시간이 한번씩 느려지면 그럴 수 있습니다.
  - 별도로 문제가 있는 것은 아니니, 재시도하면 정상 작동합니다.

### 프로젝트 구조

```
.
├── README.md        # 지금 읽고 있는 이 파일입니다.
├── handler.ts       # AWS Lambda가 Discord 서버로부터 요청을 받으면 실행되는 파일입니다. 내부의 handle 함수가 실행됩니다.
├── package.json
├── register.ts      # Discord Server에 Slash Command를 등록할 떄 실행되는 파일입니다.
├── serverless.yml
├── src
│   ├── commands.ts  # 등록되는 Slash Command입니다. 
│   ├── openai.ts    # OpenAI API를 사용하기 위한 파일입니다. generatePrompt 함수를 수정하여 프롬프트를 변경할 수 있습니다.
│   └── util.ts      # 유틸 함수입니다.
├── tsconfig.json
└── yarn.lock
```

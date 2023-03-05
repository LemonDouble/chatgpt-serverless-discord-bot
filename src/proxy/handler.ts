import { type APIGatewayEvent, type APIGatewayProxyResult } from "aws-lambda";
import nacl from "tweetnacl";
import { InteractionResponseType, InteractionType } from "discord-interactions";
import { throwError } from "../util";
import { AVAILABLE_COMMANDS } from "../commands";
import {
  InvocationType,
  InvokeCommand,
  LambdaClient,
} from "@aws-sdk/client-lambda";

export const handle = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const DISCORD_PUBLIC_KEY =
    process.env.DISCORD_PUBLIC_KEY ??
    throwError(`환경변수 DISCORD_PUBLIC_KEY가 설정되지 않았습니다.`);
  const signature =
    event.headers["x-signature-ed25519"] ??
    throwError(`signature가 전달되지 않았습니다.`);
  const timestamp =
    event.headers["x-signature-timestamp"] ??
    throwError(`signature timestamp가 전달되지 않았습니다.`);
  const strBody = event.body ?? throwError(`Body가 전달되지 않았습니다.`);
  console.log(`request body : ${strBody}`);

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(`invalid request signature`),
    };
  }

  const message = JSON.parse(strBody);

  if (message.type === InteractionType.PING) {
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ type: 1 }),
    };
  }

  if (message.type === InteractionType.APPLICATION_COMMAND) {
    switch (message.data.name) {
      case AVAILABLE_COMMANDS.name: {
        if (message.data.name === "질문") {
          const client = new LambdaClient({});
          await client.send(
            new InvokeCommand({
              FunctionName:
                "chatgpt-serverless-discord-bot-dev-openai-response",
              InvocationType: InvocationType.Event,
              Payload: Buffer.from(
                JSON.stringify({
                  token: message.token,
                  question: message.data.options[0].value,
                })
              ),
            })
          );
          return {
            statusCode: 200,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            }),
          };
        }
      }
    }
  }

  return {
    statusCode: 500,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      error: true,
      message: "Server Can't parse commands.",
    }),
  };
};

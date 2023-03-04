import { type APIGatewayEvent, type APIGatewayProxyResult } from "aws-lambda";
import nacl from "tweetnacl";
import { InteractionType } from "discord-interactions";

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

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify(`invalid request signature`),
    };
  }

  const parsedBody = JSON.parse(strBody);
  console.log(`Request Body : ${parsedBody}`);

  if (parsedBody.type === InteractionType.PING) {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 1 }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: true,
      message: "Server Can't parse commands.",
    }),
  };
};

const throwError = (message: string) => {
  throw new Error(message);
};

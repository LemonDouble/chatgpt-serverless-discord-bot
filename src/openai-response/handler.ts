import axios from "axios";
import { getChatGptAnswer } from "./openai";

interface OpenAIQuestionRequest {
  token: string;
  question: string;
}

export const handle = async (event: OpenAIQuestionRequest): Promise<void> => {
  console.log(event);

  const answer = await getChatGptAnswer(event.question);

  await axios.post(
    `https://discord.com/api/v9/webhooks/${process.env.DISCORD_APPLICATION_ID}/${event.token}`,
    JSON.stringify({
      content: answer,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

import { throwError } from "./util";
import { Configuration, OpenAIApi } from "openai";

const generatePrompt = (question: string): string => {
  return `너는 디스코드에서 운영되고 있는 봇이야.
    너는 가능한 한 친절하게 대답해야 해.
    이 질문에 대해 답해봐.
    질문 : ${question}`;
};

export const getChatGptAnswer = async (question: string) => {
  const OPENAI_API_KEY =
    process.env.OPENAI_API_KEY ??
    throwError(`환경변수 OPENAI_API_KEY가 설정되지 않았습니다.`);
  const openaiConfig = new Configuration({ apiKey: OPENAI_API_KEY });
  const openaiApi = new OpenAIApi(openaiConfig);

  const prompt = generatePrompt(question);
  const completion = await openaiApi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return (
    completion.data.choices[0].message?.content ??
    throwError(`OpenAI 서버가 비정상적인 값을 반환했습니다.`)
  );
};

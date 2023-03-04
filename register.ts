import { AVAILABLE_COMMANDS } from "./src/commands";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;

async function registerCommands(): Promise<void> {
  if (DISCORD_TOKEN === undefined || DISCORD_APPLICATION_ID === undefined) {
    throw new Error(
      "DISCORD_TOKEN 또는 DISCORD_APPLICATION_ID이 설정되지 않았습니다!"
    );
  }

  const url = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`;

  const response = await axios.put(url, JSON.stringify([AVAILABLE_COMMANDS]), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

  if (response.status === 200) {
    console.log("Registered all commands");
  } else {
    console.error("Error registering commands");
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
registerCommands().then();

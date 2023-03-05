import dotenv from "dotenv";
dotenv.config();

export const AVAILABLE_COMMANDS = {
  name: process.env.COMMAND_NAME,
  description: process.env.COMMAND_DESCRIPTION,
  options: [
    {
      name: process.env.OPTION_NAME,
      description: process.env.OPTION_DESCRIPTION,
      type: 3, // String, https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
      required: true,
    },
  ],
};

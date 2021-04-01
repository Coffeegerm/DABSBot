const Discord = require("discord.js");
const { tellAJoke } = require("./jokes");
const { getMinecraftServerStatus } = require("./minecraft");
require("dotenv").config();

var env = process.env.NODE_ENV || "development";

const client = new Discord.Client();
client.on("ready", () => {
  console.log("Bot is ready");
});
client.login(process.env.BOT_TOKEN);

const msgCommands = {
  "!smokeTest": (msg) => {
    if (env === "development") {
      return msg.channel.send(`Today is ${new Date().toLocaleDateString()}`);
    }
  },
  "!joke": (msg) => tellAJoke(msg),
  "!minecraftServerStatus": (msg) => getMinecraftServerStatus(msg),
};

client.on("message", (msg) => {
  const runnable = msgCommands[msg.content];
  runnable && runnable(msg);
});

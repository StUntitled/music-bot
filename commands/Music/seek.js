const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`);
const prettyMs = require("pretty-ms");
module.exports = {
  name: `seek`,
  category: `🎶 Music`,
  aliases: [`vol`],
  description: `Muda o tempo da música!`,
  usage: `seek <Duration in Seconds>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": false,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //seek to the position

    const time = args.join(" ");
    const response = seekTo(message, time);
    await message.channel.send(response);

function seekTo({ client, guildId }, time) {

  const durationToMillis = (duration) =>
  duration
    .split(":")
    .map(Number)
    .reduce((acc, curr) => curr + acc * 60) * 1000;

  const seekTo = durationToMillis(time);

  if (seekTo > player.queue.current.duration) {
    return "A duração que providenciaste excede a duração da música!";
  }

  player.seek(seekTo);
  return `Música puxada para o tempo \`${prettyMs(seekTo, { colonNotation: true, secondsDecimalDigits: 0 })}\``;
}

  },
  
};

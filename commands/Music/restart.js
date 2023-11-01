const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `restart`,
  category: `🎶 Music`,
  aliases: [`replay`],
  description: `Reinicia a música atual!`,
  usage: `restart`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": false,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //seek to 0
    player.seek(0);
    //send informational message
    message.channel.send(`Música reiniciada!`).catch(() => {})
  }
};
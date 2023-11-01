const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `clearqueue`,
  category: `🎶 Music`,
  aliases: [`clearqu`],
  description: `Cleares the Queue`,
  usage: `clearqueue`,
  cooldown: 10,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": false,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //clear the QUEUE
    player.queue.clear();
    //Send Success Message
    return message.reply({
      embeds: [new MessageEmbed()
        .setAuthor({name:`🗑 Fila limpa!`, iconURL: message.author.displayAvatarURL()})
        .setColor(process.env.COLOR)
      ]
    });
  }
};
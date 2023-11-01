const { MessageEmbed } = require("discord.js");

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
      let embed = new MessageEmbed()
      .setAuthor({name: `Música reiniciada!`, iconURL: message.user.displayAvatarURL()})
      .setColor(process.env.COLOR)
      message.reply({embeds:[embed]}).catch(() => {})
    }
  };
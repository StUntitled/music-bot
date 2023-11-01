const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `play`,
  category: `🎶 Music`,
  aliases: [`p`],
  description: `Toca uma música a partir de várias plataformas!`,
  usage: `play <Song / URL>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  type: "queuesong",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args return error
    if (!args[0]){
      const embed = new MessageEmbed()
      .setAuthor({name:`Diz um link ou um nome de uma música para eu poder tocar!`, iconURL: message.author.displayAvatarURL()})
      .setColor(es.wrongcolor)
      return message.reply({
        embeds: [embed]
      });
    }
    const embedmusic = new MessageEmbed()
    .setAuthor({name:`A procurar uma música para ${message.author.username}...`, iconURL: message.author.displayAvatarURL()})
    .setColor(es.wrongcolor)
    if (args.join("").includes("soundcloud")) {
      playermanager(client, message, args, `song:soundcloud`);
    } else if (args.join("").includes("spotify")) {
      playermanager(client, message, args, `song:raw`);
    } else if (args.join("").includes("apple")) {
      playermanager(client, message, args, `song:raw`);
    } else {
      //play from YOUTUBE
      playermanager(client, message, args, `song:youtube`);
      message.reply({
        embeds: [embedmusic]
      }).then(msg => setTimeout(() => msg.delete(), 10000))
    }
  }
};
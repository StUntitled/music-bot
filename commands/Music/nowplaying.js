const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, "trackinfo"],
  description: `Shows detailled information about the current Song`,
  usage: `nowplaying`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no current song return error
    if (!player.queue.current)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable1"]))
        ]
      });
    const embed = new MessageEmbed()
      .setAuthor(client.getAuthor(`Música a tocar agora:`, message.guild.iconURL({
        dynamic: true
      })))
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor(process.env.COLOR)
      .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable2"]))
      .addField(`${emoji.msg.time} Progresso: `, createBar(player))
      .setFooter({text:`Pedido de: ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({
        dynamic: true
      })})
    //Send Now playing Message
    return message.reply({
      embeds: [embed]
    });
  }
};

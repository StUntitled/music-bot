const {
    MessageEmbed
  } = require(`discord.js`);
  const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
  module.exports = {
    name: `moveme`,
    category: `🎶 Music`,
    aliases: [`mm`, "mvm", "my", "mvy", "moveyou", "mover"],
    description: `Move-te para o bot se tiver a tocar alguma coisa!`,
    usage: `move`,
    parameters: {
      "type": "music",
      "activeplayer": true,
      "previoussong": false,
      "notsamechannel": true
    },
    type: "bot",
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
      let channel = message.member.voice.channel;
      let botchannel = message.guild.me.voice.channel;
      if (!botchannel)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["music"]["moveme"]["variable1"]))
          ]
        });
      if (!channel)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["music"]["moveme"]["variable2"]))
          ]
        });
      if (botchannel.userLimit >= botchannel.members.length)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["music"]["moveme"]["variable3"]))
          ]
        });
      if (botchannel.id == channel.id)
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setTitle(eval(client.la[ls]["cmds"]["music"]["moveme"]["variable4"]))
          ]
        });
      message.member.voice.setChannel(botchannel);
      let embedmover = new MessageEmbed()
      .setAuthor({name:`Movido com sucesso!`, iconURL:message.user.displayAvatarURL()}).setColor(process.env.COLOR)
      message.reply({embeds:[embedmover], ephemeral: true})
    }
  };
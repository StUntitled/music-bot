const {
  MessageEmbed,
} = require("discord.js");
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  autoplay,
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: "skip",
  category: "🎶 Music",
  aliases: ["voteskip", "s", "vs"],
  description: "🎵 - Skipa a música atual!",
  usage: "skip",
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": false,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //get the channel instance from the Member
    const {
      channel
    } = message.member.voice;
    //if the member is not in a channel, return
    if (!channel)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setAuthor({name:`Precisas de estar num canal de voz primeiro!`, iconURL:message.user.displayAvatarURL()})
        ]
      });
    //if no player available return aka not playing anything
    if (!player) {
      if (message.guild.me.voice.channel) {
        try {
          message.guild.me.voice.disconnect();
        } catch {}
        message.reply({
          embeds: [new MessageEmbed()
            .setAuthor({name:`Nenhuma música a a tocar`, iconURL:message.user.displayAvatarURL()})
            .setColor(process.env.COLOR)
          ]
        });
        return
      } else {
        return message.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setAuthor({name:`Não há nada a tocar agora`, iconURL: message.user.displayAvatarURL()})
          ]
        });
      }
      return
    }
    //if not in the same channel as the player, return Error
    if (channel.id !== player.voiceChannel)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setAuthor({name:`❌ Ocorreu um erro!`, iconURL: message.user.displayAvatarURL()})
          .setDescription(`Precisas de estar no mesmo canal de voz que eu para usar esse comando!`)
        ]
      });
    //if ther is nothing more to skip then stop music and leave the Channel
    if (player.queue.size == 0) {
      //if its on autoplay mode, then do autoplay before leaving...
      if (player.get("autoplay")) return autoplay(client, player, "skip");
      if (message.guild.me.voice.channel) {
        try {
          message.guild.me.voice.disconnect();
        } catch {}
        try {
          player.destroy();
        } catch {}
        message.reply({
          embeds: [new MessageEmbed()
            .setAuthor({name: `⏹️ A desconectar do canal de voz!`, iconURL: message.user.displayAvatarURL()})
            .setColor(process.env.COLOR)
          ]
        });
        return
      } else {
        //stop playing
        try {
          player.destroy();
        } catch {}
        message.reply({
          embeds: [new MessageEmbed()
            .setAuthor({name: `⏹️ A desconectar do canal de voz!`, iconURL: message.user.displayAvatarURL()})
            .setColor(process.env.COLOR)
          ]
        });
        //React with the emoji
        return
      }
      return
    }
    //skip the track
    player.stop();
    //send success message
    message.reply({
      embeds: [new MessageEmbed()
        .setAuthor({name: `⏭ Música atual skipada!`, iconURL: message.user.displayAvatarURL()})
        .setColor(process.env.COLOR)
      ]
    });

    return
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */

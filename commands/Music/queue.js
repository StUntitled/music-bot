const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  format,
  swap_pages2
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `queue`,
  category: `🎶 Music`,
  aliases: [`qu`, `que`, `queu`, `list`, `fila`],
  description: `Mostra a fila!`,
  usage: `queue`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //get the right tracks of the current tracks
    const tracks = player.queue;
    //if there are no other tracks, information
    if (!tracks.length)
      return message.reply({
        embeds: [new MessageEmbed()
          .setAuthor({name:`Fila para ${message.guild}`, iconURL: message.author.displayAvatarURL()})
          .setColor(process.env.COLOR)
          .addField(eval(client.la[ls]["cmds"]["music"]["queue"]["variablex_1"]), eval(client.la[ls]["cmds"]["music"]["queue"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["queue"]["variable2"]))
        ]
      }).then(msg => {
        setTimeout(() => {
          try {
            msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {}
        }, 50000)
      })
    //if not too big send queue in channel
    if (tracks.length < 15)
      return message.reply({
        embeds: [new MessageEmbed()
          .setAuthor({name:`Fila para ${message.guild}`, iconURL: message.author.displayAvatarURL()})
          .addField(`**\` 0. \` Música a tocar:**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})`: player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE` : format(player.queue.current.duration).split(` | `)[0]}\`\n*Pedido de: ${player.queue.current.requester.tag}*`)
          .setColor(process.env.COLOR).setDescription(tracks.map((track, index) => `**\` ${++index}. \`${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*Pedido de: ${track.requester.tag}*`).join(`\n`))
        ]
      }).then(msg => {
        setTimeout(() => {
          try {
            msg.delete().catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray));
          } catch {}
        }, 50000)
      })
    //get an array of quelist where 15 tracks is one index in the array
    let quelist = [];
    var maxTracks = 10; //tracks / Queue Page
    for (let i = 0; i < tracks.length; i += maxTracks) {
      let songs = tracks.slice(i, i + maxTracks);
      quelist.push(songs.map((track, index) => `**\` ${i + ++index}. \`${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\`\n*Pedido de: ${track.requester.tag}*`).join(`\n`))
    }
    let limit = quelist.length
    let embeds = []
    for (let i = 0; i < limit; i++) {
      let desc = String(quelist[i]).substr(0, 2048)
      await embeds.push(new MessageEmbed()
        .setAuthor({name:`Fila para ${message.guild}`, iconURL: message.author.displayAvatarURL()})
        .addField(`**\` N. \` *${player.queue.length > maxTracks ? player.queue.length - maxTracks : player.queue.length} outras músicas ...***`, `\u200b`)
        .setColor(process.env.COLOR)
        .addField(`**\` 0. \` Música a tocar:**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})`: player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE` : format(player.queue.current.duration).split(` | `)[0]}\`\n*Pedido de: ${player.queue.current.requester.tag}*`)
        .setDescription(desc));
    }
    //return susccess message
    return swap_pages2(client, message, embeds)
  }
};
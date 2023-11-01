const { MessageEmbed, MessageActionRow, MessageButton,  } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

module.exports = {
    name: `lyricssearch`,
    category: `🎶 Music`,
    aliases: [`lys`, `ls`, `ly`, `lyrics`, `letra`],
    description: `Mostra a letra de uma música!`,
    usage: `lyrics <song>`,
    parameters: {
      "type": "music",
      "activeplayer": false,
      "check_dj": false,
      "previoussong": false
    },
    type: "song",
    run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
        if (!args){message.channel.send(`Escreve o nome da música primeiro`)}

        let song = args.join(" ")
        let res = await lyricsFinder(song) || "Nenhuma letra encontrada"
        let embed = new MessageEmbed()
        embed.setAuthor({name:`Resultados para ${song}:`}).setDescription(res)
        let embedwait = new MessageEmbed()
        .setAuthor({name: `Vai às tuas DMs!`, iconURL: message.author.displayAvatarURL()})
        .setDescription(`**Nota**: tens de ter as DMs abertas se quiseres receber as lyrics!`)
        .setColor(process.env.COLOR)
        message.channel.send({embeds: [embedwait]}).then((msg) => {
            
                message.author.send({embeds: [embed]})
            
        })
    
      
},
}
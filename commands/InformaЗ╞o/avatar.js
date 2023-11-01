
const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    
    name: 'avatar',
    category: 'Informação',
    description: 'el jj ent xau',

    run: async(client, message, args) => {
        const avataru = message.mentions.users.first() || message.author
        const avataruname = message.mentions.users.first().username || message.author.username
        const embed = new Discord.MessageEmbed()
        .setAuthor({name: `Avatar de ${avataruname}!`, iconURL: message.author.displayAvatarURL()})
        .setImage(avataru.displayAvatarURL())

        try {
            message.channel.send({embeds: [embed]})


    } catch (e) { console.log(e); message.reply(e) }
    },

    conf:[],

    get help() {
        return {
          name: 'jjentxau',
          category: 'Diversão',
          description: 'el jj ent xau',
          usage: '!jjentxau',
          aliases: ["entxau", "jjxau"]
        }
      },
}
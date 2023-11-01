const Discord = require('discord.js')
module.exports = {
    name: 'kiss',
    description: 'Beije uma pessoa.',

    run: async (client, message, args) => {

        let user = message.mentions.users.first()

        var lista1 = [
            'https://i.pinimg.com/originals/b3/c7/a7/b3c7a7243bb0630b4c98ce53fd74d152.gif',
            'https://c.tenor.com/PKKCAakpBZIAAAAd/neyney-neymar.gif',
            'https://i.pinimg.com/originals/cf/5f/bf/cf5fbff2fa221b77782423b0aaa2d96e.gif',
            'http://www.whoateallthepies.tv/wp-content/uploads/2012/06/Ronaldo-gif.gif'
            
        ];

        var lista2 = [
            'https://c.tenor.com/2eWC-i5x54IAAAAM/neyney-neymar.gif',
            'https://c.tenor.com/ivbjDYV2AagAAAAC/lionel-messi-barca.gif',
            'https://c.tenor.com/uiBY2USqBM0AAAAM/kiss-cristiano-ronaldo.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        if (!user) {

            let embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setAuthor({name:`Comando de Kiss`, iconURL: message.author.displayAvatarURL({dynamic:true})})
            .addFields(
                {
                    name: `⁉ Como funciona?`,
                    value: `\`!kiss (usuario)\``,
                    inline: false
                },
                {
                    name: `🤓 Explicação:`,
                    value: `O bot irá fazer com que beijes alguma pessoa (digitalmente é claro)!`,
                    inline: false
                }
            )
            message.reply({embeds: [embed]})
                return;
        } else {


        const embed = new Discord.MessageEmbed()
            .setAuthor({name:`${message.author.tag} deu um beijo em ${user.tag}.`, iconURL: message.author.displayAvatarURL()})
            .setImage(`${random1}`)
            .setColor(process.env.COLOR)

        const button = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('1')
                    .setLabel('Retribuir 💋')
                    .setStyle('DANGER')
                    .setDisabled(false)

            )

        const embed1 = new Discord.MessageEmbed()
            .setAuthor({name:`${user.tag} retribuiu o beijo de ${message.author.tag}.`, iconURL: user.displayAvatarURL()})
            .setColor(process.env.COLOR)
            .setImage(`${random2}`)

        message.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })
    }
    }
}


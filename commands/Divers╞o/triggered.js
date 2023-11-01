const Discord = require('discord.js');

module.exports = {
    name: "filter",
    description: "Mostra-te a ter ganda trigger",
    run: async(client, message, args) => {
        if(!args) {
            message.channel.send({content: 'Tens que indicar um filtro!'})
            return;
        }
        let usera = message.mentions.users.first() || message.author
        let theme = args[0]
        let link = `https://some-random-api.ml/canvas/${theme}/?avatar=${usera.avatarURL({ format: 'png' })}`

        const attachment = new Discord.MessageAttachment(link, `${theme}.gif`);
        const embed = new Discord.MessageEmbed()
            .setAuthor({name: "My Talking Pepega", iconURL: message.author.displayAvatarURL()})
            .setImage(`attachment://${theme}.gif`)
            message.channel.send({embeds: [embed], files: [attachment]});
    }
}
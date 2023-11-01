const Discord = require('discord.js');

module.exports = {

        
        name: 'uptime',
        category: 'moderação',
        description: 'Mostra o tempo que o bot está online',
        usage: '!up',
        aliases: ["up"],
        
    run: async(client, message, args) => {
            try{
        let days = 0
        let week = 0
        let uptime = '';
        let totalSeconds = (client.uptime / 1000)
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        if (hours > 24) {
        days = days + 1
        hours = 0
                }
        if (week - 0) {
        uptime += `${week} week, `
                }
        if (minutes > 60) {
        minutes = 0;
                }
        uptime += `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos!`

        const embed = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setAuthor("Tempo Online:")
        .setDescription("`" + `${uptime}` + "`")
        .setTimestamp()
        .setFooter(process.env.FOOTER)
        
        message.channel.send(embed)
}catch (err) {
        message.channel.send('Ocorreu um erro:' +err)
        console.log(err)
    }
    },

    conf:[],

    get help() {
        return {
          name: 'uptime',
          category: 'moderação',
          description: 'Mostra o tempo que o bot está online',
          usage: '!up',
          aliases: ["up"]
        }
      },
}
const Discord = require('discord.js')

module.exports = {

    /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
     * Que passará os argumentos atraves do middleware que programamos.
    */
   
     name: 'rr',
     category: 'Útil',
     description: 'SURPRESA',
     usage: '!rr',
     aliases: ['rr'],
  
    run: async function(client, message, args) {
      try {
      const rick = "https://media.giphy.com/media/g7GKcSzwQfugw/giphy.gif"
      const embed = new Discord.MessageEmbed()
        .setDescription('Never gonna give you up \n Never gonna let you down')
        .setImage(rick)
        .setColor(process.env.COLOR)
        .setFooter({text:process.env.FOOTER})
        .setTimestamp()
      message.channel.send({embeds: [embed]})
      }catch (err) {
        message.channel.send('Ocorreu um erro:' +err)
        console.log(err)
    }
    },
  
    conf: {},
  
    /**
     * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
    */
  
    get help() {
      return {
        name: 'rr',
        category: 'Útil',
        description: 'SURPRESA',
        usage: '!rr',
        aliases: ['rr']
      }
    },
  }
  
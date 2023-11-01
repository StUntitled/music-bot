/**
 * O Comando "weather" mostrará a temperatura de determinada região.
*/

const Discord = require('discord.js')
const weather = require('weather-js')

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo arquivo message.js
    * Que passará os argumentos atraves do middleware.
        */
        name: 'weather',
        category: 'Diversão',
        description: 'Mostra a temperatura de determinada região.',
        usage: '!temp',
        aliases: ['tempo', "w"],

  run: function(client, message, args) {
    try {
    if (!args[0]) {
      return message.channel.send(new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setDescription('Especifique uma localidade.'))
    }

    weather.find({ search: args.join(' '), degreeType: 'C' }, function(error, result) {
      if (error) {
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setDescription('Não foi possível encontrar esse lugar! '))
      }

      if (result === undefined || result.length === 0) {
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setDescription('Local inválido!'))
      }

      const current = result[0].current
      const location = result[0].location

      const tempoinfo = new Discord.MessageEmbed()
        .setAuthor({name:`Previsão do tempo para ${current.observationpoint} ☁️`})
        .setThumbnail(current.imageUrl)
        .addField('⌚ Fuso horário', `UTC${location.timezone}`, true)
        .addField('📍 Tipo de grau', 'Celsius', true)
        .addField('🌡️ Temperatura', `${current.temperature}°`, true)
        .addField('🌪 Ventinho', current.winddisplay, true)
        .addField('☁️ Sensação', `${current.feelslike}°`, true)
        .addField('💧 Humidade', `${current.humidity}%`, true)
        .setColor(process.env.COLOR)
        .setFooter({text:process.env.FOOTER})
        .setTimestamp()
      message.channel.send({embeds:[tempoinfo]})
    })
  }catch (err) {
    message.channel.send('Ocorreu um erro:' +err)
    console.log(err)
}
  },

  conf: {},

  /**
   * Aqui exportamos informações do comando: nome, categoria, descrição e como utiizá-lo.
  */

  get help() {
    return {
      name: 'weather',
      category: 'Diversão',
      description: 'Mostra a temperatura de determinada região.',
      usage: '!temp',
      aliases: ['w']
    }
  },
}

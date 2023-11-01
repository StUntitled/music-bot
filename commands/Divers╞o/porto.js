const Discord = require('discord.js')
const axios = require('axios').default

const capivaraURL = `https://api.tenor.com/v1/random?&key=${process.env.TENOR_TOKEN}&q=fcporto&contentfilter=high&limit=1`

const titles = [
  `receba!`,
  `Aqui é luva di predeiru`,
  `PORTOO`,
  `OH CONCEIÇÃO FAZ O PORTO CAMPEÃO`
]

function randomTitle() {
  if (titles.length === 0) { return undefined }
  const index = Math.floor(Math.random() * titles.length)
  return titles[index]
}

module.exports = {
  
  name: 'porto',
  description: 'Oh meu porto de eterna mocidade',
  usage: '!porto',
  category: 'Diversão',
  aliases: ['fcp', 'fcporto', 'omelhor'],

  run: async (client, message, args) => {
    try {
      const user = message.member.user.tag
      const response = await axios.get(capivaraURL)
      const embed = new Discord.MessageEmbed()
        .setAuthor({name:randomTitle()})
        .setDescription(`Clica no gif para ver a animação
        Pedido por @${user}`)
        .setImage(response.data.results[0].media[0].gif.url)
        .setColor(process.env.COLOR)
        .setFooter({text:[process.env.FOOTER]})
        .setTimestamp()
      message.channel.send(embed)
    } catch (error) {
      const embed = new Discord.MessageEmbed()
        .setAuthor({name:'Infelizmente n tem nenhum gif disponivel'})
        .setColor(process.env.COLOR)
        .setFooter({text:[process.env.FOOTER]})
      message.reply(embed)
    }
  },

  conf: {},

  get help() {
    return {
      name: 'porto',
      description: 'Oh meu porto de eterna mocidade',
      usage: '!porto',
      category: 'Diversão',
      aliases: ['fcp', 'fcporto', 'omelhor'],
    }
  },
}
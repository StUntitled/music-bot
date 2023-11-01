const Discord = require('discord.js')
const axios = require('axios').default


const titles = [
  'ok',
  'sim',
  'na bouah',
]

function randomTitle() {
  if (titles.length === 0) { return undefined }
  const index = Math.floor(Math.random() * titles.length)
  return titles[index]
}

module.exports = {
  
  name: 'memesearch',
  description: 'Pesquisa memes!',
  usage: '!ms',
  category: 'Diversão',
  aliases: ['ms'],

  run: async (client, message, args) => {
    try{
    const msgc = message.content.slice(4);
    const msgct = msgc.charAt(0).toUpperCase() + msgc.slice(1);

    if (msgc == "porto") {
      capivaraURL = `https://api.tenor.com/v1/random?&key=${process.env.TENOR_TOKEN}&q=porto&contentfilter=high&limit=1`
    } else {
    capivaraURL = `https://api.tenor.com/v1/random?&key=${process.env.TENOR_TOKEN}&q=${msgc}&contentfilter=high&limit=1`
    }
    try {
      const response = await axios.get(capivaraURL)
      const embed = new Discord.MessageEmbed()
        .setAuthor({name: randomTitle()})
        .setDescription('Clica no gif para ver a animação')
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
  }catch (err) {
    message.channel.send('Ocorreu um erro:' +err)
    console.log(err)
}

  },

  conf: {},

  get help() {
    return {
      name: 'memesearch',
      description: 'Pesquisa memes!',
      usage: '!ms',
      category: 'Diversão',
      aliases: ['ms']
    }
  },
}

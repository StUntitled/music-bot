const Discord = require('discord.js')
const randomPuppy = require("random-puppy")

module.exports = {
  
  name: 'subReddit',
  description: 'Pesquisa imagens de subReddits!',
  usage: '!r',
  category: 'Diversão',
  aliases: ['r'],

  run: async (client, message, args) => {
        // In this array, 
        // you can put the subreddits you want to grab memes from
        const msgc = args.join(' ');
        const msgct = msgc.charAt(0).toUpperCase() + msgc.slice(1);
        if (msgc == "nsfw") {
          message.channel.send("Não tens permissão para isso!")
          return;
        }

        if (msgc.includes(" ")) {
          message.channel.send('O subReddit não pode conter espaço!')
          return
        }
        const subReddits = [msgc];
        // Grab a random property from the array
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        
        try {const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setAuthor(msgct)
            .setColor(process.env.COLOR)
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setTimestamp()
            .setFooter(process.env.FOOTER)

        message.channel.send(embed);
      } catch(err){
        console.log(err)
        message.channel.send("ocorreu um erro")
      }
      },

  conf: {},

  get help() {
    return {
      name: 'subReddit',
      description: 'Pesquisa imagens de subReddits!',
      usage: '!r',
      category: 'Diversão',
      aliases: ['r']
    }
  },
}
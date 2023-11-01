const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "fernandomendes",
  aliases: ["fernando", "summonfernando", "summonfernandomendes" ],

    run: async(client, message, args) => {
      try {

      message.channel.createWebhook('Fernando Mendes', {
          avatar: 'https://cdn1.newsplex.pt/fotos/2018/1/4/619591.jpg?type=Artigo',

      }).then(web => {
          web.send(`Espetáculo!`)
          .then(()=> {web.delete() })
      })


  } catch (e) { console.log(e); message.reply(`Estou sem a permissão de criar webhooks.`) }
  },

    conf:[],

    get help() {
        return {
          name: 'summoncristina',
          category: 'Diversão',
          description: 'invoca a poderosa Cristina Ferreira ',
          usage: '!scf',
          aliases: ["scf","summoncristina","cristina","cf","cristinaferreira"]
        }
      },
}
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "cristina",
  aliases: ["cristinaferreira","crstnafrrra", "cristinaf", "summoncristina", "summoncristinaferreira"],

    run: async(client, message, args) => {
      try {

      message.channel.createWebhook('Cristina Ferreira', {
          avatar: 'https://cdn.jornaldenegocios.pt/images/2020-07/img_1200x1200$2020_07_17_18_58_14_380221.jpg',

      }).then(web => {
          web.send(`ESTÁ CERTOOOOO`)
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
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {

  
  name: 'jj',
  category: 'Diversão',
  description: 'Jorginho Jesuinho',
  usage: '!jj',
  aliases: ["jj"],

    run: async(client, message, args) => {
        try{
        const video = ('https://cdn.discordapp.com/attachments/922255743590203396/959877410759802960/y2mate.com_-_Jorge_Jesus_Entao_Xau_Thug_Life_480p.mp4')
        message.channel.send({embeds: [video]});
        } catch(err){
          message.channel.send('ocorreu um erro : ' + err)
            console.log(err)
        }
    },

    conf:[],

    get help() {
        return {
          name: 'jj',
          category: 'Diversão',
          description: 'Jorginho Jesuinho',
          usage: '!jj',
          aliases: ["jj"]
        }
      },
}
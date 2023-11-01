const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  
  name: 'twyxz',
  category: 'Diversão',
  description: 'simplesmente Jota',
  usage: '!jota',
  aliases: ["twyxzz", "j", "jota"],
  
    run: async(client, message, args) => {
        
      let respostas = ["sim", "provavelmente sim", "provavelmente não", "não", "óbvio que não", "Não faço ideia", "Não me perguntes", "Pergunta isso pro dono da padaria", "Nunca nem vi"];
      let resposta = respostas[Math.floor(Math.random()*respostas.length)];
      let mensagem = 'Eae parça cê curte minha juliete?';
      try {

      message.channel.createWebhook('twyxz', {
          avatar: 'https://images-ext-2.discordapp.net/external/Ig_r-_xfnUWOwe-tQTI5XJQ5d1rn5qIShGHC5oAVxHg/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/553585566336286746/094c07dea75244181d0060f9aada9397.png?width=512&height=512',

      }).then(web => {
          web.send(`${message.author} ${mensagem}`)
          .then(()=> {web.delete() })
      })


  } catch (e) { console.log(e); message.reply(`Estou sem a permissão de criar webhooks.`) }
    },

    conf:[],

    get help() {
        return {
          name: 'twyxz',
          category: 'Diversão',
          description: 'simplesmente Jota',
          usage: '!jota',
          aliases: ["twyxzz", "j", "jota"]
        }
      },
}
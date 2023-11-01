const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    
    name: 'sergio',
    description: 'vieirinhaaaa',
    usage: '!sergioconceição',
    aliases: ["sc", "conceicao", "sergio"],

    run: async(client, message, args) => {
        
        if (!args[0]) return message.reply(`Escreva uma pergunta.`);
        let respostas = ["sim", "provavelmente sim", "provavelmente não", "não", "óbvio que não", "Não faço ideia", "Não me perguntes", "Pergunta ao Vieira, espera... não podes hahah", "Nunca nem vi"];
        let resposta = respostas[Math.floor(Math.random()*respostas.length)];

        try {

        message.channel.createWebhook('Sérgio Conceição', {
            avatar: 'https://cdn-images.rtp.pt/icm/noticias/images/47/47dc69b5ab1d2c7f40defce9385046d9?w=860&q=90&rect=0,0,4700,2577',

        }).then(web => {
            web.send(`${message.author} ${resposta}`)
            .then(()=> {web.delete() })
        })


    } catch (e) { console.log(e); message.reply(`Estou sem a permissão de criar webhooks.`) }
    },

    conf:[],

    get help() {
        return {
          name: 'sergio',
          category: 'Diversão',
          description: 'vieirinhaaaa',
          usage: '!sergioconceição',
          aliases: ["sc", "conceicao", "sergio"]
        }
      },
}
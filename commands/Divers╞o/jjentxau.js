
const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    
    name: 'jjentxau',
    category: 'Diversão',
    description: 'el jj ent xau',

    run: async(client, message, args) => {
        
        let respostas = ["sim", "provavelmente sim", "provavelmente não", "não", "óbvio que não", "Não faço ideia", "Não me perguntes", "Pergunta ao Vieira, espera... não podes hahah", "Nunca nem vi"];
        let resposta = "ENTÃO XAU";

        try {

        message.channel.createWebhook('Jorge Jesus', {
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2020-02-17_Encontro_com_T%C3%A9cnico_do_Flamengo%2C_Jorge_Jesus_%28cropped%29.jpg/640px-2020-02-17_Encontro_com_T%C3%A9cnico_do_Flamengo%2C_Jorge_Jesus_%28cropped%29.jpg',

        }).then(web => {
            web.send(`${message.author} ${resposta}`)
            .then(()=> {web.delete() })
        })


    } catch (e) { console.log(e); message.reply(`Estou sem a permissão de criar webhooks.`) }
    },

    conf:[],

    get help() {
        return {
          name: 'jjentxau',
          category: 'Diversão',
          description: 'el jj ent xau',
          usage: '!jjentxau',
          aliases: ["entxau", "jjxau"]
        }
      },
}
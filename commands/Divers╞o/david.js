
const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    
    name: 'david',
    category: 'Diversão',
    description: 'el jj ent xau',

    run: async(client, message, args) => {

        try {

        message.channel.createWebhook('{olivas}', {
            avatar: 'https://images-ext-2.discordapp.net/external/tKFCZPxqQK1ozrSTqmpUyMFLpluUucB4klidgL2qimc/https/cdn.discordapp.com/avatars/733338018517352449/78017ce7565838999af43d9a1b329f1b.webp?width=102&height=102',

        }).then(web => {
            web.send(`${message.author} oh mano cala-te`)
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
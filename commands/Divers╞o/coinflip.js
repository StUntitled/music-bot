const Discord = require('discord.js');

module.exports = {
    
    name: 'coinflip',
    category: 'Diversão',
    description: 'Cara ou coroa?',
    usage: '!coinflip',
    aliases: ['cf'],

    run: async(client, message, args) => {

        try{

        let lados = ['cara', 'coroa']
        let resposta = lados[Math.floor(Math.random() * lados.length)];
        if (!args[0] || args[0] !== 'cara' && args[0] !== 'coroa') {
            const embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setDescription('Escolha cara ou coroa')
            message.reply({embeds: [embed]})
        } else {
            const embedMoeda = new Discord.MessageEmbed().setColor(process.env.COLOR).setDescription(` **Jogando a moeda para o alto...**`)
            message.reply({embeds: [embedMoeda]}).then(msg => {

                setTimeout( () => {

            if (resposta === "cara") {

                if (args[0] === "cara") {
                const caraEmbed = new Discord.MessageEmbed().setColor(process.env.COLOR).setDescription(`**Cara!** Parabéns ${message.author}, você ganhou!`)
                msg.edit({embeds: [caraEmbed]})
                } else if (args[0] === "coroa") {
                    const embedCaraperdida = new Discord.MessageEmbed().setColor(process.env.COLOR).setDescription(`**Cara**! ${message.author} Eu ganhei desta vez!`)
                    msg.edit({embeds:[embedCaraperdida]})
                }

            } else if (resposta === "coroa") {

                    if (args[0] === "coroa") {
                        const embedCoroa = new Discord.MessageEmbed().setColor(process.env.COLOR).setDescription(`**Coroa**! Parabéns ${message.author}, você ganhou!`)
                        msg.edit({embeds: [embedCoroa]})
                        } else if (args[0] === "cara") {
                            const embedCoroaperdida = new Discord.MessageEmbed().setColor(process.env.COLOR).setDescription(`**Coroa**! ${message.author} Eu ganhei desta vez!`)
                            msg.edit({embeds: [embedCoroaperdida]})
                        }  
            }

        }, 2000)

        })

        }
        } catch (err) {
            message.channel.send('Ocorreu um erro:' +err)
            console.log(err)
        }

    },

    conf: [],


    
  get help() {
    return {
      name: 'coinflip',
      category: 'Diversão',
      description: 'Cara ou coroa?',
      usage: '!coinflip',
      aliases: ['cf']
    }
  },

}
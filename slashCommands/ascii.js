const figlet = require('figlet')
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');


module.exports = {
   name: 'ascii',
   category: 'Diversão',
   description: 'Converte uma palavra para o código ASCII.',
   options: [ 
         {"String": { name: "frase", description: "Diz qualquer coisa!", required: true }}, 
     ],

  run: function(client,interaction, message) {
    try {
        
    let args = [interaction.options.getString("frase")]
    const msg = args

    figlet.text(msg, function(err, data) {
      if (err) {
        console.log('Algo de errado aconteceu')
        console.dir(err)
      }
      if (data.length > 2000) return message.channel.send('**Envie um texto com menos de 2000 caracteres!**');

      interaction.reply('```' + data + '```')
    })
  } catch(err){
    interaction.reply('Ocorreu um erro: ' + err)
  }
  }
}

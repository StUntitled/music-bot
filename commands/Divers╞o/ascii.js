const figlet = require('figlet')

module.exports = {
   name: 'ascii',
   category: 'Diversão',
   description: 'Converte uma palavra para o código ASCII.',
   usage: '!ascii',
   aliases: ['a'],

  run: function(client, message, args) {
    try {
    if (!args[0]) return message.channel.send('> **Por favor coloque algum texto.**')

    const msg = args.join(' ')

    figlet.text(msg, function(err, data) {
      if (err) {
        console.log('Algo errado aconteceu')
        console.dir(err)
      }
      if (data.length > 2000) return message.channel.send('**Envie um texto com menos de 2000 caracteres!**')

      message.channel.send('```' + data + '```')
    })
  } catch(err){
    message.channel.send('Ocorreu um erro: ' + err)
  }
  }
}

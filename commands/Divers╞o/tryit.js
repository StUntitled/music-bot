/**
 * O Comando "tias" (Try it and see / Tente isso e veja) irá enviar um vídeo de auto ajuda para aqueles que estão com determinada dúvida.
*/

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */
   name: 'call',
   category: 'Útil',
   description: 'Irá enviar um video de auto ajuda para aqueles que estão com determinada dúvida.',
   usage: '!call',
   aliases: ['c'],

  run: async function(client, message, args) {
    try {
    message.channel.send('> 👀 Tente isso e veja 🤡 \n\n https://tryitands.ee/tias.mp4')
  }catch (err) {
    message.channel.send('Ocorreu um erro:' +err)
    console.log(err)
}
  },

  conf: {},

  /**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

  get help() {
    return {
      name: 'call',
      category: 'Útil',
      description: 'Irá enviar um video de auto ajuda para aqueles que estão com determinada dúvida.',
      usage: '!call',
      aliases: ['c']
    }
  },
}

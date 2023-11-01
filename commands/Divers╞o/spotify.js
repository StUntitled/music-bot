const { MessageEmbed } = require("discord.js")

module.exports = {
  
    name: 'spotify',
    category: 'Diversão',
    description: 'spotify',
    usage: '!spotify',
  
      run: async(client, message, args) => {
        try {
            message.channel.send({embeds: [new MessageEmbed().setAuthor({name: `Spotify`,iconURL: `https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png`}).setDescription("Confere o meu perfil do spotify [aqui](https://open.spotify.com/user/ms99f0id6kvi4obnftm7mb019?si=6c7f4ed1d3cb4d97)!")]})
        } catch (err) {
          message.channel.send('Ocorreu um erro: ' + err)
        }
  }
}
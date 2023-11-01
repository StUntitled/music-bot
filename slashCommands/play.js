const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
    module.exports = {
  name: `play`,
  description: `🎵 - Toca uma música do Youtube, Spotify, SoundCloud e Facebook!`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  }, 
  options: [ 
		{"String": { name: "nome-ou-link", description: "Escreve o nome/link da música que pretendes ouvir!", required: true }}, 
	],
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    
    try {

      let args = [interaction.options.getString("nome-ou-link")]
      if(!args[0]) args = [interaction.options.getString("nome-ou-link")]
      interaction.reply({content:`A procurar por: \`${args}\`...`})
      //play the SONG from YOUTUBE
      playermanager(client, message, args, `song:youtube`, interaction);
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
    }
  }
};
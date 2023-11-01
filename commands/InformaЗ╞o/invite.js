const { Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
   name: 'invite',
   category: 'Diversão',
   description: 'Converte uma palavra para o código ASCII.',
   usage: '!invite',
   aliases: ['convidar'],

  run: function(client, message, args) {
      const embed =  new MessageEmbed()
      .setAuthor({name:`Convida-me!`, iconURL:message.author.displayAvatarURL()})
      .setDescription(`Podes me convidar ao clicar o botão  abaixo!`);

      const row = new MessageActionRow().addComponents(
        new MessageButton().setStyle("LINK").setEmoji("🅿").setURL(`https://discord.com/oauth2/authorize?client_id=923347219694878781&scope=bot&permissions=8`)
      );

      message.channel.send({embeds: [embed], components: [row]})
  }
}

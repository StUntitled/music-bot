const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    run: async (client, interaction, args) => {
            let embed1 = new MessageEmbed()
            .setAuthor({name:`Pong`, iconURL: interaction.user.displayAvatarURL})
            .setDescription(`O meu ping é de \`${client.ws.ping}ms!\``)
        interaction.reply({embeds: [embed1], ephemeral:true})
    },
};
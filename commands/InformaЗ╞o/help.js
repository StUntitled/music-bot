const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const fs = require('fs')

module.exports = {

    name: "help",
    category: `🎶 Music`,
    description: `Vê a tua ajuda`,
    usage: `help`,
    aliases: [`h`],
    type: "bot",

    run: async(client, message, args) => {
        
    const emoji1 = client.emojis.cache.find(emoji => emoji.name === "501023980401065995");
    const emoji2 = client.emojis.cache.find(emoji => emoji.name === "501021050071416835");
    const emoji3 = client.emojis.cache.find(emoji => emoji.name === "916731355419770970");
    const emoji4 = client.emojis.cache.find(emoji => emoji.name === "501025617848827914");
    const emoji5 = client.emojis.cache.find(emoji => emoji.name === "501019529338552320");
            
        const categories = []

        fs.readdirSync('./commands/').forEach((dir) => {
            const commands = fs
            .readdirSync(`./commands/${dir}`)
            .filter(file => file.endsWith('.js'))
            .map(command => {
                const commandProps = require(`../../commands/${dir}/${command}`)
                return `\`${commandProps.name}\``
            })
            .filter(i => i !== undefined)

            if (commands.length > 0) categories.push(dir)
        })


        let embed_1 = new Discord.MessageEmbed()
        .setColor(process.env.COLOR)
        .setAuthor({name:`${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})
        .addFields(
            {name: `Categorias`, value: `\`Diversão\` ∷ ${emoji2}\n\`Informação\` ∷ ${emoji3}\n\`Música\` ∷ ${emoji4}\n`}
        )
        .setDescription(`**Olá ${message.author}, vê os meus comandos com o menu abaixo:**${emoji1}`)

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder('Vê os meus comandos.') // Mensagem estampada
        .addOptions([
               {
                    label: `Informação`,
                    description: 'Apenas o painel inicial da mensagem',
                    emoji: emoji1,
                    value: 'painel_inicial',
               },
                {
                    label: `Diversão`,
                    description: 'Vê os meus comandos de utilidade',
                    emoji: emoji3,
                    value: 'utilidade',
                },
                {
                    label: `Informação`,
                    description: 'Vê os meus comandos de diversão',
                    emoji: emoji4,
                    value: 'info',
                },
                {
                    label: `Música`,
                    description: 'Vê os meus comandos de música',
                    emoji: emoji5,
                    value: 'música',
                },
            ])

        );


        message.reply({embeds: [embed_1], components: [painel] }).then(msg => {

            const filtro = (interaction) => 
              interaction.isSelectMenu()
        
            const coletor = msg.createMessageComponentCollector({
              filtro
            });
        
            coletor.on('collect', async (collected) => {

              let valor = collected.values[0]
              collected.deferUpdate()

        if (valor === 'painel_inicial') {

             msg.edit({embeds: [embed_1], components: [painel] });
    
        };
        
        if (valor === 'utilidade') {

            let embed_2 = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setAuthor({name:client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Olá ${message.author}, vê meus comandos de \`Diversão\` abaixo:\n\`\`\` ascii\n coinflip\n deus\n estapear\n jj\n jjentxau\n kiss\n meme\n porto\n reddit\n rickroll\n sergio\n ship\n cristinaferreira\n twyxzz\n twyxzzsay\n vasco\n weather\`\`\`**`);

            msg.edit({embeds: [embed_2], components: [painel] });

        };

        if (valor === 'info') {

            let embed_3 = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setAuthor({name:client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Olá ${message.author}, vê meus comandos de \`Informação\` abaixo:\n\`\`\`invite\n help\`\`\`**`);

            msg.edit({embeds: [embed_3], components: [painel] });

        };

        if (valor === 'música') {

            let embed_4 = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setAuthor({name:client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true })})
            .setDescription(`**Olá ${message.author}, vê meus comandos de \`Música\` abaixo:\n\`\`\` play\n resume\n pause\n skip\n clearqueue\n moveme\n search\n seek\n stop\n volume\n nowplaying\n lyrics \`\`\`**`);

            msg.edit({embeds: [embed_4], components: [painel] });

        };
        
        
        })

    })

}
}
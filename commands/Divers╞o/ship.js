const Discord = require("discord.js")
const Canvas = require('canvas')

module.exports = {
    
    name: 'ship',
    category: 'Diversão',
    description: 'ship',
    run: async(client, message, args) => {

        try{

            let membro_1 = message.mentions.users.first() || message.author
            let membro_2 = message.mentions.users.last()
            let avatar_membro_1 = message.mentions.users.first() || message.author
            let avatar_membro_2 = message.mentions.users.last()

            let numeracao1 = Math.ceil(Math.random()*100);
            let numeracao = `${numeracao1}%`
            let emoji = "💘"

        
        try {

            

        if (!membro_1 || !membro_1 && !membro_2 || !args[0]) {
            

        let embed = new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setAuthor({name:`Comando de Ship`})
        .addFields(
            {
                name: `⁉ Como funciona?`,
                value: `\`!ship (usuario)\` ou \`!ship (usuario 1) (usuario 2)\``,
                inline: false
            },
            {
                name: `🤓 Explicação:`,
                value: `O bot shippará dois usuários escolhidos por ti.`,
                inline: false
            }
        )
            return message.reply(embed)
        }else {
        //create a new Canvas
        const canvas = Canvas.createCanvas(1200, 400);
        //make it "2D"
        const ctx = canvas.getContext('2d');
        
        var image = `images/heart.png`
        
        if (numeracao1 >= 80) {
        image = `images/heartfire.png`
        }


        if (numeracao1 <= 40) {
        image = `images/sus.png`
        } 

        if (numeracao1 <= 25){
        image = `images/sad.png`
        }

        const heart = await Canvas.loadImage(image);

        ctx.drawImage(heart, 400, 0, 400, 400);
        //define the user avatar
        const avatar = await Canvas.loadImage(membro_1.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatar, 0, 0, 400, 400);
        
        //define the user avatar
        const avatarautor = await Canvas.loadImage(membro_2.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatarautor, 800, 0, 400, 400);
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ship.png');
        

        if (membro_1 && !membro_2) {
            if (membro_1 === membro_2) ;

            let embed = new Discord.MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor({name:`${message.guild.name}`})
            .addFields(
                {
                    name: `😍 Membros shippados:`,
                    value: `${membro_1} + ${membro_2}`,
                    inline: false
                },
                {
                    name: emoji + `Porcentagem:`,
                    value: `\`${numeracao}\``,
                    inline: false
                },
            )

            message.reply(embed).then(msg=>{
                msg.react(emoji)

                let filtro = (e, r) => e.emoji.name === emoji && r.id === membro_1.id;
                let coletor = msg.createReactionCollector({filter: filtro});

                coletor.on('collect', () => {

             let embed = new Discord.MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor({name:`${message.guild.name}`})
            .addFields(
                {
                    name: `😍 Membros shippados:`,
                    value: `${membro_1} + ${membro_2}`,
                    inline: false
                },
                {
                    name: emoji + `Porcentagem:`,
                    value: `\`${numeracao}\``,
                    inline: false
                },
            )
            .setImage("attachment://ship.png")
                })

            })

        }

        else

        if (membro_1 && membro_2) {

            if (membro_2 === client.user || membro_1 === client.user) {

                let embed = new Discord.MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor({name:`${message.guild.name}`})
            .addFields(
                {
                    name: `😍 Membros shippados:`,
                    value: `${membro_1} + ${membro_2}`,
                    inline: false
                },
                {
                    name: emoji + `Porcentagem:`,
                    value: `\`${numeracao}\``,
                    inline: false
                },
            )
            .setImage("attachment://ship.png")

            message.reply({embeds:[embed], files:[attachment]}).then(msg=>{
                msg.react(emoji)
            })

            }

            else

            {

            let embed = new Discord.MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor({name:`${message.guild.name}`})
            .addFields(
                {
                    name: `😍 Membros shippados:`,
                    value: `${membro_1} + ${membro_2}`,
                    inline: false
                },
                {
                    name: emoji + `Porcentagem:`,
                    value: `\`${numeracao}\``,
                    inline: false
                }
            )
            .setImage("attachment://ship.png")

            message.reply({embeds:[embed], files:[attachment]}).then(msg=>{
                msg.react(emoji)

                let filtro = (e, r) => e.emoji.name === "💘" && r.id === membro_1.id;
                let coletor = msg.createReactionCollector(filtro);

                coletor.on('collect', () => {

             let embed = new Discord.MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor({name:`${message.guild.name}`})
            .addFields(
                {
                    name: `😍 Membros shippados:`,
                    value: `${membro_1} + ${membro_2}`,
                    inline: false
                },
                {
                    name: emoji + `Porcentagem:`,
                    value: `\`${numeracao}\``,
                    inline: false
                },
            )
            .setImage("attachment://ship.png")
                })

            })

        }

        }
    }

    } catch (err) {
        message.channel.send('ocorreu um erro. ' + err)
        console.log(err)
    }
        }catch(err) {
            message.channel.send('ocorreu um erro' + err)
            console.log(err)
        }
        
    },

    

    conf:[],

    get help() {
        return {
          name: 'ship',
          category: 'Diversão',
          description: 'ship',
          usage: '!ship',
          aliases: ["ship"]
        }
      },
}
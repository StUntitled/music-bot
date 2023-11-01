const Discord = require('discord.js');
const db = require('quick.db');
const Canvas = require('canvas');

module.exports = {

    
  name: 'sp',
  description: 'Estapeie uma pessoa.',

    run: async(client, message, args) => {
        try{
        const usuario = message.mentions.users.first() || message.author;
        const autor = message.author;

        //create a new Canvas
        const canvas = Canvas.createCanvas(1772, 1772);
        //make it "2D"
        const ctx = canvas.getContext('2d');
        //set the Background to the welcome.png
        const background = await Canvas.loadImage(`images/willslap.gif`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        //get the Guild Name
        var textString4 = `ESTAPEADO!`;
        ctx.font = 'Sans Bold Not-Rotated 140px';
        ctx.fillStyle = process.env.COLORI;
        ctx.textAlign = 'center';
        ctx.fillText(textString4, canvas.width / 2, canvas.height / 2 + 200);
        //define the user avatar

        const avatar = await Canvas.loadImage(usuario.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatar, 65, canvas.height / 2 - 750, 450, 450);
        
        //define the user avatar
        const avatarautor = await Canvas.loadImage(autor.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatarautor, 850, canvas.height / 2 - 670, 450, 450);
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setTimestamp()
          .setFooter({text: `Morreu`}, message.member.guild.iconURL({ dynamic: true }))
          .setDescription(`<@${autor.id}> deu um tapa em <@${usuario.id}>`)
          .setImage("attachment://welcome-image.png")
        //send the welcome embed to there
        message.channel.send({embeds: [welcomeembed], files: [attachment]});
        }catch (err) {
          message.channel.send('Ocorreu um erro:' +err)
          console.log(err)
      }
        
    },

    conf: {
      onlyguilds: true,
    },

    get help() {
        return {
          name: 'sp',
          category: 'Diversão',
          description: 'Estapeia alguém lol',
          usage: '!sp',
          aliases: ["sp", "sp"]
        }
      },
}
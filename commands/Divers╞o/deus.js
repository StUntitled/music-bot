const Discord = require('discord.js');
const db = require('quick.db');
const Canvas = require('canvas');

module.exports = {
  
  name: 'Deus',
  category: 'Diversão',
  description: 'Mostra god',
  usage: '!god',
  aliases: ["god", "deus", "manadeus"],

    run: async(client, message, args) => {
        try{
        const usuario = message.mentions.users.first() || message.author;
        const autor = message.author;
        //create a new Canvas
        const canvas = Canvas.createCanvas(301, 117);
        //make it "2D"
        const ctx = canvas.getContext('2d');
        //set the Background to the welcome.png
        const background = await Canvas.loadImage(`images/deus.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        //define the user avatar

        const avatar = await Canvas.loadImage(usuario.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatar, 0, 0, 71, 71)
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setDescription(`**GOD**<@${autor.id}> diz que tu és um GOD <@${usuario.id}>`)
          .setImage("attachment://welcome-image.png")
        message.channel.send({embeds: [welcomeembed], files: [attachment]});
        } catch (err) {
          message.channel.send('Ocorreu um erro:' +err)
          console.log(err)
      }
        
    },

    conf: {
      onlyguilds: true,
    },

    get help() {
        return {
          name: 'Deus',
          category: 'Diversão',
          description: 'Mostra god',
          usage: '!god',
          aliases: ["god", "deus", "manadeus"]
        }
      },
}
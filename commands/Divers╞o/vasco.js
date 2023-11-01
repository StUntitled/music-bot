const Discord = require('discord.js');
const db = require('quick.db');
const Canvas = require('canvas')
module.exports = {

  name: 'vasco',
  category: 'vasco',
  description: 'vasco',
  usage: '!vasco',
  aliases: ["vasco"],

    run: async(client, message, args) => {
        try {
        
        const usuario = message.mentions.users.first() || message.author;
        const autor = message.mentions.users.first() ||message.author;

        const canvas = Canvas.createCanvas(1772, 633);
        //make it "2D"
        const ctx = canvas.getContext('2d');
        //set the Background to the welcome.png
        const background = await Canvas.loadImage(`images/vasco.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        //set the first text string 
        var textString3 = `${autor.username}`;
        //if the text is too big then smaller the text
        if (textString3.length >= 12) {
          ctx.font = 'bold 80px Sans';
          ctx.fillStyle = '#f2f2f2';
          ctx.textAlign = "center";
          ctx.strokeText(textString3, canvas.width / 2 + 200, canvas.height / 2 + 70  )
          ctx.fillText(textString3, canvas.width / 2 + 200, canvas.height / 2 + 70  );
        }
        //else dont do it
        else {
          ctx.font = 'bold 140px Sans';
          ctx.fillStyle = '#f2f2f2';
          ctx.textAlign = "center";
          ctx.strokeText(textString3, canvas.width / 2 + 200, canvas.height / 2 + 70 )
          ctx.fillText(textString3, canvas.width / 2 + 200, canvas.height / 2 + 70 );
        }
        
        ctx.beginPath();
  
        // Start the arc to form a circle
        ctx.arc(490, 260, 195, 0, Math.PI * 2, true);
      
        // Put the pen down
        ctx.closePath();
      
        // Clip off the region you drew on
        ctx.clip();
        //define the user avatar
        const avatar = await Canvas.loadImage(autor.displayAvatarURL({ format: 'jpg' }));
        //draw the avatar
        ctx.drawImage(avatar, canvas.width / 3 - 300, canvas.height / 2 - 250, 400, 390);
        //get it as a discord attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        //define the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
          .setColor(process.env.COLOR)
          .setTimestamp()
          .setFooter({text:process.env.FOOTER})
          .setImage("attachment://welcome-image.png")
        //send the welcome embed to there
        message.channel.send({embeds: [welcomeembed], files: [attachment]});
      }catch (err) {
        message.channel.send('Ocorreu um erro:' +err)
        console.log(err)
    }
        
    },

    conf:[],

    get help() {
        return {
          name: 'vasco',
          category: 'vasco',
          description: 'vasco',
          usage: '!vasco',
          aliases: ["vasco"]
        }
      },
}
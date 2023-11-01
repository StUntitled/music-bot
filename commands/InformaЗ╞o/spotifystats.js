const canvacord = require("canvacord");
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {

  
    name: 'spotistats',
    category: 'Diversão',
    description: 'Jorginho Jesuinho',
    usage: '!spotistats',
    aliases: ["si"],

    run: async(client, message, args) => {
        try{         
            let user = message.mentions.members.first() || message.member ;

            let status;
            if (user.presence.activities.length === 1) status = user.presence.activities[0];
            else if (user.presence.activities.length > 1) status = user.presence.activities[1];

            if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
              return await message.channel.send({content: `${user.user.username} is not listening to spotify!`})
            }

            if (status !== null && status.name === 'Spotify' && status.assets !== null) {
            
              let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
              name = status.details,
              artist = status.state,
              album = status.assets.largeText;
              
              const card = new canvacord.Spotify()
              .setAuthor(status.state)
              .setAlbum(album)
              .setStartTimestamp(status.timestamps.start)
              .setEndTimestamp(status.timestamps.end)
              .setImage(image)
              .setTitle(status.details)
  
              const Card = await card.build();
              const attachment = new Discord.MessageAttachment( Card ,"spotify.png");
              message.channel.send({files: [attachment]});
            }
        
        } catch(err){
          message.channel.send({text: ['ocorreu um erro : ' + err]})
            console.log(err)
        }
    },
    

    conf:[],

    get help() {
        return {
          name: 'spotistats',
          category: 'Diversão',
          description: 'Jorginho Jesuinho',
          usage: '!spotistats',
          aliases: ["si"]
        }
      },
}
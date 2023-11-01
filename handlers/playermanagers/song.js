var {
  MessageEmbed
} = require("discord.js")
var ee = require(`${process.cwd()}/botconfig/embed.json`)
var config = require(`${process.cwd()}/botconfig/config.json`)
var {
  format,
  delay,
  arrayMove,
  isValidURL
} = require("../functions")

//function for playling song
async function song(client, message, args, type, slashCommand, extras) {
  let ls = client.settings.get(message.guild.id, "language")
  var search = args.join(" ");
  var res;
  var player = client.manager.players.get(message.guild.id);
  //if no node, connect it 
  if (player && player.node && !player.node.connected) await player.node.connect()
  //if no player create it
  if (!player) {
    if (!message.member.voice.channel) throw "NOT IN A VC"
    player = await client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    if (player && player.node && !player.node.connected) await player.node.connect()
    player.set("messageid", message.id);
  }
  let state = player.state;
  if (state !== "CONNECTED") {
    //set the variables
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    player.stop();
  }
  try {
    // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
    if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud") {
      if (isValidURL(search)) {
        res = await client.manager.search(search, message.author);
      } else {
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      }
    } else {
      res = await client.manager.search(search, message.author);
    }
    // Check the load type as this command is not that advanced for basics
    if (res.loadType === "LOAD_FAILED") throw res.exception;
    else if (res.loadType === "PLAYLIST_LOADED") {
      playlist_()
    } else {
      song_()
    }
  } catch (e) {
    console.log(e)
    if (slashCommand && slashCommand.isCommand())
      return slashCommand.reply({
        ephemeral: true,
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor({name:`Houve um erro ao pesquisar:`, iconURL: message.author.displayAvatarURL()})
          .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["song"]["variable2"]))
        ]
      });
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setAuthor({name:`Houve um erro ao pesquisar: ${search}`, iconURL: message.author.displayAvatarURL()})
        .setDescription(`\`\`\`${e}\`\`\``.substr(0, 2000))
      ]
    });
  }

  async function song_() {
    if (!res.tracks[0]) {
      if (slashCommand && slashCommand.isCommand())
        return slashCommand.reply({
          ephemeral: true,
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor({name:`Nenhum resultado para: ${search}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Tenta outra vez!`)
          ]
        })
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor({name:`Nenhum resultado para: ${search}`, iconURL: message.author.displayAvatarURL()})
          .setDescription(`Tenta outra vez!`)
        ]
      }).then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {})
        }, 3000)
      })
    }
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      //connect
      player.connect();
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    } else if (!player.queue || !player.queue.current) {
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    } else {
      //add the latest track
      player.queue.add(res.tracks[0]);
      //send track information
      var playembed = new MessageEmbed()
        .setAuthor({name:`Na fila!`})
        .setDescription(`A música \`${res.tracks[0].title}\` foi adiciona à fila!`)
        .setFooter({text:`Adicionada por: ${res.tracks[0].requester.tag}`, iconURL: res.tracks[0].requester.displayAvatarURL()})
        .setColor(process.env.COLOR)
      if (slashCommand && slashCommand.isCommand()) slashCommand.channel.send({
        ephemeral: true,
        embeds: [playembed]
      })
      else message.channel.send({
        embeds: [playembed]
      })
    }
    //Update the Music System Message - Embed
    client.updateMusicSystem(player);
  }
  //function ffor playist
  async function playlist_() {
    if (!res.tracks[0]) {
      if (slashCommand && slashCommand.isCommand())
        return slashCommand.channel.send({
          ephemeral: true,
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor({name:`Nenhum resultado para: ${search}`, iconURL: message.author.displayAvatarURL()})
            .setDescription(`Tenta outra vez!`)
          ]
        })
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor({name:`Nenhum resultado para: ${search}`, iconURL: message.author.displayAvatarURL()})
          .setDescription(`Tenta outra vez!`)
        ]
      }).then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {})
        }, 3000)
      })
    }
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      var firsttrack = res.tracks[0]
      //add track
      if (extras && extras === "songoftheday") {
        player.queue.add(res.tracks.slice(1, res.tracks.length - 1));
        player.queue.add(firsttrack);
      } else {
        player.queue.add(res.tracks);
      }
    } else if (!player.queue || !player.queue.current) {
      var firsttrack = res.tracks[0]
      //add track
      if (extras && extras === "songoftheday") {
        player.queue.add(res.tracks.slice(1, res.tracks.length - 1));
        player.queue.add(firsttrack);
      } else {
        player.queue.add(res.tracks);
      }
      //play track
      player.play();
      player.pause(false);
    } else {
      //add the tracks
      player.queue.add(res.tracks);
    }
    //send information
    var playlistembed = new MessageEmbed()
    .setAuthor({name:`Na fila!`})
    .setDescription(`A playlist \`${res.playlist.name}\` foi adicionada com ${res.tracks.length} músicas!`)
    .setFooter({text:`Adicionada por: ${message.author.tag}`, iconURL:message.author.displayAvatarURL()})
    .setColor(process.env.COLOR)
    .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
    if (slashCommand && slashCommand.isCommand()) {
      try {
        slashCommand.channel.send({
          ephemeral: true,
          embeds: [playlistembed]
        })
      } catch {
        message.channel.send({
          embeds: [playlistembed]
        })
      }
    } else message.channel.send({
      embeds: [playlistembed]
    })
    //Update the Music System Message - Embed
    client.updateMusicSystem(player);
  }

}

module.exports = song;

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */

var {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Permissions
} = require(`discord.js`),
  ms = require(`ms`),
  config = require(`${process.cwd()}/botconfig/config.json`),
  settings = require(`${process.cwd()}/botconfig/settings.json`),
  emoji = require(`${process.cwd()}/botconfig/emojis.json`),
  ee = require(`${process.cwd()}/botconfig/embed.json`), {
    TrackUtils
  } = require(`erela.js`), {
    createBar,
    format,
    check_if_dj,
    databasing,
    autoplay,
    delay
  } = require(`${process.cwd()}/handlers/functions`),
  playermanager = require(`${process.cwd()}/handlers/playermanager`),

  playercreated = new Map(),
  collector = false,
  mi,
  playerintervals = new Map(),
  playerintervals_autoresume = new Map();
module.exports = (client) => {
  /**
   * AUTO-RESUME-FUNCTION
   */
  const autoconnect = async () => {
    await delay(500);
    let guilds = client.autoresume.keyArray();
    if (!guilds || guilds.length == 0) return;
    for (const gId of guilds) {
      try {
        let guild = client.guilds.cache.get(gId);
        if (!guild) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Bot got Kicked out of the Guild`)
          continue;
        }
        var data = client.autoresume.get(gId);
        if(!data) continue;

        let voiceChannel = guild.channels.cache.get(data.voiceChannel);
        if (!voiceChannel) voiceChannel = await guild.channels.fetch(data.voiceChannel).catch(() => {}) || false;
        if (!voiceChannel || !voiceChannel.members || voiceChannel.members.filter(m => !m.user.bot && !m.voice.deaf && !m.voice.selfDeaf).size < 1) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Voice Channel is either Empty / no Listeners / got deleted`)
          continue;
        }

        let textChannel = guild.channels.cache.get(data.textChannel);
        if (!textChannel) textChannel = await guild.channels.fetch(data.textChannel).catch(() => {}) || false;
        if (!textChannel) {
          client.autoresume.delete(gId);
          client.logger(`Autoresume`.brightCyan + ` - Text Channel got deleted`)
          continue;
        }

        let player = await client.manager.create({
          guild: data.guild,
          voiceChannel: data.voiceChannel,
          textChannel: data.textChannel,
          selfDeafen: true,
        })
        player.set("autoresume", true);
        if (player && player.node && !player.node.connected) await player.node.connect();
        await player.connect();
        if (data.current && data.current.identifier) {
          const buildTrack = async (data) => {
            return data.track && data.identifier ? TrackUtils.build({
                track: data.track,
                info: {
                  title: data.title || null,
                  identifier: data.identifier,
                  author: data.author || null,
                  length: data.length || data.duration || null,
                  isSeekable: !!data.isStream,
                  isStream: !!data.isStream,
                  uri: data.uri || null,
                  thumbnail: data.thumbnail || null,
                }
              }, data.requester ? client.users.cache.get(data.requester) || await client.users.fetch(data.requester).catch(() => {}) || null : null) :
              TrackUtils.buildUnresolved({
                title: data.title || '',
                author: data.author || '',
                duration: data.duration || 0
              }, data.requester ? client.users.cache.get(data.requester) || await client.users.fetch(data.requester).catch(() => {}) || null : null)
          }
          player.queue.add(await buildTrack(data.current));
          player.set("playerauthor", data.current.requester);
          player.play();
          if (data.queue.length)
            for (let track of data.queue) player.queue.add(await buildTrack(track))
        } else if (data.queue && data.queue.length) {
          const track = await buildTrack(data.queue.shift());
          player.queue.add(track)
          player.play()
          if (data.queue.length)
            for (let track of data.queue) player.queue.add(await buildTrack(track))
        } else {
          player.destroy();
          client.logger(`Autoresume`.brightCyan + ` - Destroyed the player, because there are no tracks available`);
          continue;
        }
        client.logger(`Autoresume`.brightCyan + ` - Added ${player.queue.length} Tracks on the QUEUE and started playing ${player.queue.current.title} in ${guild.name}`);
        client.autoresume.delete(player.guild)
        client.logger("changed autoresume track to queue adjustments + deleted the database entry")
        if (data.playing) {
          setTimeout(() => {
            player.pause(true);
            setTimeout(() => player.pause(false), client.ws.ping * 2);
          }, client.ws.ping * 2)

        }
        await delay(settings["auto-resume-delay"] || 1000)
      } catch (e) {
        console.log(e)
      }
    }
  }
  /**
   * PLAYER / MANAGER EVENTS
   */
  let started = false;
  client.manager
    .on(`nodeConnect`, (node) => {
      if (!started) {
        started = true;
        setTimeout(() => autoconnect(), 2 * client.ws.ping)
      }
      setTimeout(() => {
        started = false;
      }, 5000)
    })
    .on(`playerCreate`, async (player) => {
      playercreated.set(player.guild, true)
      //for checking the relevant messages
      var interval = setInterval(async () => {
        if (client.musicsettings.get(player.guild, `channel`) && client.musicsettings.get(player.guild, `channel`).length > 5) {
          client.logger(`Music System - Relevant Checker - Checkingfor unrelevant Messages`)
          let messageId = client.musicsettings.get(player.guild, `message`);
          //try to get the guild
          let guild = client.guilds.cache.get(player.guild);
          if (!guild) return client.logger(`Music System - Relevant Checker - Guild not found!`)
          //try to get the channel
          let channel = guild.channels.cache.get(client.musicsettings.get(player.guild, `channel`));
          if (!channel) channel = await guild.channels.fetch(client.musicsettings.get(player.guild, `channel`)).catch(() => {}) || false
          if (!channel) return client.logger(`Music System - Relevant Checker - Channel not found!`)
          if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.MANAGE_MESSAGES)) return client.logger(`Music System - Relevant Checker - Missing Permissions`)
          //try to get the channel
          let messages = await channel.messages.fetch();
          if (messages.filter(m => m.id != messageId).size > 0) {
            channel.bulkDelete(messages.filter(m => m.id != messageId)).catch(() => {})
              .then(messages => client.logger(`Music System - Relevant Checker - Bulk deleted ${messages.size} messages`))
          } else {
            client.logger(`Music System - Relevant Checker - No Relevant Messages`)
          }
        }
      }, 60000);
      playerintervals.set(player.guild, interval);
      /**
       * AUTO-RESUME-DATABASING
       */
      var autoresumeinterval = setInterval(async () => {
        var pl = client.manager.players.get(player.guild);
        if (client.settings.get(pl.guild, `autoresume`)) {
          let filter = pl.get(`filter`)
          let filtervalue = pl.get(`filtervalue`)
          let autoplay = pl.get(`autoplay`)
          let eq = pl.get(`eq`)
          const makeTrack = track => {
            return {
              track: track.track,
              title: track.title || null,
              identifier: track.identifier,
              author: track.author || null,
              length: track.duration || null,
              isSeekable: !!track.isStream,
              isStream: !!track.isStream,
              uri: track.uri || null,
              thumbnail: track.thumbnail || null,
              requester: track.requester.id,
            }
          }
          client.autoresume.ensure(pl.guild, {
            guild: null,
            voiceChannel: null,
            textChannel: null,
            queue: null,
            current: null,
            volume: null,
            queueRepeat: null,
            trackRepeat: null,
            playing: null,
            position: null,
            eq: null,
            filter: null,
            filtervalue: null,
            autoplay: null,
          });
          var data = client.autoresume.get(pl.guild);
          if (data.guild != pl.guild) client.autoresume.set(pl.guild, pl.guild, `guild`)
          if (data.voiceChannel != pl.voiceChannel) client.autoresume.set(pl.guild, pl.voiceChannel, `voiceChannel`)
          if (data.textChannel != pl.textChannel) client.autoresume.set(pl.guild, pl.textChannel, `textChannel`)

          if (pl.queue && pl.queue.current && (!data.current || data.current.identifier != pl.queue.current.identifier)) client.autoresume.set(pl.guild, makeTrack(pl.queue.current), `current`)
          if (data.volume != pl.volume) client.autoresume.set(pl.guild, pl.volume, `volume`)
          if (data.queueRepeat != pl.queueRepeat) client.autoresume.set(pl.guild, pl.queueRepeat, `queueRepeat`)
          if (data.trackRepeat != pl.trackRepeat) client.autoresume.set(pl.guild, pl.trackRepeat, `trackRepeat`)
          if (data.playing != pl.playing) client.autoresume.set(pl.guild, pl.playing, `playing`)
          if (data.position != pl.position) client.autoresume.set(pl.guild, pl.position, `position`)
          if (data.autoplay != autoplay) client.autoresume.set(pl.guild, autoplay, `autoplay`)
          if (pl.queue && !arraysEqual(data.queue, [...pl.queue])) client.autoresume.set(pl.guild, [...pl.queue].map(track => makeTrack(track)), `queue`)

          function arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;

            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i]) return false;
            }
            return true;
          }
        }
      }, settings["auto-resume-save-cooldown"] || 5000);
      playerintervals_autoresume.set(player.guild, autoresumeinterval);
    })
    .on(`playerMove`, async (player, oldChannel, newChannel) => {
      if (!newChannel) {
        await player.destroy();
      } else {
        player.set('moved', true)
        player.setVoiceChannel(newChannel);
        if (player.paused) return;
        setTimeout(() => {
          player.pause(true);
          setTimeout(() => player.pause(false), client.ws.ping * 2);
        }, client.ws.ping * 2);
      }
    })
    .on(`playerDestroy`, async (player) => {
      //clear the interval for the music system
      clearInterval(playerintervals.get(player.guild))
      playerintervals.delete(player.guild);
      //clear the interval for the autoresume system
      clearInterval(playerintervals_autoresume.get(player.guild))
      if (client.autoresume.has(player.guild)) client.autoresume.delete(player.guild);
      playerintervals_autoresume.delete(player.guild);
      //if the song ends, edit message(s)
      if (player.textChannel && player.guild) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\nMúsica e fila finalizadas!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player, true);

      }

    })
    
    .on(`trackStart`, async (player, track) => {
      try {
        try {
          client.stats.inc(`global`, `songs`)
        } catch (e) {}
        let edited = false;
        let guild = client.guilds.cache.get(player.guild);
        if (!guild) return;
        const es = client.settings.get(guild.id, "embed")
        const ls = client.settings.get(guild.id, "language")
  
        let channel = guild.channels.cache.get(player.textChannel);
        if (!channel) channel = await guild.channels.fetch(player.textChannel);

        if (playercreated.has(player.guild)) {
          player.set(`eq`, player.get("eq") || `💣 None`);
          player.set(`filter`, player.get("eq") || `🧨 None`);
          player.set(`autoplay`, player.get("autoplay") || client.settings.get(player.guild, `defaultap`));
          player.set(`afk`, false)
          if (player.get("autoresume")) {
            player.set("autoresume", false)
          } else {
            await player.setVolume(client.settings.get(player.guild, `defaultvolume`))
            if (client.settings.get(player.guild, `defaulteq`)) {
              await player.setEQ(client.eqs.music);
            }
          }


          databasing(client, player.guild, player.get(`playerauthor`));
          playercreated.delete(player.guild); // delete the playercreated state from the thing
          client.logger(`Player criado em ${guild ? guild.name : player.guild} | Set the - Guild Default Data`);
          /*client.logger({
            Default_volume: client.settings.get(player.guild, `defaultvolume`),
            Default_Equalizer: client.settings.get(player.guild, `defaulteq`),
            Default_Autoplay: client.settings.get(player.guild, `defaultap`),
            Pruning_Song_Messages: client.settings.get(player.guild, `pruning`) 
          });*/
        }

        //Update the Music System Message - Embed
        client.updateMusicSystem(player);
        if (client.musicsettings.get(player.guild, `channel`) == player.textChannel) {
          return client.logger(`No PRUNING-Message sent, because Player-TextChannel == Music System Text Channel`)
        }
        if (player.textChannel && player.get(`previoustrack`)) {
          if (!collector.ended) {
            try {
              collector.stop();
            } catch (e) {
              //console.log(e.stack ? String(e.stack).grey : String(e).grey)
            }
          }
          //update the last Played Song Message
          client.editLastPruningMessage(player, `\nMúsica finalizada!`)
        }
        //votes for skip --> 0
        player.set(`votes`, `0`);
        //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh
        for (var userid of guild.members.cache.map(member => member.user.id))
          player.set(`vote-${userid}`, false);
        //set the previous track just have it is used for the autoplay function!
        player.set(`previoustrack`, track);
        //if that's disabled return
        if (!client.settings.get(player.guild, `pruning`)) {
          return client.logger(`Pruning Disabled - Not Sending a Message`);
        }
        // playANewTrack(client,player,track);
        let playdata = generateQueueEmbed(client, player, track)
        let playdatarow = generateQueueRow(client, player, track)
        //Send message with buttons
        if (channel && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
          let swapmsg = await channel.send({embeds :[playdata], components: [playdatarow]}).then(msg => {
            player.set(`currentmsg`, msg.id);
            return msg;
          })
          //create a collector for the thinggy
          var defaulttime = 1 * 60 * 60 * 1000; //set a default time (1 hour in this case)
          collector = swapmsg.createMessageComponentCollector({
            filter: (i) => i.isButton() && i.user && i.message.author.id == client.user.id,
            time: track.duration > 0 ? track.duration < Number.MAX_VALUE ? track.duration : defaulttime : defaulttime
          }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          collector.on('collect', async i => {
            let {
              member
            } = i;
            const {
              channel
            } = member.voice
            const player = client.manager.players.get(i.guild.id);
            if (!player)
              return i.reply({
                content: `Nada a tocar agora`,
                ephemeral: true
              })

            if (!channel)
              return i.reply({
                content: `❌ **Precisas de estar num canal de voz!**`,
                ephemeral: true
              })
            if (channel.id !== player.voiceChannel)
              return i.reply({
                content: `❌ **Precisas de estar no meu canal de voz! <#${player.voiceChannel}>**`,
                ephemeral: true
              })

            if (i.customId != `10` && check_if_dj(client, i.member, player.queue.current)) {
              return i.reply({
                embeds: [new MessageEmbed()
                  .setColor(es.wrongcolor)
                  .setFooter(client.getFooter(es))
                  .setTitle(`❌ **Não és um DJ nem o utilizador que pediu a música!**`)
                  .setDescription(`**DJ-ROLES:**\n${check_if_dj(client, i.member, player.queue.current)}`)
                ],
                ephemeral: true
              });
            }


            //skip
            if (i.customId == `1`) {
              //if ther is nothing more to skip then stop music and leave the Channel
              if (player.queue.size == 0) {
                //if its on autoplay mode, then do autoplay before leaving...
                if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
                edited = true;
                player.destroy()
                return
              }
              //skip the track
              player.stop();
            }



            //stop
            if (i.customId == `2`) {
              //Stop the player
                let embed = generateStopEmbed(client, player, track);
                let footer = generateRequesterTag(client, player, track)
                embed.setFooter({text:`${footer}\nFila finalizada por: ${i.user.tag}`, iconURL:track.requester.displayAvatarURL()})
                i.update({embeds:[embed], components: []})
              edited = true;
              player.destroy()
            }



            //pause/resume
            if (i.customId == `3`) {
                //pause the player
              if (!player.playing) {
                player.pause(false);
                let embed = generateResumeEmbed(client, player, track);
                let footer = generateRequesterTag(client, player, track)
                embed.setFooter({text:`${footer}\nResumido por: ${i.user.tag}`, iconURL:track.requester.displayAvatarURL()})
                let row = generateQueueRow(client, player, track);
                i.update({embeds:[embed], components: [row]})
              } else {
                player.pause(true);
                let embed = generatePauseEmbed(client, player, track);
                let footer = generateRequesterTag(client, player, track)
                embed.setFooter({text:`${footer}\nPausado por: ${i.user.tag}`, iconURL:track.requester.displayAvatarURL()})
                let row = generateQueueRow(client, player, track);
                i.update({embeds:[embed], components: [row]})
              }
              var data = generateQueueEmbed(client, player, track)
              swapmsg.edit(data).catch((e) => {
                //console.log(e.stack ? String(e.stack).grey : String(e).grey)
              })
            }
          });
        }

      } catch (e) {
        console.log(String(e.stack).grey.yellow) /* */
      }
    })
    .on(`trackStuck`, async (player, track, payload) => {
      await player.stop();
      if (player.textChannel) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\n⚠️⚠️⚠️ MÚSICA PRESA OCORREU UM ERRO ⚠️⚠️!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player);

      }
    })
    .on(`trackError`, async (player, track, payload) => {
      await player.stop();
      if (player.textChannel) {
        //update the last Played Song Message
        client.editLastPruningMessage(player, `\n⚠️⚠️⚠️ MÚSICA CRASHOU OCORREU UM EROO⚠️⚠️!`)
        //Update the Music System Message - Embed
        client.updateMusicSystem(player);
      }
    })
    .on(`queueEnd`, async (player) => {
      //en-sure the database data
      databasing(client, player.guild, player.get(`playerauthor`));
      //if autoplay is enabled, then continue with the autoplay function
      if (player.get(`autoplay`)) return autoplay(client, player);
      try {
        //update the player
        player = client.manager.players.get(player.guild);

        if (!player.queue || !player.queue.current) {
          //Update the Music System Message - Embed
          client.updateMusicSystem(player, true);

          //if afk is enbaled return and not destroy the PLAYER
          if (player.get(`afk`)) {
            return client.logger(`Fila ficou fazia em ${client.guilds.cache.get(player.guild) ? client.guilds.cache.get(player.guild).name : player.guild}, sem quitar, porque AFK está ativado!`)
          }
          if (settings.LeaveOnEmpty_Queue.enabled && player) {
            setTimeout(async () => {
              try {
                let pl = client.manager.players.get(player.guild);
                if (!pl.queue || !pl.queue.current) {
                  await pl.destroy();
                  return client.logger(`Fila destruída porque não havia mais músicas!`)
                }
              } catch (e) {
                console.log(e)
              }
            }, settings.LeaveOnEmpty_Queue.time_delay)
          }
        }
      } catch (e) {
        console.log(String(e.stack).grey.yellow);
      }
    });

};


function generateQueueEmbed(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(process.env.COLOR)
  embed.setAuthor(client.getAuthor(`A tocar 🎵`, track.requester.displayAvatarURL()))
  embed.setDescription(`[${track.title}](${track.uri})`)
  embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  embed.setFooter({text:`Pedido de: ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL()});
  let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setLabel(`Parar`)
  let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setLabel(`Pausar`)
  let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setLabel(`Skipar`)
  if (!player.playing) {
    pause = pause.setStyle('SUCCESS').setEmoji(`<:playbuttonarrowhead:1167596011166908456>`)
  }
  const row = new MessageActionRow().addComponents([stop, pause, skip]);
  return embed
}

function getCurrentTrackTitle(client, player, track) {
  return track.title
}

function generateQueueRow(client, player, track) {
  let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("<:pauseplaysquarestopicon132018567:1167598361688424508>")
  let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji(`<:568359:1167596587653025902>`)
  let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji(`<:Skip_Track:1167595772758458459>`)
  if (!player.playing) {
    pause = pause.setStyle('SUCCESS').setEmoji(`<:playbuttonarrowhead:1167596011166908456>`)
  }
  const row = new MessageActionRow().addComponents([stop, pause, skip]);
  return row
}
function generateRequesterTag(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(process.env.COLOR)
  embed.setFooter({text:`Pedido de: ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL()});
  return `Pedido de: ${track.requester.tag}`;

}

function generatePauseEmbed(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(process.env.COLOR)
  embed.setAuthor(client.getAuthor(`Música em pausa 🎵`, track.requester.displayAvatarURL()))
  embed.setDescription(`[${track.title}](${track.uri})`)
  embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  embed.setFooter({text:`Pedido de: ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL()});
  let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("<:pauseplaysquarestopicon132018567:1167598361688424508>")
  let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setEmoji(`<:568359:1167596587653025902>`)
  let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setEmoji(`<:Skip_Track:1167595772758458459>`)
  if (!player.playing) {
    pause = pause.setStyle('SUCCESS').setEmoji(`<:playbuttonarrowhead:1167596011166908456>`)
  }
  const row = new MessageActionRow().addComponents([stop, pause, skip]);
  return embed
}
function generateStopEmbed(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(process.env.COLOR)
  embed.setAuthor({name:`Música e fila finalizadas! 🎵`})
  embed.setDescription(`[${track.title}](${track.uri})`)
  embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  return embed
}

function generateResumeEmbed(client, player, track) {
  const es = player.guild ? client.settings.get(player.guild, "embed") : ee;
  var embed = new MessageEmbed().setColor(process.env.COLOR)
  embed.setAuthor(client.getAuthor(`Música resumida 🎵`, track.requester.displayAvatarURL()))
  embed.setDescription(`[${track.title}](${track.uri})`)
  embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  embed.setFooter({text:`Pedido de: ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL()});
  let stop = new MessageButton().setStyle('DANGER').setCustomId('2').setLabel(`Parar`)
  let pause = new MessageButton().setStyle('SECONDARY').setCustomId('3').setLabel(`Pausar`)
  let skip = new MessageButton().setStyle('PRIMARY').setCustomId('1').setLabel(`Skipar`)
  if (!player.playing) {
    pause = pause.setStyle('SUCCESS').setEmoji(`<:playbuttonarrowhead:1167596011166908456>`)
  }
  const row = new MessageActionRow().addComponents([stop, pause, skip]);
  return embed
}

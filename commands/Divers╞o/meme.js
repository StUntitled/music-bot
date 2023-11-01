const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')
const randomPuppy = require("random-puppy")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    
  name: 'meme',
  description: 'Mostra memes :)',
  usage: '!meme',
  category: 'Diversão',
  aliases: ['meme'],

  run: async (client, message, args) => {
    try {
      let choice
  
      const buttonRow = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("regenMemeBtn").setStyle("SECONDARY").setEmoji("🔁")
      );
      const embed = await getRandomEmbed(choice);
  
      const sentMsg = await message.reply({
        embeds: [embed],
        components: [buttonRow],
      });
  
      const collector = message.channel.createMessageComponentCollector({
        filter: (reactor) => reactor.user.id === message.author.id,
        time: 10000,
        max: 3,
        dispose: true,
      });
  
      collector.on("collect", async (response) => {
        if (response.customId !== "regenMemeBtn") return;
        await response.deferUpdate();
  
        const embed = await getRandomEmbed(choice);
        await sentMsg.edit({
          embeds: [embed],
          components: [buttonRow],
        });
      });
  
      collector.on("end", () => {
        buttonRow.components.forEach((button) => button.setDisabled(true));
        return sentMsg.edit({
          components: [buttonRow],
        });
      });
    }catch (err) {
      message.channel.send('Ocorreu um erro:' +err)
      console.log(err)
  }

async function getRandomEmbed(choice) {
  const subReddits = ["meme", "Memes_Of_The_Dank", "memes", "dankmemes"];
  let rand = choice ? choice : subReddits[getRandomInt(subReddits.length)];

  const response = await getJson(`https://www.reddit.com/r/${rand}/random/.json`);
  if (!response.success) {
    return new MessageEmbed().setColor(process.env.COLOR).setDescription("Erro ao carregar o meme, tenta outra vez!");
  }

  const json = response.data;
  if (!Array.isArray(json) || json.length === 0) {
    return new MessageEmbed().setColor(process.env.COLOR).setDescription(`Sem memes em ${choice}`);
  }

  try {
    let permalink = json[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = json[0].data.children[0].data.url;
    let memeTitle = json[0].data.children[0].data.title;
    let memeUpvotes = json[0].data.children[0].data.ups;
    let memeNumComments = json[0].data.children[0].data.num_comments;

    return new MessageEmbed()
      .setAuthor({ name: memeTitle, url: memeUrl, iconURL: message.author.displayAvatarURL() })
      .setImage(memeImage)
      .setColor(process.env.COLOR)
      .setFooter({ text: `👍 ${memeUpvotes} | 💬 ${memeNumComments}` });
  } catch (error) {
    return new MessageEmbed().setColor(process.env.COLOR).setDescription("Erro ao carregar imagem, tenta outra vez!");
  }
}

/**
 * Returns a random number below a max
 * @param {Number} max
 */
 function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Returns JSON response from url
 * @param {string} url
 */
async function getJson(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return {
      success: response.status === 200 ? true : false,
      status: response.status,
      data: json,
    };
  } catch (ex) {
    console.log(ex)
  }
}

  }
}
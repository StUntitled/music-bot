const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')
const randomPuppy = require("random-puppy")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    
  name: 'meme',
  description: 'Mostra memes :)',
  category: 'Diversão',
  options: [ 
    {"String": { name: "category", description: "Escreve uma categoria!", required: false }}, 
],

  run: async (client, interaction, message, args) => {

    const choice = interaction.options.getString("category");

    const buttonRow = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("regenMemeBtn").setStyle("SECONDARY").setEmoji("🔁")
    );
    const embed = await getRandomEmbed(choice);

    await interaction.reply({
      embeds: [embed],
      components: [buttonRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (reactor) => reactor.user.id === interaction.user.id,
      time: 10000,
      max: 2,
      dispose: true,
    });

    collector.on("collect", async (response) => {
      if (response.customId !== "regenMemeBtn") return;
      await response.deferUpdate();

      const embed = await getRandomEmbed(choice);
      await interaction.editReply({
        embeds: [embed],
        components: [buttonRow],
      });
    });

    collector.on("end", () => {
      buttonRow.components.forEach((button) => button.setDisabled(true));
      return interaction.editReply({
        components: [buttonRow],
      });
    });

    async function getRandomEmbed(choice) {
        const subReddits = ["meme", "Memes_Of_The_Dank", "memes", "dankmemes"];
        let rand = choice ? choice : subReddits[getRandomInt(subReddits.length)];
      
        const response = await getJson(`https://www.reddit.com/r/${rand}/random/.json`);
        if (!response.success) {
          return new MessageEmbed().setColor(EMBED_COLORS.ERROR).setDescription("Failed to fetch meme. Try again!");
        }
      
        const json = response.data;
        if (!Array.isArray(json) || json.length === 0) {
          return new MessageEmbed().setColor(EMBED_COLORS.ERROR).setDescription(`No meme found matching ${choice}`);
        }
      
        try {
          let permalink = json[0].data.children[0].data.permalink;
          let memeUrl = `https://reddit.com${permalink}`;
          let memeImage = json[0].data.children[0].data.url;
          let memeTitle = json[0].data.children[0].data.title;
          let memeUpvotes = json[0].data.children[0].data.ups;
          let memeNumComments = json[0].data.children[0].data.num_comments;
      
          return new MessageEmbed()
            .setAuthor({ name: memeTitle, url: memeUrl })
            .setImage(memeImage)
            .setColor("RANDOM")
            .setFooter({ text: `👍 ${memeUpvotes} | 💬 ${memeNumComments}` });
        } catch (error) {
          return new MessageEmbed().setColor(EMBED_COLORS.ERROR).setDescription("Failed to fetch meme. Try again!");
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
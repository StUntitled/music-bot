const google = require('images-scraper');

module.exports = {
   name: 'googleimages',
   category: 'Diversão',
   description: 'Converte uma palavra para o código ASCII.',
   usage: '!googleimages',
   aliases: ['gi'],

  run: async function(client, message, args) {
    try {
        const query = args;

        const image = new google({
            puppeteer: {
                headless: true,
            },
        });

        const results = await image.scrape(query, 4);

        const mainEmbed = new Discord.MessageEmbed().setURL('https://youtube.com').setImage(results[0].url);
        const secondEmbed = new Discord.MessageEmbed().setURL('https://youtube.com').setImage(results[1].url);
        const thirdEmbed = new Discord.MessageEmbed().setURL('https://youtube.com').setImage(results[2].url);
        const fourthEmbed = new Discord.MessageEmbed().setURL('https://youtube.com').setImage(results[3].url);

        message.reply({embeds:[mainEmbed, secondEmbed, thirdEmbed, fourthEmbed]});
  } catch(err){
    message.channel.send('Ocorreu um erro: ' + err)
  }
  }
}

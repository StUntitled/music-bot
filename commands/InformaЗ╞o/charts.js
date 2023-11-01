const Discord = require('discord.js')
const { getChart } = require('billboard-top-100');
const timestamp = require('unix-timestamp');
const { time } = require('@discordjs/builders');

module.exports = {

    /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
     * Que passará os argumentos atraves do middleware que programamos.
    */
   
     name: 'charts',
     category: 'Útil',
     description: 'SURPRESA',
     usage: '!charts',
     aliases: ['charts', 'topsongs', 'top', 'ts'],
  
    run: async function(client, message, args) {
      try {
     

        function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp);
            var year = a.getFullYear();
            var month = a.getMonth() + 1 ;
            var date = a.getDate();
            var time = year.toString() + '-' + month.toString() + '-' + date.toString();
            return time;
          }
    
          let time = message.createdTimestamp
          let date = timeConverter(time);

    // date format YYYY-MM-DD
    getChart('hot-100', `${date.toString()}`, (err, chart) => {
      if (err) console.log(err);
      // week of the chart in the date format YYYY-MM-DD
 //    console.log(chart.week);
      // URL of the previous week's chart
      //console.log(chart.previousWeek.url);
      // date of the previous week's chart in the date format YYYY-MM-DD
      //console.log(chart.previousWeek.date);
      /// URL of the next week's chart
      //console.log(chart.nextWeek.url);
      // date of the next week's chart in the date format YYYY-MM-DD
    //console.log(chart.nextWeek.date);
      // array of top 100 songs for week of August 27, 2016
      //console.log(chart.songs);
      // song with rank: 4 for week of August 27, 2016
      //console.log(chart.songs[3]);
      // title of top song for week of August 27, 2016
      //console.log(chart.songs[0, 99].title);
      // artist of top songs for week of August 27, 2016
      //console.log(chart.songs[0].artist);
      // rank of top song (1) for week of August 27, 2016
      //console.log(chart.songs[0].rank);
      // URL for Billboard cover image of top song for week of August 27, 2016
      //console.log(chart.songs[0].cover);
      // position info of top song
      //console.log(chart.songs[0].position.positionLastWeek);
      //console.log(chart.songs[0].position.peakPosition);
      //console.log(chart.songs[0].position.weeksOnChart);
        /* 
      let embed= new Discord.MessageEmbed()
      .setDescription({content: []}) */
      let embed = new Discord.MessageEmbed()
      .setTitle('Billboard hot-10 of this week!')
      .setThumbnail(chart.songs[0].cover)
      .setColor(process.env.COLOR)
      .setTimestamp()

    let counter = 0;
    while (counter <= 9) {
    //message.channel.send(chart.songs[parseInt(counter)].title)
   // console.log(counter);
    embed
    .addFields(
		{ name: `${chart.songs[parseInt(counter)].rank} - ${chart.songs[parseInt(counter)].title}`, value: `${chart.songs[parseInt(counter)].artist}`},
	)
    counter = counter + 1;
    } 

    message.channel.send({embeds: [embed]})
    
    });

      }catch (err) {
        message.channel.send('Ocorreu um erro:' +err)
        console.log(err)
    }
    },
  
    conf: {},
  
    /**
     * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
    */
  
    get help() {
      return {
        name: 'charts',
        category: 'Útil',
        description: 'SURPRESA',
        usage: '!charts',
        aliases: ['charts', 'topsongs', 'top', 'ts']
      }
    },
  }
  

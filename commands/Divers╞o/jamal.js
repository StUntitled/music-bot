module.exports = {
    name: 'jamal',
    category: 'Diversão',
    description: 'Jamal',
    usage: '!jamal',
 
   run: function(client, message, args) {
     try {
        message.channel.createWebhook('Jamal', {
            avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/8fb158e2341660503d012c86543ac444~c5_720x720.jpeg?x-expires=1667001600&x-signature=QU%2Fn9jBQBMm6ty2oO95l3RjJWpU%3D',

        }).then(web => {
            web.send(`${message.author} Oh mano cala-te.`)
            .then(()=> {web.delete() })
        })
   } catch(err){
     message.channel.send('Ocorreu um erro: ' + err)
   }
   }
 }
 
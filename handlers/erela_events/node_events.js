let started = false;
module.exports = (client) => {
  client.manager
    .on("nodeConnect", (node) => {
      if (!started) {
        started = true;
        client.logger(`Node conectado :: ${String(node.options.identifier).brightBlue}`)
      }
      setTimeout(() => {
        started = false;
      }, 2000)
    })
    .on("nodeCreate", (node) => {
      client.logger(`Node criado :: ${String(node.options.identifier).brightBlue}`)
    })
    .on("nodeReconnect", (node) => {
      client.logger(`Node a reconectar... :: ${String(node.options.identifier).brightBlue}`)
    })
    .on("nodeDisconnect", (node) => {
      client.logger(`Node disconectado :: ${String(node.options.identifier).brightBlue}`)
      setTimeout(() => {
        node.connect();
      }, 1000);
    })
    .on("nodeError", (node, error) => {
      client.logger(`Erro no node :: ${String(node.options.identifier).brightBlue}`)
      setTimeout(() => {
        node.connect();
      }, 1000);
    })

};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */

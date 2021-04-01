const request = require("request");

var mcIP = "45.43.13.210";
var mcPort = 25674;

const getMinecraftServerStatus = (msg) => {
  var url = "http://api.mcsrvstat.us/2/" + mcIP;
  request(url, function (err, response, body) {
    if (err) {
      console.log(err);
      return msg.reply("Error getting Minecraft server status...");
    }
    body = JSON.parse(body);
    var status = "*Minecraft server is currently offline*";
    if (body.online) {
      status = "Server is Online!\n";
      status += "IP: " + body.ip + "\n";
      status += "Port: " + body.port + "\n";
      status += "Connect IP: " + body.ip + ":" + body.port + "\n";
      status += "MOTD: " + body.motd.clean + "\n";
      if (body.players.online > 0) {
        status +=
          body.players.online +
          "/" +
          body.players.max +
          " people are playing! \nPlayers online: " +
          body.players.list;
      } else {
        status += "Nobody is playing!";
      }
    }
    msg.reply(status);
  });
};

module.exports = { getMinecraftServerStatus };

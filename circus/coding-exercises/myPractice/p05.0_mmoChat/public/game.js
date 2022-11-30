// mmoChat game.js

console.log("I am working");

let socket = io();

socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        // create an asset for the main player
        addPlayer(self, players[id]);
      } else {
        // otherwise, create an other player
        addOtherPlayers(self, players[id]);
      }
    });
});
socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
    console.log("A new player has joined");
  });
  socket.on('disconnect', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
        console.log("A player has left the game");
      }
    });
  });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

players = {};
inactivePlayers = [];

let numOfInactivePlayers = 5;

function randomPosition() {
  let random = parseInt( (50 + Math.random()*200) );
  // let random = parseInt( (50 + Math.random()*100) );

  return random
}

for(let i=0; i<numOfInactivePlayers; i++) {
  inactivePlayerElm = {
    elmId: 'inactive' + (i + 1),
    posX: randomPosition(),
    posY: randomPosition(),
    width: 24,
    height: 36,
    isActive: false,
  };

  inactivePlayers.push(inactivePlayerElm);
};

console.log(inactivePlayers)

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);

  socket.emit('inactivePlayers', inactivePlayers);

  socket.on('startGame', function (game) {

    players[socket.id] = {
      playerId: socket.id,
    };
  
    socket.emit('currentPlayers', players);
  
    socket.broadcast.emit('newPlayer', players[socket.id]);
  })

  socket.on('playerIsFacing', function (player) {
    players[socket.id].isFacing = player.isFacing;
    console.log(players[socket.id]);

    socket.broadcast.emit('playerToFace', players[socket.id]);
  });
  
  socket.on('playerMovement', function (movementData) {
    // console.log(movementData);
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // console.log(movementData.x, movementData.y)
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
    // console.log(players);
  });

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnectUser', socket.id);
  });

});

// change 3000 to port
server.listen(3000, () => {
  console.log('listening on *:3000');
});
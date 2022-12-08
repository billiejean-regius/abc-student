const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function randomPosition() {
  let random = parseInt( (50 + Math.random()*100));
  return random
}
 
let flower = [
  {
    id: "flowerOne",
    x: randomPosition() - 5,
    y: randomPosition() -5,
    isPicked: false
  },
  {
    id: "flowerTwo",
    x: randomPosition() - 5,
    y: randomPosition() -5,
    isPicked: false
  },
  {
    id: "flowerThree",
    x: randomPosition() - 5,
    y: randomPosition() -5,
    isPicked: false
  },
  {
    id: "flowerFour",
    x: randomPosition() - 5,
    y: randomPosition() -5,
    isPicked: false
  },
  {
    id: "flowerFive",
    x: randomPosition() - 5,
    y: randomPosition() -5,
    isPicked: false
  }
]
players = {};


// while debugging. positions will; mot be random,
// let y = 100; // for debugging
// let x = 10; // for debugging

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);

    // create a new player and add it to our players object
  players[socket.id] = {
    // x and y positioning of the map:
    // subtract half of the playerWidth and playerHeight 
    x: randomPosition() - 5,
    y: randomPosition() - 5,
    // x: x, // for debugging
    // y: y, // for debugging
    playerId: socket.id,
  };
  // x += 50; // for debugging
  // if(x>200) x=10; // for debugging

  console.log(players);

  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);
  // send flowers to the new player
  socket.emit('flowerData', flower);
  console.log(flower);

  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    // console.log(movementData);
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // console.log(movementData.x, movementData.y)
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnectUser', socket.id);
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
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

let minDist = 10;

let coordX;
let coordY;

function randomPosition() {
  let random = parseInt( (50 + Math.random()*1800) );

  return random
}
 
let flowers = []


for(let i=0; i < 5; i++) {
  let flower = {
    id: "flower" + (i + 1),
    x: randomPosition() - 14,
    y: randomPosition() - 22,
    width: 14,
    height: 22,
    isPicked: false,
  }
  flowers.push(flower);
}

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
    x: randomPosition() - 24,
    y: randomPosition() - 36,
    // x: x, // for debugging
    // y: y, // for debugging
    width: 24,
    height: 36,
    playerId: socket.id,
    myFlowers: [],
  };
  // x += 50; // for debugging
  // if(x>200) x=10; // for debugging

  // console.log(players);

  // function checkCoordinates() {
  //   let coordX = randomPosition();
  //   let coordY = randomPosition();

  //   console.log('new positions: ', coordX, coordY);

  //   for(const player in players) {
  //     console.log(player, players[player].x, players[player].y)
  //     if((coordX > players[player].x - players[player].width - minDist) &&
  //     (coordX <= players[player].x + players[player].width + minDist) &&
  //     (coordY > players[player].y - players[player].width - minDist) &&
  //     (coordY <= players[player].y + players[player].width + minDist)) {
  //       // console.log('cannot place player here');
  //       return true
  //     } 
  //   }
  // }

  
  // players[socket.id].x = coordX;
  // players[socket.id].y = coordY;
  socket.broadcast.emit('newPlayer', players[socket.id]);
  // console.log(players[socket.id]);
 
  // send the players object to the new player
  socket.emit('currentPlayers', players);

  // send the flower object to the new player
  socket.emit('flowerData', flowers);
  
 
  
  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    // console.log(movementData);
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // console.log(movementData.x, movementData.y)
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
    // console.log(players);
  });

  socket.on('flowerCollected', function (flowerIsPicked) {
    // console.log(flowerIsPicked);

  socket.emit('someonePickedTheFlower', flowerIsPicked);

    // generate new random position to replace collected flower
    let flower = {
      id: flowerIsPicked.id,
      x: randomPosition() - 14,
      y: randomPosition() - 22,
      width: 14,
      height: 22,
      isPicked: false,
    }

    // remove the picked flower from the flower arrat
    let flowerToRemove = flowers.find(flower => flower.id === flowerIsPicked.id);
    flowers.splice(flowerToRemove, 1);

    // push new flower to the array
    flowers.push(flower);
    
    // new flower to players
    io.emit('newFlower', flower);
  });

  socket.on('giftingFlower', function (playerInfo) {
    console.log(playerInfo.playerId, ' gifted ', playerInfo.giftTo)
  });

  // update the current flowers arrays
  // socket.emit('currentFlowers', flowers);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    delete players[socket.id];
    delete flowers;
    // emit a message to all players to remove this player
    io.emit('disconnectUser', socket.id);
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
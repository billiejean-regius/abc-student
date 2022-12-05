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

// Game Objects & Players
class Players {
  constructor(posX, posY, width, height, playerId) {
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
      this.playerId = playerId;
  }
};

class worldObjects {
    constructor(name, posX, posY, width, height) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
  };
  
  class Flower extends worldObjects { 
    constructor (name, scientific, rarity, posX, posY, width, height) {
        super(name); 
        this.scientific = scientific;
        this.rarity = rarity;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
  };

  let players = [];

  let flowers = [
    ghostOrchid = new Flower ("Ghost Orchid", "Dendrophylax Lindenii", 10, randomPosition() - 5, randomPosition() - 5, 10, 10),
  ];

  console.log(flowers[0])

  function randomPosition() {
    let random = parseInt( (50 + Math.random()*100));
    return random
  }

  io.on('connection', function (socket) {
    console.log('a user connected: ', socket.id);
    // create a new player
    // x and y positions subtract half of player width/height
    let player = new Players (randomPosition() - 5, randomPosition() - 5, 10, 10, socket.id);
    // console.log(player);
    players.push(player);
    console.log('active players: ', players);

    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', player);
    // send flowers to the new player
    socket.emit('flowerData', flowers);


    // disconnect player 
    socket.on('disconnect', function () {
      console.log('user disconnected: ', socket.id);
      for(let i = 0; i < players.length; i++) {
        // console.log('delete this: ', players[i].playerId.indexOf(socket.id));
        let disconnectedPlayer = players[i].playerId.indexOf(socket.id);
        players.splice(disconnectedPlayer, 1);
      }
      // console.log(players);
      // emit a message to all players to remove this player
      io.emit('disconnectUser', socket.id);
    });
  });

   

  server.listen(3000, () => {
    console.log('listening on *:3000');
  });





// WORKING CODE BELOW
// players object
// players = {};

// // let flowers = {
// //   x: parseInt( (50 + Math.random()*100) ),
// //   y:  parseInt( (50 + Math.random()*100) ),
// // };

// class worldItems {
//   constructor(name, posX, posY) {
//       this.name = name;
//       this.posX = posX;
//       this.posY = posY;
//       // this.state = state;
//       // this.posX = parseInt( (50 + Math.random()*100) );
//       // this.posY = parseInt( (50 + Math.random()*100) );
     
//   }
// };

// class Flower extends worldItems { 
//   constructor (name, scientific, rarity, posX, posY) {
//       super(name); // super() refers to the parent class item. The arguments are fed into the parent item
//       this.scientific = scientific;
//       this.rarity = rarity;
//       this.posX = posX;
//       this.posY = posY;
//       // this.image = image;
//   }
// };

// // create a random function for positioning
// //

// // flowers
// let flowers = [
//   ghostOrchid = new Flower ("Ghost Orchid", "Dendrophylax Lindenii", 10, parseInt( (50 + Math.random()*100) - 5 ), parseInt( (50 + Math.random()*100) - 5)),
// ];


// io.on('connection', function (socket) {
//   console.log('a user connected: ', socket.id);

//    // create a new player and add it to our players object
//    players[socket.id] = {
//     // x and y positioning of the map:
//     // subtract half of the playerWidth and playerHeight 
//     x: parseInt( (50 + Math.random()*100) - 5 ),
//     y:  parseInt( (50 + Math.random()*100) - 5 ),
//     playerId: socket.id,
//   };

//   console.log(players[socket.id]);
  

//   // send the players object to the new player
//   socket.emit('currentPlayers', players);
//   // send the star object to the new player
//   socket.emit('flowerData', flowers);
//   // update all other players of the new player
//   socket.broadcast.emit('newPlayer', players[socket.id]);

//   // when a player disconnects, remove them from our players object
//   socket.on('disconnect', function () {
//     console.log('user disconnected: ', socket.id);
//     delete players[socket.id];
//     // emit a message to all players to remove this player
//     io.emit('disconnectUser', socket.id);
//   });

//   // when a player moves, update the player data
//   socket.on('playerMovement', function (movementData) {
//     // console.log(movementData);
//     players[socket.id].x = movementData.x;
//     players[socket.id].y = movementData.y;
//     // console.log(movementData.x, movementData.y)
//     // emit a message to all players about the player that moved
//     socket.broadcast.emit('playerMoved', players[socket.id]);
//   });
// });






// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
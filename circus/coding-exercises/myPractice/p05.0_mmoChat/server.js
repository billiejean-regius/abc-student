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

// players object
players = {};

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);

   // create a new player and add it to our players object
   players[socket.id] = {
    // rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    // team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
});

// send the players object to the new player
socket.emit('currentPlayers', players);


server.listen(3000, () => {
  console.log('listening on *:3000');
});
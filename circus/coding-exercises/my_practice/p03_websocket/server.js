const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

// sort of a socket.io route
// is someone connects, this event listener
// detects that connection:
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);


    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
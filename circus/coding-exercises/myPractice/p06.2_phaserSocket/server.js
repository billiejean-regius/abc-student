const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// const port = process.env.PORT;

app.use(express.static('public'));

console.log("I am working");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// sort of a socket.io route
// is someone connects, this event listener
// detects that connection:
io.on('connection', (socket) => { // general even listener for any socket connection
  //code inside is per connection
  //for each connection we console log this
    console.log('a user connected', socket.id);
    // for each connection we establish event listener
    //for when that connection disconnects 
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
      });
      socket.on("message", (data) => {
        console.log(data);
        io.emit("incoming", data);
      })
  });

 

server.listen(3000, () => {
  console.log('listening on *:3000');
});
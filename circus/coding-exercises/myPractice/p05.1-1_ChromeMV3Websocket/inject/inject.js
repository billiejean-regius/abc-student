
const httpServer = require('http').createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});
// Or const httpServer = require('http').createServer(app) if you use express

const io = require('socket.io')(httpServer);
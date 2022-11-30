import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';

const app = express(); 
const server = createServer(app); 
const socketio = new Server(server);


1


// const httpServer = require('http').createServer((req, res) => {
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Content-Length', Buffer.byteLength(content));
//   res.end(content);
// });
// // Or const httpServer = require('http').createServer(app) if you use express

// const io = require('socket.io')(httpServer);
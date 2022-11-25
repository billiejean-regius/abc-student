console.log("I am working");

let ioScript = document.createElement('script');
ioScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js");


let headTags = document.getElementsByTagName('head');

headTags[0].append(ioScript);

console.log(ioScript);

let socket = io();

/* Connects to the socket server */
socket.on('connect', function() {
console.log('Client connected');
});


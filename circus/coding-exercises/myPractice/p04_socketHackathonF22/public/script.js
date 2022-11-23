// let socket = io("");
let socket = io(); // "https://abc-socket-hackathon.glitch.me"
let others = [];
let myId;
let testMode = true;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  document.body.append(msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});


let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let buttonOutput = document.getElementById("buttonOutput");

function buttonReceived(){
  buttonOutput.style.backgroundColor = "red";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "black";
  }, 500)
}

allbutme.addEventListener("click", () => {
  //tell socket server
  socket.emit("button1ToAllButMe");
})

//if I receive that someone pressed button 1: 
socket.on("button1", ()=> {
  document.body.style.backgroundImage = "url('assets/bkg.jpeg')"
})

//textToAllButMe

// socket.on('textToAllButMe', (msg) => {
//   socket.broadcast.emit("text", {from: socket.id, value: msg.value});
// });  

let i = -1;
let prologue = [
  "The circus arrives without warning.",
  "No announcements precede it, no paper notices on downtown posts and billboards, no mentions or advertisements in local newspapers.",
  "It is simply there, when yesterday it was not.",
  "The towering tents are striped in white and black, no golds and crimsons to be seen.", 
  "No color at all, save for the neighboring trees and the grass of the surrounding fields.",
  "Black-and-white stripes on grey sky; countless tents of varying shapes and sizes, with an elaborate wrought-iron fence encasing them in a colorless world.",
  "Even what little ground is visible from outside is black or white, painted or powdered, or treated with some other circus trick.",
  "But it is not open for business. Not just yet.",
  "Within hours everyone in town has heard about it.", 
  "By afternoon the news has spread several towns over.",
  "Word of mouth is a more effective method of advertisement than typeset words and exclamation points on paper pamphlets or posters.",
  "It is impressive and unusual news, the sudden appearance of a mysterious circus.",
  "People marvel at the staggering height of the tallest tents.",
  "They stare at the clock that sits just inside the gates that no one can properly describe.",
  "And the black sign painted in white letters that hangs upon the gates, the one that reads:",
]

function getRandomSocketIDthatIsAlsoConnected(){
  let ranIDX = Math.floor(Math.random()*others.length);
  return others[ranIDX];
}

randomSingle.addEventListener("click", () => {
  //tell socket server
  
  i++
  msg = prologue[i];
  console.log(i);
  if (i === prologue.length) {
    i = -1;
  }


  let recipientId = getRandomSocketIDthatIsAlsoConnected();
  console.log("sending", msg)
  console.log("to", recipientId)
  console.log("---")
  socket.emit("textToSingle", {id: recipientId , value: msg});
  
})

//if I receive that someone pressed button 1: 
socket.on("text", (msg)=> {
  
  console.log(socket.id, msg.value)
  document.body.innerHTML += msg.value;
});

//button1ToSingle
//boolrean1ToAllButMe
//valueToAllButMe 







// let socket = io("");
let socket = io("https://abc-socket-hackathon.glitch.me"); // "https://abc-socket-hackathon.glitch.me"
let others = [];
let myId;
let testMode = true;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  // document.body.append(msg.value)
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
  document.body.style.backgroundImage = "url('assets/deathBkg.png')"
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundSize = "100%";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
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
  socket.emit("textToSingle", {id: recipientId , value: msg})
  
})

//if I receive that someone pressed button 1: 
// socket.on("text", (msg)=> {
  
//   console.log(socket.id, msg.value)
//   document.body.innerHTML += msg.value;
// });


// btn1Single.addEventListener("click", () => {
//   //tell socket server

const mailAudio = new Audio("gotMail.mp3");
mailAudio.loop = false;

let inputMessage = document.createElement('input');
inputMessage.setAttribute("type", "text");
inputMessage.setAttribute("placeholder", "Type youre message here");

let inputSubmit = document.createElement('button');
inputSubmit.innerHTML = "Send Message";

document.body.append(inputMessage, inputSubmit);

// })
inputSubmit.addEventListener("click", () => {
  inputMessage.innerHTML = "";

  let msg = inputMessage.value;
  console.log(inputMessage.value);
  let recipientId = getRandomSocketIDthatIsAlsoConnected();
  socket.emit("textToSingle", {id: recipientId, value: msg});
  console.log("sending", msg)
  console.log("to", recipientId)
  console.log("---")
})

socket.on("text", (msg) => {
  console.log(msg);
  mailAudio.play();
  let container = document.createElement("div");
  container.setAttribute("id", "container");
  // container.style.border = "1px solid black";
  container.style.backgroundImage = "url('assets/mail.png')"
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundSize = "100%";
  container.style.position = "absolute";
  

  container.style.width = "300px";
  container.style.height = "175px";
  container.style.top = Math.random()*80+"%";
  container.style.left = Math.random()*80+"%";
  // container.style.transform = "translate(-50%, -50%)";

  document.body.append(container);
  // container.innerHTML += msg.value;
 
  // document.body.insertBefore(mailAudio, document.body.firstElementChild);

  container.addEventListener("click", () => {
      container.style.backgroundImage = "";
      container.style.pointerEvents = "none";
      console.log("mail clicked");
      container.innerHTML += msg.value;
    })
})




// const mailAudio = new Audio("gotMail.mp3");
//     mailAudio.loop = false;
//     document.body.insertBefore(mailAudio, document.body.firstElementChild);

// socket.on("button2", (msg)=> {
//   console.log("You got mail");
//   console.log(socket.id, msg.value)
//   let container = document.createElement("div");
//   container.setAttribute("id", "container");
//   // container.style.border = "1px solid black";
//   container.style.backgroundImage = "url('assets/mail.png')"
//   container.style.backgroundRepeat = "no-repeat";
//   container.style.backgroundSize = "100%";
//   container.style.position = "absolute";
//   container.style.width = "300px";
//   container.style.height = "175px";
//   container.style.top = "50%";
//   container.style.left = "50%";
//   container.style.transform = "translate(-50%, -50%)";

//   document.body.append(container);
//   // container.innerHTML = msg.value;
//   console.log(socket.id, msg.value)


//   container.addEventListener("click", (msg) => {
//     container.style.backgroundImage = "";
//     mailAudio.play();
//     console.log("mail clicked");
//     container.innerHTML += msg.value;
//   })
// })









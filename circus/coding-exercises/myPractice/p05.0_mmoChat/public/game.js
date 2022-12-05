// mmoChat game.js

let mapWidth = 200;
let mapHeight = 200;

let playerWidth = 10;
let playerHeight = 10;

let flowerWidth = 10;
let flowerHeight = 10;

let gameMap = document.createElement('div');
gameMap.setAttribute('id', 'gameMap');
document.body.append(gameMap);
gameMap.style.width = mapWidth  + 'px';
gameMap.style.height = mapHeight + 'px';


let socket = io();
let activePlayers = [];

socket.on('currentPlayers', function (players) {
  //tell the client players are being received
    // console.log('got current players')
      Object.keys(players).forEach(function (id) {
        // me:
        // console.log(players[id].playerId);
        if (players[id].playerId === socket.id) {
          // create an asset for the main player
          // console.log(activePlayers.indexOf(socket.id));
          if(activePlayers.indexOf(socket.id) === -1) {
            // console.log("adding main player");
            addPlayer(players[id]);
          }
          // or them:
        } else {
          // otherwise, create an other player
          if(activePlayers.indexOf(socket.id) === -1) {
            // console.log("adding other player");
            addOtherPlayers(players[id]);
          }
        }
      });
  });
  socket.on('newPlayer', function (playerInfo) {
      console.log("A new player has joined");
      addOtherPlayers(playerInfo);
  });
  socket.on('disconnectUser', function (playerId) {
    console.log(playerId);
      // remove the div element of the disconnected player
      let el = document.getElementById(playerId);
      // console.log(el);
      el.remove(gameMap);

      // remove the player from the activePlayers array 
      let index = activePlayers.indexOf(playerId);
      if (index > -1) {
        activePlayers.splice(index, 1);
      }
      
      console.log("A player has left the game");
      console.log(activePlayers);
  });

  socket.on('flowerData', function (flowerData) {
    // console.log(flowerData[0].posX);
  
    let flower = document.createElement('div');
    flower.classList.add('flower');
    // flower.style.left = (flowerData[0].posX - flowerWidth/2)+ 'px';
    // flower.style.top = (flowerData[0].posY  - flowerHeight/2) + 'px';
    flower.style.left = flowerData[0].posX + 'px';
    flower.style.top = flowerData[0].posY + 'px';
  
    flower.style.width = flowerData[0].width + 'px';
    flower.style.height = flowerData[0].height + 'px';
    
    gameMap.append(flower);
    // if collide with flower: emit and push to player's inventory
    // this.socket.emit('flowerCollected');
    
  });

  function addPlayer(playerInfo) {
    console.log(playerInfo);

      // set map coordinates from random player location
      // gameMap.style.left = (- playerInfo.posX + playerInfo.width/2) + 'px';
      // gameMap.style.top = (- playerInfo.posY + playerInfo.height/2) + 'px';
      gameMap.style.left = - playerInfo.posX + 'px';
      gameMap.style.top = - playerInfo.posY + 'px';

      // create main player element
      let mainPlayer = document.createElement('div');

      // add class 
      mainPlayer.setAttribute('class', 'mainPlayer');
      mainPlayer.style.width = playerInfo.width + 'px';
      mainPlayer.style.height = playerInfo.height + 'px';

      // set id
      mainPlayer.id =  playerInfo.playerId;
    
      // create a name tag to track ids and player movement
      // let nameTag = document.createElement("p");
      // nameTag.innerHTML = playerInfo.playerId;
      // mainPlayer.append(nameTag)

      // append player to map
      gameMap.append(mainPlayer);

      // push to active players
      activePlayers.push(playerInfo.playerId);
      // console.log(activePlayers)

      // tracking coordinates to check if placement matches w/server
      let playerCordX = mainPlayer.offsetLeft - gameMap.offsetLeft;
      let playerCordY = mainPlayer.offsetTop - gameMap.offsetTop;
      console.log("Generated at: ", playerCordX, playerCordY)

  }

  function addOtherPlayers(playerInfo) {
    // otherPlayer;
    let otherPlayer = document.createElement('div');
    otherPlayer.setAttribute('class', 'otherPlayer');

    // set otherPlayer id
    otherPlayer.id =  playerInfo.playerId;
    
    // set otherPlayer style
    // otherPlayer.style.left = (playerInfo.posX - playerInfo.width/2) + 'px';
    // otherPlayer.style.top = (playerInfo.posY - playerInfo.height/2)  + 'px';
    otherPlayer.style.left = playerInfo.posX + 'px';
    otherPlayer.style.top = playerInfo.posY  + 'px';

    otherPlayer.style.width = playerInfo.width + 'px';
    otherPlayer.style.height = playerInfo.width + 'px';

    // append the otherPlayer to the map
    gameMap.append(otherPlayer);
  
    // create a tag for tracking 
    // let nameTag = document.createElement("p");
    // nameTag.innerHTML = playerInfo.playerId;
    // otherPlayer.append(nameTag)
  
    // push to active players array
    activePlayers.push(playerInfo.playerId);

    // tracking coordinates to check if placement matches w/server
    // let otherPlayerCordX = (gameMap.offsetLeft - otherPlayer.offsetLeft);
    // let otherPlayerCordY = (gameMap.offsetTop - otherPlayer.offsetTop);

    // console.log("Other Player: ", otherPlayerCordX, otherPlayerCordY)
  }



// WORKING CODE BELOW
// let mapWidth = 200;
// let mapHeight = 200;

// let playerWidth = 10;
// let playerHeight = 10;

// let flowerWidth = 10;
// let flowerHeight = 10;

// let gameMap = document.createElement('div');
// gameMap.setAttribute('id', 'gameMap');
// document.body.append(gameMap);
// gameMap.style.width = mapWidth  + 'px';
// gameMap.style.height = mapHeight + 'px';

// let mainPlayer = document.createElement('div');
// mainPlayer.setAttribute('class', 'mainPlayer');
// mainPlayer.style.width = playerWidth + 'px';
// mainPlayer.style.height = playerHeight + 'px';

// const leftKey = "ArrowLeft";
// const rightKey = "ArrowRight";
// const upKey = "ArrowUp";
// const downKey = "ArrowDown";

// let speed = 5;


// let socket = io();
// let activePlayers = [];

// socket.on('currentPlayers', function (players) {
//   console.log('got current players')
//     Object.keys(players).forEach(function (id) {
//       // me:
//       if (players[id].playerId === socket.id) {
//         // create an asset for the main player
//         if(activePlayers.indexOf(socket.id) === -1) {
//           console.log("adding main player");
//           addPlayer(players[id]);
//           // updatePlayerMovement(players[id]);
//         }
//         // or them:
//       } else {
//         // otherwise, create an other player
//         if(activePlayers.indexOf(socket.id) === -1) {
//           console.log("adding other player");

//           addOtherPlayers(players[id]);
//         }
//       }
//     });
// });
// socket.on('newPlayer', function (playerInfo) {
//     console.log("A new player has joined");
//     addOtherPlayers(playerInfo);
// });
// socket.on('disconnectUser', function (playerId) {
//     let el = document.getElementById(playerId);
//     el.parentNode.removeChild( el );

//     let index = activePlayers.indexOf(playerId);
//     if (index > -1) {
//       activePlayers.splice(index, 1);
//     }

//     console.log("A player has left the game");
//     console.log(activePlayers);
// });
// socket.on('playerMoved', function (playerInfo) {
//   console.log("a player moved")

//   let playerOnMove = document.getElementById(playerInfo.playerId)
//   // let movePlayer = document.getElementById(playerInfo.playerId);
//   playerOnMove.style.left = playerInfo.x + 'px';
//   playerOnMove.style.top = playerInfo.y + 'px';

//   console.log(playerInfo.playerId + " moved to: " + playerInfo.x, playerInfo.y);
// });

// socket.on('flowerData', function (flowerData) {
//   // console.log(flowerData[0].posX);

//   let flower = document.createElement('div');
//   flower.classList.add('flower');
//   // flower.style.left = (flowerData[0].posX - flowerWidth/2)+ 'px';
//   // flower.style.top = (flowerData[0].posY  - flowerHeight/2) + 'px';
//   flower.style.left = flowerData[0].posX + 'px';
//   flower.style.top = flowerData[0].posY + 'px';

//   flower.style.width = flowerWidth + 'px';
//   flower.style.height = flowerHeight + 'px';
  
//   gameMap.append(flower);
//   // if collide with flower: emit and push to player's inventory
//   // this.socket.emit('flowerCollected');
  
// });

// function addPlayer(playerInfo) {
//   // gameMap.style.left = (- playerInfo.x + playerWidth/2) + 'px';
//   // gameMap.style.top = (- playerInfo.y  + playerHeight/2)  + 'px';
//   gameMap.style.left = - playerInfo.x  + 'px';
//   gameMap.style.top = - playerInfo.y  + 'px';

//   gameMap.append(mainPlayer);
//   mainPlayer.id =  playerInfo.playerId;

//   let nameTag = document.createElement("p");
//   nameTag.innerHTML = playerInfo.playerId;
//   mainPlayer.append(nameTag)

//   activePlayers.push(playerInfo.playerId);
//   // console.log(activePlayers)
//   let playerCordX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//   let playerCordY = mainPlayer.offsetTop - gameMap.offsetTop;

//   console.log("Generated at: ", playerCordX, playerCordY)
// }

// function addOtherPlayers(playerInfo) {
//   // otherPlayer;
//   let otherPlayer = document.createElement('div');
//   otherPlayer.setAttribute('class', 'otherPlayer');
//   otherPlayer.id =  playerInfo.playerId;

//   otherPlayer.style.width = playerWidth + 'px';
//   otherPlayer.style.height = playerHeight + 'px';

//   gameMap.append(otherPlayer);
//   // otherPlayer.style.left = (playerInfo.x - playerWidth/2)+ 'px';
//   // otherPlayer.style.top = (playerInfo.y - playerHeight/2) + 'px';
//   otherPlayer.style.left = playerInfo.x + 'px';
//   otherPlayer.style.top = playerInfo.y  + 'px';

//   let nameTag = document.createElement("p");
//   nameTag.innerHTML = playerInfo.playerId;
//   otherPlayer.append(nameTag)

//   activePlayers.push(playerInfo.playerId);
// }

// window.onkeydown = function(event) {
//   const keyCode = event.key;
//   event.preventDefault();

//   let playerCordX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//   let playerCordY = mainPlayer.offsetTop - gameMap.offsetTop;

//     function updatePlayerMovement() {
//       // save old position data
//       mainPlayer.oldPosition = {
//         x: playerCordX,
//         y: playerCordY,
//       };

//     }

//     if(keyCode == leftKey) {
//       updatePlayerMovement();
    
//       gameMap.style.left = - playerCordX + speed + 'px';
//       //  gameMap.style.top = - playerCordY - speed + 'px';

//       let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//       let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
//         console.log("Old position: ",mainPlayer.oldPosition);
//         console.log("New position: ", newPosX, newPosY);
      
//       socket.emit('playerMovement', ({x: newPosX, y: newPosY}));     
//     } else if(keyCode == rightKey) {
//       updatePlayerMovement();

//       gameMap.style.left = - playerCordX - speed + 'px';
//       //  gameMap.style.top = - playerCordY - speed + 'px';

//       let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//       let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
//         console.log("Old position: ",mainPlayer.oldPosition);
//         console.log("New position: ", newPosX, newPosY);

//       socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
//     } else if(keyCode == upKey) {
//       updatePlayerMovement();

//       // gameMap.style.left = - playerCordX - speed + 'px';
//       gameMap.style.top = - playerCordY + speed + 'px';

//       let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//       let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
//         console.log("Old position: ",mainPlayer.oldPosition);
//         console.log("New position: ", newPosX, newPosY);

//       socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
//     } else if(keyCode == downKey) {
//       updatePlayerMovement();

//       // gameMap.style.left = - playerCordX - speed + 'px';
//       gameMap.style.top = - playerCordY - speed + 'px';

//       let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
//       let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
//         console.log("Old position: ",mainPlayer.oldPosition);
//         console.log("New position: ", newPosX, newPosY);

//       socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
//     } 
// }



 
 



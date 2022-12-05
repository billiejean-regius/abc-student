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

let mainPlayer = document.createElement('div');
mainPlayer.setAttribute('class', 'mainPlayer');
mainPlayer.style.width = playerWidth + 'px';
mainPlayer.style.height = playerHeight + 'px';

const leftKey = "ArrowLeft";
const rightKey = "ArrowRight";
const upKey = "ArrowUp";
const downKey = "ArrowDown";

let speed = 5;


let socket = io();
let activePlayers = [];

socket.on('currentPlayers', function (players) {
  console.log('got current players')
    Object.keys(players).forEach(function (id) {
      // me:
      if (players[id].playerId === socket.id) {
        // create an asset for the main player
        if(activePlayers.indexOf(socket.id) === -1) {
          console.log("adding main player");
          addPlayer(players[id]);
          // updatePlayerMovement(players[id]);
        }
        // or them:
      } else {
        // otherwise, create an other player
        if(activePlayers.indexOf(socket.id) === -1) {
          console.log("adding other player");

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
    let el = document.getElementById(playerId);
    el.parentNode.removeChild( el );

    let index = activePlayers.indexOf(playerId);
    if (index > -1) {
      activePlayers.splice(index, 1);
    }

    console.log("A player has left the game");
    console.log(activePlayers);
});
socket.on('playerMoved', function (playerInfo) {
  console.log("a player moved")

  let playerOnMove = document.getElementById(playerInfo.playerId)
  // let movePlayer = document.getElementById(playerInfo.playerId);
  playerOnMove.style.left = playerInfo.x + 'px';
  playerOnMove.style.top = playerInfo.y + 'px';

  console.log(playerInfo.playerId + " moved to: " + playerInfo.x, playerInfo.y);
});

socket.on('flowerData', function (flowerData) {
  // console.log(flowerData[0].posX);

  let flower = document.createElement('div');
  flower.classList.add('flower');
  // flower.style.left = (flowerData[0].posX - flowerWidth/2)+ 'px';
  // flower.style.top = (flowerData[0].posY  - flowerHeight/2) + 'px';
  flower.style.left = flowerData[0].posX + 'px';
  flower.style.top = flowerData[0].posY + 'px';

  flower.style.width = flowerWidth + 'px';
  flower.style.height = flowerHeight + 'px';
  
  gameMap.append(flower);
  // if collide with flower: emit and push to player's inventory
  // this.socket.emit('flowerCollected');
  
});

function addPlayer(playerInfo) {
  // gameMap.style.left = (- playerInfo.x + playerWidth/2) + 'px';
  // gameMap.style.top = (- playerInfo.y  + playerHeight/2)  + 'px';
  gameMap.style.left = - playerInfo.x  + 'px';
  gameMap.style.top = - playerInfo.y  + 'px';

  gameMap.append(mainPlayer);
  mainPlayer.id =  playerInfo.playerId;

  let nameTag = document.createElement("p");
  nameTag.innerHTML = playerInfo.playerId;
  mainPlayer.append(nameTag)

  activePlayers.push(playerInfo.playerId);
  // console.log(activePlayers)
  let playerCordX = mainPlayer.offsetLeft - gameMap.offsetLeft;
  let playerCordY = mainPlayer.offsetTop - gameMap.offsetTop;

  console.log("Generated at: ", playerCordX, playerCordY)
}

function addOtherPlayers(playerInfo) {
  // otherPlayer;
  let otherPlayer = document.createElement('div');
  otherPlayer.setAttribute('class', 'otherPlayer');
  otherPlayer.id =  playerInfo.playerId;

  otherPlayer.style.width = playerWidth + 'px';
  otherPlayer.style.height = playerHeight + 'px';

  gameMap.append(otherPlayer);
  // otherPlayer.style.left = (playerInfo.x - playerWidth/2)+ 'px';
  // otherPlayer.style.top = (playerInfo.y - playerHeight/2) + 'px';
  otherPlayer.style.left = playerInfo.x + 'px';
  otherPlayer.style.top = playerInfo.y  + 'px';

  let nameTag = document.createElement("p");
  nameTag.innerHTML = playerInfo.playerId;
  otherPlayer.append(nameTag)

  activePlayers.push(playerInfo.playerId);
}

window.onkeydown = function(event) {
  const keyCode = event.key;
  event.preventDefault();

  let playerCordX = mainPlayer.offsetLeft - gameMap.offsetLeft;
  let playerCordY = mainPlayer.offsetTop - gameMap.offsetTop;

    function updatePlayerMovement() {
      // save old position data
      mainPlayer.oldPosition = {
        x: playerCordX,
        y: playerCordY,
      };

    }

    if(keyCode == leftKey) {
      updatePlayerMovement();
    
      gameMap.style.left = - playerCordX + speed + 'px';
      //  gameMap.style.top = - playerCordY - speed + 'px';

      let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
      let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
        console.log("Old position: ",mainPlayer.oldPosition);
        console.log("New position: ", newPosX, newPosY);
      
      socket.emit('playerMovement', ({x: newPosX, y: newPosY}));     
    } else if(keyCode == rightKey) {
      updatePlayerMovement();

      gameMap.style.left = - playerCordX - speed + 'px';
      //  gameMap.style.top = - playerCordY - speed + 'px';

      let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
      let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
        console.log("Old position: ",mainPlayer.oldPosition);
        console.log("New position: ", newPosX, newPosY);

      socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
    } else if(keyCode == upKey) {
      updatePlayerMovement();

      // gameMap.style.left = - playerCordX - speed + 'px';
      gameMap.style.top = - playerCordY + speed + 'px';

      let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
      let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
        console.log("Old position: ",mainPlayer.oldPosition);
        console.log("New position: ", newPosX, newPosY);

      socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
    } else if(keyCode == downKey) {
      updatePlayerMovement();

      // gameMap.style.left = - playerCordX - speed + 'px';
      gameMap.style.top = - playerCordY - speed + 'px';

      let newPosX = mainPlayer.offsetLeft - gameMap.offsetLeft;
      let newPosY = mainPlayer.offsetTop - gameMap.offsetTop;
        console.log("Old position: ",mainPlayer.oldPosition);
        console.log("New position: ", newPosX, newPosY);

      socket.emit('playerMovement', ({x: newPosX, y: newPosY})); 
    } 
}



 
 



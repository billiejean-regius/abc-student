// game.js

let mapWidth = 200;
let mapHeight = 200;

// let playerWidth = 10;
// let playerHeight = 10;

let flowerWidth = 10;
let flowerHeight = 10;

let player; 

let gameMap = document.createElement('div');
gameMap.setAttribute('id', 'gameMap');
document.body.append(gameMap);
gameMap.style.width = mapWidth  + 'px';
gameMap.style.height = mapHeight + 'px';

const leftKey = "ArrowLeft";
const rightKey = "ArrowRight";
const upKey = "ArrowUp";
const downKey = "ArrowDown";

window.onkeydown = function(event) {
  const keyCode = event.key;
  event.preventDefault();

    if(keyCode == leftKey) {  
      player.stepLeft();
    } else if(keyCode == rightKey) {
      player.stepRight();
    } else if(keyCode == upKey) {
      player.stepUp();
    } else if(keyCode == downKey) {
      player.stepDown();
    } 
}
  

// Game Objects & Players
class Player {
  constructor(posX, posY, playerId, isMe) {
      // this.posX = 0; // for debugging
      // this.posY = 0; // for debugging
      this.posX = posX;
      this.posY = posY;
      this.width = 10;
      this.height = 10;
      this.playerId = playerId;
      this.speed = 2;
      this.isMe = isMe;
      this.elm;
      this.myFlowers = [];
  }
  
  stepRight(){
    // check if step would collide
    if( this.isColliding(this.posX + this.speed, this.posY) == true ){

    }else{
      this.posX = this.posX + this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();
    }
    // if not
    // apply step to this.posX 
    // update the DOM (gameMap)
    // tell server that player moved
  }
  stepLeft() {
    if( this.isColliding(this.posX - this.speed, this.posY) == true ){

    }else{
      this.posX = this.posX - this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();
    }

  }
  stepUp() {
    if( this.isColliding(this.posX, this.posY - this.speed) == true ){

    }else{
      this.posY = this.posY - this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();
    }

  }
  stepDown() {
    if( this.isColliding(this.posX, this.posY + this.speed) == true ){

    }else{
      this.posY = this.posY + this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();
    }

  }
  isColliding(nextStepX, nextStepY) {
    //    - bounds of map
    if(nextStepX >= 0 && nextStepX < mapWidth - this.width && nextStepY >= 0 && nextStepY < mapHeight - this.height) {
    //    - other players
      for(let i = 0; i < activePlayers.length; i++) {
        
        if(activePlayers[i].playerId != this.playerId) {
         // other
         let other = activePlayers[i];
         if((other.posX > nextStepX - other.width) && 
            (other.posX <= nextStepX + this.width) && 
            (other.posY > nextStepY - other.height) && 
            (other.posY <= nextStepY + this.height) ) {
              return true
            }
        }
        // console.log(activePlayers[i]);      
      }
      return false
    } else {
      return true
    }
  }
  updatePosition() {
    // if me:
    if(this.isMe === true) {
      gameMap.style.left = - this.posX  + 'px';
      gameMap.style.top = - this.posY  + 'px';
    } else {
      this.elm.style.left = this.posX + 'px';
      this.elm.style.top = this.posY  + 'px';
    }
    // else:
    // move actal this.elm to location
  }
  createElement(){
    this.elm = document.createElement('div');
    // if me....
    if(this.isMe === true) {
      this.elm.setAttribute('class', 'mainPlayer');
    // if not me...
    } else {
      this.elm.setAttribute('class', 'otherPlayer');
    }
    // else
    //  ///
    this.elm.style.width = this.width + 'px';
    this.elm.style.height = this.height + 'px';
  
    // append the mainPlayer to the map
    gameMap.append(this.elm)
  
    // assign element id as the socket id
    this.elm.id =  this.playerId;
  
    // push id to activePlayers array 
    // activePlayers.push(playerInfo.playerId);
  
    // name tag for debug tracking
    let nameTag = document.createElement("p");
    nameTag.innerHTML = this.playerId;
    this.elm.append(nameTag)

     // set map coordinates from random player location
    this.updatePosition();
  }
};

class worldObject {
    constructor(name, posX, posY, width, height) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
  };
  
  class Flower extends worldObject { 
    constructor (name, posX, posY, isPicked) {
        super(name, posX, posY); 
        // this.scientific = scientific;
        // this.rarity = rarity;
        this.posX = posX;
        this.posY = posY;
        this.width = 10;
        this.height = 10;
        this.flowerElm;
        this.isPicked = isPicked;
    }
    createElement(){
      this.flowerElm = document.createElement('div');

      this.flowerElm.setAttribute('class', 'flower');

      this.flowerElm.style.width = this.width + 'px';
      this.flowerElm.style.height = this.height + 'px';

      gameMap.append(this.flowerElm)

      this.updatePosition();
    }
    updatePosition() {
      this.flowerElm.style.left = this.posX + 'px';
      this.flowerElm.style.top = this.posY  + 'px';
    }
  };


  // let flowers = [
  //   ghostOrchid = new Flower ("Ghost Orchid", "Dendrophylax Lindenii", 10, randomPosition() - 5, randomPosition() - 5, 10, 10),
  // ];


let activePlayers = [];
let activeObjects = [];
let activeFlowers = [];

let socket = io();
 
socket.on('currentPlayers', function (players) {
  Object.keys(players).forEach(function (id) {
    // me:
    if (players[id].playerId === socket.id) {
      // create an asset for the main player
      if(activePlayers.indexOf(socket.id) === -1) {
        console.log("adding main player");
        // addPlayer(players[id]);
        player = new Player (players[id].x, players[id].y, players[id].playerId, true);
        // push player (mainPlayer) instance to activePlayers array
        activePlayers.push(player);
        // create mainPlayer element 
        player.createElement();
      }
      // or them:
    } else {
      // otherwise, create an other player
      if(activePlayers.indexOf(socket.id) === -1) {
        console.log("adding other player");
        // addOtherPlayers(players[id]);
        let guestPlayer = new Player (players[id].x, players[id].y, players[id].playerId, false);
        // push player (mainPlayer) instance to activePlayers array
        activePlayers.push(guestPlayer);
        // create mainPlayer element 
        guestPlayer.createElement();
      }
    }
  });
});
socket.on('newPlayer', function (playerInfo) {
  console.log("A new player has joined");
  // addOtherPlayers(playerInfo);
  let guestPlayer = new Player (playerInfo.x, playerInfo.y, playerInfo.playerId, false);
  // push player (mainPlayer) instance to activePlayers array
  activePlayers.push(guestPlayer);
  // create mainPlayer element 
  guestPlayer.createElement();
});
socket.on('playerMoved', function (playerInfo) {
  // console.log("a player moved");

  // console.log('delete this: ', players[i].playerId.indexOf(socket.id));
  let movedPlayer = activePlayers.find(player => player.playerId === playerInfo.playerId);
  // console.log(movedPlayer);

  movedPlayer.posX = playerInfo.x;
  movedPlayer.posY = playerInfo.y;

  movedPlayer.updatePosition();

  // let playerOnMove = document.getElementById(playerInfo.playerId)
  // // let movePlayer = document.getElementById(playerInfo.playerId);
  // playerOnMove.style.left = playerInfo.x + 'px';
  // playerOnMove.style.top = playerInfo.y + 'px';

  // console.log(playerInfo.playerId + " moved to: " + playerInfo.x, playerInfo.y);
});
socket.on('flowerData', function (flowerData) {

  
  for(let i=0; i < 5; i++) {
    console.log(flowerData[i].x, flowerData[i].y);
    let flower = new Flower (flowerData[i].id, flowerData[i].x, flowerData[i].y, flowerData[i].isPicked);

    activeFlowers.push(flower);
    // create mainPlayer element 
    flower.createElement();
  }
  
  // gameMap.append(flower);
  // if collide with flower: emit and push to player's inventory
  // this.socket.emit('flowerCollected');
  
});


socket.on('disconnectUser', function (playerId) {
    // remove the div element of the disconnected player
    let el = document.getElementById(playerId);
    console.log(el);
    el.remove(gameMap);

    console.log(activePlayers);
    for(let i = 0; i < activePlayers.length; i++) {
      // console.log('delete this: ', players[i].playerId.indexOf(socket.id));
      let disconnectedPlayer = activePlayers[i].playerId.indexOf(socket.id);
      activePlayers.splice(disconnectedPlayer, 1);
    }

    console.log("A player has left the game");
});














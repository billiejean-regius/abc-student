// game.js

let mapWidth = 2000;
let mapHeight = 2000;

let minDist = 50;

let player; 

// let currentLoopIndex = 0;
// const animationLoop = [1, 2, 3, 4]

// let displayBox = document.createElement('div');
// displayBox.setAttribute('id', 'displayBox');
let playButton = document.createElement('button');
playButton.setAttribute('id', 'playButton');
playButton.style.backgroundImage = 'url(assets/startButton.png)'

let loader = document.createElement('div');
loader.setAttribute('id', 'loader');
loader.style.backgroundImage = 'url(assets/rabillion/rabillion.png)'

let loadScreen = document.createElement('div');
loadScreen.setAttribute('id', 'loadScreen');
loadScreen.style.width = mapWidth  + 'px';
loadScreen.style.height = mapHeight + 'px';

let gameMap = document.createElement('div');
gameMap.setAttribute('id', 'gameMap');
gameMap.style.width = mapWidth  + 'px';
gameMap.style.height = mapHeight + 'px';

document.body.append(loadScreen);
loadScreen.append(loader, playButton);

let activePlayers = [];
let activeObjects = [];
let activeFlowers = [];

const leftKey = "ArrowLeft";
let faceLeft = false;
const rightKey = "ArrowRight";
let faceRight = false;
const upKey = "ArrowUp";
let faceUp = false;
const downKey = "ArrowDown";
let faceDown = false;

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

function playGame() {
  let forestSound = new Audio('assets/sound/forest.mp3');
  forestSound.play();
  forestSound.loop = true;

  loadScreen.style.display = "none";
  document.body.append(gameMap);

  // Game Objects & Players
class Player {
  constructor(posX, posY, playerId, isMe) {
      // this.posX = 0; // for debugging
      // this.posY = 0; // for debugging
      this.posX = posX; // x position
      this.posY = posY; // y position
      this.width = 24;
      this.height = 36;
      this.playerId = playerId; // socket.id
      this.speed = 2; // # of px moved
      this.isMe = isMe; // true or false
      this.elm; 
      this.myFlowers = []; // flower inventory
      this.giftTo;
      this.reactTrigger;
      // this.collisionMarker;
      // this.playerPanel;
      this.reactTop;
  }
  
  stepRight(){
    faceRight = true;
    // check if step would collide
    if( this.isColliding(this.posX + this.speed, this.posY) == true ){

    }else{
      this.elm.style.backgroundImage = 'url(assets/rabillion/rabillionRight.png)';

      this.posX = this.posX + this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();

    
      // if(this.isCollectingFlower(this.posX, this.posY) == true) {
      //   // console.log('pickup the flower');
      // }
    }
    // if not
    // apply step to this.posX 
    // update the DOM (gameMap)
    // tell server that player moved
  }
  stepLeft() {
    faceLeft = true;
    if( this.isColliding(this.posX - this.speed, this.posY) == true ){

    }else{
      this.elm.style.backgroundImage = 'url(assets/rabillion/rabillionLeft.png)';

      this.posX = this.posX - this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();

      // if(this.isCollectingFlower(this.posX, this.posY) == true) {
      //   // console.log('pickup the flower');
      // }
    }

  }
  stepUp() {
    faceUp = true;
    if( this.isColliding(this.posX, this.posY - this.speed) == true ){

    }else{
      this.elm.style.backgroundImage = 'url(assets/rabillion/rabillionBack.png)';
      this.posY = this.posY - this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();

      // if(this.isCollectingFlower(this.posX, this.posY) == true) {
      //   // console.log('pickup the flower');
      // }
    }

  }
  stepDown() {
    faceDown = true;
    if( this.isColliding(this.posX, this.posY + this.speed) == true ){

    }else{
      this.elm.style.backgroundImage = 'url(assets/rabillion/rabillionFront.png)';
      this.posY = this.posY + this.speed;
      socket.emit('playerMovement', ({x: this.posX, y: this.posY})); 
      this.updatePosition();

      // if(this.isCollectingFlower(this.posX, this.posY) == true) {
      //   // console.log('pickup the flower');
      // }
      
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
  isCollectingFlower(myPosX, myPosY) { //does not actually use the next step uses where they are
    if(this.myFlowers.length >= 10) {

    } else {
      for(let i = 0; i < activeFlowers.length; i++) {
        let theFlower = activeFlowers[i];
        if((theFlower.posX > myPosX - theFlower.width) && 
        (theFlower.posX <= myPosX + this.width) && 
        (theFlower.posY > myPosY - theFlower.height) && 
        (theFlower.posY <= myPosY + this.height) ) {
          // console.log(activeFlowers[i].name);
  
          // set isPicked to true
            activeFlowers[i].isPicked = true;
            activeFlowers[i].whoPicked = this.playerId;
            // console.log(this.playerId, ' picked ', activeFlowers[i].id)
          
          // emit to server
            socket.emit('flowerCollected', activeFlowers[i]);
  
          // move to players inventory
          if(this.isMe === true) {
            this.myFlowers.push(activeFlowers[i]);
            // console.log(this.myFlowers);

            let gridDisplay = document.querySelector('.myFlowerDisplay');
           
            // console.log(childDiv);
             /// Move to a socket function?
              for(let i=0; i < this.myFlowers.length; i++) {
                // console.log(this.myFlowers[i]);
                //add the image of flower 1 to grid id 1, 2 to 2
                // let gridNum = 'flwr' + (i + 1);
                let childDiv = gridDisplay.getElementsByClassName('flwr')[i];
                childDiv.style.backgroundImage = this.myFlowers[i].flwrIcon;
              }
          }
            
          
          return true
        }
      } 
    }
  }
  isWithinReach(myPosX, myPosY) {
  
    if(this.myFlowers.length < 1) {
      // console.log("no flowers to give")
      return false
    } else {
      for(let i = 0; i < activePlayers.length; i++) {
          
        if(activePlayers[i].playerId != this.playerId) {
        // other
        let other = activePlayers[i];
        if((other.posX > myPosX - other.width - minDist) && 
            (other.posX <= myPosX + this.width + minDist) && 
            (other.posY > myPosY - other.height - minDist) && 
            (other.posY <= myPosY + this.height + minDist) ) {

              // this.nearMe = true;
              return true
            } else {
              this.reactTrigger = false;
              return false
            }
        }
        // console.log(activePlayers[i]);      
      }
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
    if(this.isCollectingFlower(this.posX, this.posY) == true) {
      // console.log('pickup the flower');
    }
    if(this.isWithinReach(this.posX, this.posY) == true) {
      if(this.reactTrigger == true) {
        
      } else {
        let exclSound = new Audio('assets/sound/exclamation.mp3');
        exclSound.play();

        this.reactTop.setAttribute('class', 'myReactTop');
        this.reactTop.style.backgroundImage = 'url(assets/rabillion/reactions/exclamation.png)'

        let otherReact = document.getElementsByClassName('otherReactTop');
        for(let i=0; i < otherReact.length; i++) {
          otherReact[i].style.display = 'block';
          otherReact[i].style.backgroundImage = 'url(assets/rabillion/reactions/gift.png)';
        }

        this.reactTrigger = true;
      }
    } else {
      this.reactTop.classList.remove('myReactTop');

      let otherReact = document.getElementsByClassName('otherReactTop');
        for(let i=0; i < otherReact.length; i++) {
          otherReact[i].style.display = 'none';
        }
      // this.reactTop.setAttribute('class', 'reactTop');
    }
      // console.log("you can gift a flower");
      // reaction pops up when you are close enough to give a flower
        
     
      // emit to server
          // who is sending the flower => this.playerId
          // what flower => first flower in this.myFlowers?
          // to who => activePlayers[i].playerId
          // this.giftTo = activePlayers[i].playerId;
          // let playerIsGifting = activePlayers.find(player => player.playerId === this.playerId);
          // console.log(this.playerId, ' wants to gift ', activePlayers[i].playerId, ' a flower');
          // socket.emit('giftingFlower', playerIsGifting);
      
    // } else {
    //   this.reactTop.classList.remove('reactionExclamation');
    //   this.reactTop.setAttribute('class', 'reactTop');
    // }
    // else:
    // move actal this.elm to location
  }
  createElement(){
    this.elm = document.createElement('div');
    this.collisionMarker = document.createElement('div');
    this.playerPanel = document.createElement('div');
    this.reactTop = document.createElement('div');
    this.flowerDisplay = document.createElement('div');

    for(let i=0; i<10; i++) {
      this.flwrInventory = document.createElement('div');
        this.flwrInventory.classList.add('flwr' + (i + 1), 'flwr');
        // this.flwrInventory.setAttribute('class', 'flwr');

      this.flowerDisplay.append(this.flwrInventory);
    }
    // if me....
    if(this.isMe === true) {
      this.elm.setAttribute('class', 'mainPlayer');
      this.collisionMarker.setAttribute('class', 'myMarker');
      this.playerPanel.setAttribute('class', 'myPanel');
      this.reactTop.setAttribute('class', 'myReactTop');
      this.flowerDisplay.setAttribute('class', 'myFlowerDisplay');
    // if not me...
    } else {
      this.elm.setAttribute('class', 'otherPlayer');
      this.collisionMarker.setAttribute('class', 'otherMarker');
      this.playerPanel.setAttribute('class', 'otherPanel');
      this.reactTop.setAttribute('class', 'otherReactTop');
      this.flowerDisplay.setAttribute('class', 'otherFlowerDisplay');
    }
    // else
    //  ///
    // assign element id as the socket id
      this.elm.id =  this.playerId;
      
      this.elm.style.width = this.width + 'px';
      this.elm.style.height = this.height + 'px';

      // append the mainPlayer to the map
      gameMap.append(this.elm)

      this.collisionMarker.style.width = 15 + 'px';
      this.collisionMarker.style.height = 7 + 'px';
      this.collisionMarker.style.top = 20 + 'px';
      this.collisionMarker.style.left = 4.5 + 'px';

      this.elm.append(this.collisionMarker, this.playerPanel);

    // this.elm.append(playerPanel, collisionMarker);
       this.playerPanel.append(this.reactTop, this.flowerDisplay);


    // sprite sheet
      // let sheet = new Image();
      // sheet.src = 'assets/rabillion/sheet/walk_back.front.png';

      this.elm.style.backgroundImage = 'url(assets/rabillion/rabillionFront.png)';
    
      
    // name tag for debug tracking
      // let nameTag = document.createElement("p");
      // nameTag.innerHTML = this.playerId;
      // this.elm.append(nameTag)

     // set map coordinates from random player location
      this.updatePosition();
  }
  myFlowers() {
    this.elm = document.createElement('div');

  }
  drawSprite(frameX, frameY) {
    let spriteX = frameX * this.width;
    let spriteY = frameY * this.height;
    this.elm.style.backgroundPosition = `${spriteX}px ${spriteY}px`;
  }
};

class worldObject {
    constructor(name, id, posX, posY, width, height) {
        this.name = name;
        this.id = id;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
  };
  
  class Flower extends worldObject { 
    constructor (name, id, posX, posY, isPicked, flwrImage, flwrIcon) {
        super(name, id, posX, posY); 
        // this.scientific = scientific;
        // this.rarity = rarity;
        this.posX = posX;
        this.posY = posY;
        this.width = 14;
        this.height = 22;
        this.flowerElm;
        this.isPicked = isPicked;
        this.whoPicked;
        this.flwrImage = flwrImage;
        this.flwrIcon = flwrIcon;
    }
    createElement(){
      this.flowerElm = document.createElement('div');

      this.flowerElm.setAttribute('class', 'flower');
      this.flowerElm.setAttribute('id', this.id);

      this.flowerElm.style.width = this.width + 'px';
      this.flowerElm.style.height = this.height + 'px';

      this.flwrIcon = 'url(assets/world/blueFlowerIcon.png)'
      this.flwrImage = 'url(assets/world/blueFlowerPlant.png)';
      this.flowerElm.style.backgroundImage = this.flwrImage;

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

let socket = io();
 
socket.on('currentPlayers', function (players) {
  Object.keys(players).forEach(function (id) {
    // me:
    if (players[id].playerId === socket.id) {
      // create an asset for the main player
      if(activePlayers.indexOf(socket.id) === -1) {
        // console.log("adding main player");
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
        // console.log("adding other player");
        // addOtherPlayers(players[id]);
        let guestPlayer = new Player (players[id].x, players[id].y, players[id].playerId, false);
        // push player (mainPlayer) instance to activePlayers array
        activePlayers.push(guestPlayer);
        // create mainPlayer element 
        guestPlayer.createElement();
      }
    }
  });
  // console.log(activePlayers);
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
});
socket.on('flowerData', function (flowerData) {
  for(let i=0; i < 5; i++) {
    // console.log(flowerData[i].x, flowerData[i].y);
    let flower = new Flower ('a flower', flowerData[i].id, flowerData[i].x, flowerData[i].y, flowerData[i].isPicked);

    activeFlowers.push(flower);
    // create mainPlayer element 
    flower.createElement();
  }
});

socket.on('someonePickedTheFlower', function (playerPicked) {
  // console.log(playerPicked.whoPicked, ' picked ', playerPicked.id);

   // remove from active flower objects
   activeFlowers.splice(playerPicked.id, 1);
  //  console.log(activeFlowers);

   // remove from gameMap
    // console.log(theFlower.id);
    let flowerToRemove = document.getElementById(playerPicked.id);
    gameMap.removeChild(flowerToRemove);

    // if(playerPicked.whoPicked === ) {
    //   console.log("this is me, do nothing")
    // } else {
    //   console.log(playerPicked.whoPicked);
    //   let thePicker = document.getElementById(playerPicked.whoPicked);
    //   console.log(thePicker);
    // }
    



    // for(let i=0; i < this.myFlowers.length; i++) {
    //   // console.log(this.myFlowers[i]);
    //   //add the image of flower 1 to grid id 1, 2 to 2
    //   // let gridNum = 'flwr' + (i + 1);
    //   let childDiv = gridDisplay.getElementsByClassName('flwr')[i];
    //   childDiv.style.backgroundImage = this.myFlowers[i].flwrIcon;
    // }

});

socket.on('newFlower', function (newFlower) {
  // console.log(newFlower.x, newFlower.y);
  let flower = new Flower ('a flower', newFlower.id, newFlower.x, newFlower.y, newFlower.isPicked);
  activeFlowers.push(flower);
  flower.createElement();
  console.log('a new flower is growing!');
});

socket.on('disconnectUser', function (playerId) {
    // remove the div element of the disconnected player
    let el = document.getElementById(playerId);
    // console.log(el);
    el.remove(gameMap);

    console.log(activePlayers);
    for(let i = 0; i < activePlayers.length; i++) {
      // console.log('delete this: ', players[i].playerId.indexOf(socket.id));
      let disconnectedPlayer = activePlayers[i].playerId.indexOf(socket.id);
      activePlayers.splice(disconnectedPlayer, 1);
    }

    console.log("A player has left the game");
});

}

playButton.addEventListener("click", playGame)





















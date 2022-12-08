let randomCoordinates = [];

function randomPosition() {
    let random = parseInt( (50 + Math.random()*100));
    return random
  }

let playerWidth = 50;
let playerHeight = 50;
let minDist = 20;

let div01 = document.createElement('div');
div01.setAttribute('class', 'div01');

let div02 = document.createElement('div');
div02.setAttribute('class', 'div02');

function checkPosition() {
    let x1 = randomPosition();
    let y1 = randomPosition();

    let x2 = randomPosition();
    let y2 = randomPosition();

    if((x2 > x1 - playerWidth - minDist) && 
    (x2 <= x1 + playerWidth + minDist) && 
    (y2 > y1 - playerHeight - minDist) && 
    (y2 <= y1 + playerHeight + minDist)) {
        console.log("player is less than minimum distance");
        checkPosition();
    } else {
        div01.style.top = x1 + 'px';
        div01.style.left = y1 + 'px';

        div02.style.top = x2 + 'px';
        div02.style.left = y2 + 'px';

        document.body.append(div01, div02);
    }
}

checkPosition();




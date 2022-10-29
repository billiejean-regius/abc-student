// let sw = screen.width;
// let sh = screen.height;

// // create game banner 
// let banner = document.createElement('div')
// // let ctx = banner.getContext('2d');
// banner.setAttribute('id', 'gameBanner');
// document.body.appendChild(banner);

// let froggy = document.createElement('div');
// froggy.classList.add('froggy');
// banner.appendChild(froggy);


// leftKeyIsPressed = false;
// rightKeyIsPressed = false;

// // get current position of froggy
// let pos = froggy.getBoundingClientRect();
// let left = pos.left;
// let right = pos.top;

// let posX = pos.x;
// console.log(pos);

// // update key events
// window.addEventListener('keydown', (event) => {
    
//     event.preventDefault();
//     console.log(event.key)
//     const keyCode = event.key;
//     //check if arrows pressed
//     if(keyCode === "ArrowLeft") {
//         // posX += 3;
//         left += 3;
//         console.log(posX);
//         console.log("left key is being pressed");
//     } else if(keyCode === "ArrowRight") {
//         posX += 3;
//         console.log(posX);
//         console.log("right key is being pressed");  
//     }
//     });

//     let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext('2d');
// canvas.width = 400;
// canvas.height = 400;

// let object = {
//     height: 40,
//     width: 40,
//     x: 10,
//     y: 10, 
//     color: "#FF0000"		
// }

// let dx = 0, dy = 0;
// let speed = 100; // px per second

// let activeKey = 0;
// document.addEventListener('keydown', function(e) {
//     if (activeKey == e.keyCode) return;
//     activeKey = e.keyCode;
    
//     //left
//     if (e.keyCode == 37) {
//         console.log('start moving LEFT');
//         dx = -1;
//     }
//     //top
//     else if (e.keyCode == 38) {
//         console.log('start moving UP');
//         dy = -1;
//     }
//     //right
//     else if (e.keyCode == 39) {
//         console.log('start moving RIGHT');
//         dx = 1;
//     }
//     //bottom
//     else if (e.keyCode == 40) {
//         console.log('start moving DOWN');
//         dy = 1;
//     }
// });
// document.addEventListener('keyup', function(e) {
//     switch (e.keyCode) {
//         case 37: // left
//         case 39: // right
//             console.log('stop moving HOR');
//             dx = 0;
//             break;
            
//         case 38: // up
//         case 40: // down
//             console.log('stop moving VER');
//             dy = 0;
//             break;
//     }
    
//     activeKey = 0;
// });

// create game banner 
let divBanner = document.createElement('div');
divBanner.setAttribute('id', 'gameBanner');
let banner = document.createElement('canvas')
let ctx = banner.getContext('2d');

document.body.appendChild(divBanner);
divBanner.appendChild(banner);

banner.width = 400;
banner.height = 400;

let object = {
    height: 40,
    width: 40,
    x: 10,
    y: 20, 
    color: "#FF0000"		
}

let dx = 0, dy = 0;
let speed = 100; // px per second

let activeKey = 0;


window.addEventListener('keydown', (event) => {
    let keyCode = event.key;
    event.preventDefault();
    if (activeKey == keyCode) return;
    activeKey = keyCode;
    //left
    if (keyCode == "ArrowLeft") {
        console.log('start moving LEFT');
        dx = -1;
    } else if (keyCode == "ArrowRight") {
        console.log('start moving RIGHT');
        dx = 1;
    }
    window.addEventListener('keyup', function(e) {
        switch (keyCode) {
            case "ArrowLeft": // left
            case "ArrowRight": // right
                console.log('stop moving HOR');
                dx = 0;
                break;
        }
        
        activeKey = 0;
    });
});


function renderBanner(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 600, 80);
} 
function renderObject(){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(object.x, object.y, object.width, object.height);
}
function fun(){
    renderBanner();
    
    object.x += dx / 60 * speed;
    object.y += dy / 60 * speed;
    renderObject();
    
    requestAnimationFrame(fun);
}

requestAnimationFrame(fun);

//references 
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
// https://stackoverflow.com/questions/23585320/how-to-move-object-with-keyboard-in-javascript
// http://jsfiddle.net/medda86/y6WU9/
// https://stackoverflow.com/questions/10445410/getting-the-x-and-y-coordinates-for-a-div-element#:~:text=If%20the%20element%20is%20in,')%3B%20let%20Y%3Dwindow.





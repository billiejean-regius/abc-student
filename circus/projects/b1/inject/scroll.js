// credit to chinooooo
var innards = document.body.innerHTML;
document.body.innerHTML += innards;

$(window).scroll(function (e){
  if ($(document).height() < $(window).scrollTop() + $(window).height() * 10){
    document.body.innerHTML += innards;
  }
});

console.log("LindaisHEREEEEE!!!");
//bounding
let tags = document.getElementsByTagName("a");

function scrolled(){
  console.log("helloooo");
  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top
    };
  }
  // make red 
  for(let i = 0; i < tags.length; i++){
    if(tags[i].textContent != "" && getOffset(tags[i]).top != 0){
       tags[i].style.color = "red";
        //tags[i].innerHTML += getOffset(tags[i]).top;
    }
  
    if(getOffset(tags[i]).top < 400){
      console.log("i am done!");
      tags[i].innerHTML = "this is done";
    }
  }
  setTimeout(function(){
  window.scrollBy(0, 2);
  }, 10)
}


//document.addEventListener('click', scrolled);
setInterval(scrolled,100);


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





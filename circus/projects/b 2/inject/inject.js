let innards = document.body.innerHTML;
// let extractInnards = innards.innerHTML;

let webPages = document.createElement('div');
webPages.setAttribute('id', 'webPages');

let webPage01 = document.createElement('div');
webPage01.setAttribute('id', 'webPage01');
let webPage02 = document.createElement('div');
webPage02.setAttribute('id', 'webPage02');

webPages.append(webPage01, webPage02);

// webContent = [];

let gameIsPlaying = false;
let gameIsOver = false;

// CREATE GAME BANNER
let banner = document.createElement('div');
banner.setAttribute('id', 'gameBanner');
// CREATE FROG PLAYER
let froggy = document.createElement('div');
froggy.setAttribute('id', 'froggy');

const froggyIdle = document.createElement("img");
const froggyIdlepng = chrome.runtime.getURL("8bitfrog.png");
// froggyIdle.setAttribute("id", "froggyIdle");
froggyIdle.setAttribute("class", "froggyIcons");

const froggyLeft = document.createElement("img");
const froggyLeftpng = chrome.runtime.getURL("8bitfrog_left.png");
// froggyLeft.setAttribute("id", "froggyLeft");
froggyLeft.setAttribute("class", "froggyIcons");

const froggyRight = document.createElement("img");
const froggyRightpng = chrome.runtime.getURL("8bitfrog_right.png");
// froggyRight.setAttribute("id", "froggyLeft");
froggyRight.setAttribute("class", "froggyIcons");
// froggyLeft.setAttribute("background-image", froggyLeftpng);

// img.src = png;
froggyIdle.src = froggyIdlepng;
froggyLeft.src = froggyLeftpng;
froggyRight.src = froggyRightpng;

const frogAudio = document.createElement("audio");
const mp3 = chrome.runtime.getURL("frogFullClip.mp3");

frogAudio.src = mp3;
// frogAudio.controls = true;


document.body.insertBefore(frogAudio, document.body.firstElementChild);

// document.body.insertBefore(img, document.body.firstElementChild);

// CREATE TIME BANNER 
let timeBanner = document.createElement('div');
timeBanner.setAttribute('id', 'timeBanner');
timeBanner.setAttribute('class', 'pixel2');
// CREATE TIME BANNER 
const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom, 
  };
}
let sw = screen.width;
let sh = screen.height;

function isFroggyColliding(a, b) {
  return !(
      ((a.top + a.height) < (b.top)) || //froggy.top + froggy.height < tags.top
      (a.top > (b.top + b.height)) || //froggy.top > tags.top + tags.height
      ((a.left + a.width) < b.left) || //froggy.left + froggy.width < tags.left
      (a.left > (b.left + b.width)) //froggy.left > tags.left + tags.width
  );
} // https://codepen.io/mixal_bl4/pen/qZYWOm

const leftKey = "ArrowLeft";
const rightKey = "ArrowRight";
function probability(n) {
  return Math.random() < n;
}

window.onkeydown = function(event) {
  const keyCode = event.key;
  event.preventDefault();
  if(keyCode == "ArrowLeft") {
  if(probability(0.01)) {
    frogAudio.play();
    console.log("playing sound");
  }
    froggyRight.remove()
    froggyIdle.remove()
    froggy.insertBefore(froggyLeft, froggy.firstElementChild);
    // froggy.src = chrome.runtime.getURL('inject/assets/8bitfrog_left.png');
    // console.log("Left arrow")
    froggy.style.left = (froggy.offsetLeft + -10) + 'px';
  } else if(keyCode == "ArrowRight") {
    if(probability(0.01)) {
      frogAudio.play();
      console.log("playing sound");
    }
    froggyIdle.remove()
    froggyLeft.remove()
    froggy.insertBefore(froggyRight, froggy.firstElementChild);
    // froggy.style.backgroundImage = "url(chrome.runtime.getURL('inject/assets/8bitfrog_left.png');)";
    // console.log("Right arrow")
    froggy.style.left = (froggy.offsetLeft + 10) + 'px';
  }
}

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}, false;

let playButton = document.createElement('button');
playButton.setAttribute("id", "playButton");
playButton.setAttribute("class", "pixel2");
playButton.innerHTML = "pl" + "&#60" + "a" + "&#62" + "y";
// < &#60
// < &#62

setTimeout(function(){
  document.body.append(playButton);
}, 3000);

function playFrogger() {
  gameIsPlaying = true;

  document.getElementsByTagName("body")[0].innerHTML = "";
  // document.body.append(banner);
  // document.body.appendChild(timeBanner);
  
  document.body.append(banner, timeBanner, webPages);
  banner.appendChild(froggy);
  froggy.insertBefore(froggyIdle, froggy.firstElementChild);
  
  webPage01.innerHTML = innards;
  webPage02.innerHTML = innards;

  // get all tag elements 
  let tags = document.getElementsByTagName("a");
  // console.log(Array.from(document.getElementsByTagName("a")));
  // tagsArray = [];
  // console.log(tagsArray);

  let seconds = 70;
  let timer;

  let started = Date.now();
  let godModeTime = 11000;
  let intervalCount = 2;
  let maxInterval = 20;

  let countedInterval = setInterval(()=>{
    window.scrollBy(0, intervalCount);
    console.log("This is", intervalCount);
     if(intervalCount > maxInterval){
      clearInterval(countedInterval);
     } else {
      if(getOffset(webPage01).bottom < 0) {
        // webPages.parentNode.remove(webPage01);
        // webPage01.remove();
        webPage01.appendAfter(webPage02);
        console.log("Page removed and added below");
      } else if(getOffset(webPage02).bottom < 0) {
        webPage02.appendAfter(webPage01);
        console.log("web page two moved below");
      }

      a = getOffset(froggy);
      for (let i = 0; i < tags.length; i++) {
        tags[i].style.color = "red";
        tags[i].style.border = "1px solid red";
        let tagOffset = getOffset(tags[i]);
        // tagsArray.push(getOffset(tags[i]));
        b = tagOffset;
        // console.log(isFroggyColliding(a, b));
        if(Date.now() - started > godModeTime && isFroggyColliding(a, b)) {
            alert("Game is over now!");
            clearInterval(countedInterval);
            clearInterval(timer);
        }
      }
     }
  }, 100)

  // countdown timer function
    function gameTimer() {
      seconds--;
    // if(seconds >60 && seconds <= 70){
    //   timeBanner.innerHTML = "it is god mode";
    // }


    if(seconds >0 && seconds <= 70){
      // timeBanner.innerHTML = "NOW YOU HAVE "+ seconds +" LEFT";
      timeBanner.innerHTML = seconds + ":" + "00";
      // console.log("NOW YOU HAVE "+ seconds +" LEFT");
      if(seconds >60 && seconds <= 70){
          timeBanner.innerHTML = "ready?";
        }
      if(seconds > 40 && seconds <= 60){
        console.log("stage1")
        intervalCount =  4;
      } else if(seconds > 20 && seconds <= 40){
        console.log("stage2")
        intervalCount = 8;
      }else if(seconds > 0 && seconds <= 20){
        console.log("stage3")
        intervalCount = 14;
      }
    } else {
      clearInterval(timer);
    }
  }
  timer = window.setInterval(function() {
    gameTimer();
  }, 1000);
}
playButton.addEventListener("click", playFrogger);

//references 
// https://github.com/CjoewD/JavaScript-Frogger-Game
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
// https://stackoverflow.com/questions/23585320/how-to-move-object-with-keyboard-in-javascript
// http://jsfiddle.net/medda86/y6WU9/
// https://stackoverflow.com/questions/10445410/getting-the-x-and-y-coordinates-for-a-div-element#:~:text=If%20the%20element%20is%20in,')%3B%20let%20Y%3Dwindow.
// https://dustinpfister.github.io/2019/03/14/canvas-position/
// https://github.com/chjno/100days/tree/master/62_infinite_scroll
// https://stackoverflow.com/questions/2440377/javascript-collision-detection
// https://codepen.io/mixal_bl4/pen/qZYWOm


// Code no longer in use
//BEFORE THE PROJECT IS COMPLETE: (dont need this anymore but maybe for personal best scores?)
// 1: COMMENT THE CHROME STORAGE OUT
// 2: COMMENT CLEAR STORAGE IN TO RESET THE ARRAY
// chrome.storage.local.get({webContent: []}, (result) => {
//   // console.log(result.webContent);
//   let webContent = result.webContent;
//   webContent.push({innards: innards});
//     chrome.storage.local.set({webContent: webContent}, function () {
//       // you can use strings instead of objects
//       // if you don't  want to define default values
//       // chrome.storage.local.get('webContent', function (result) {
//       //     // console.log(result.webContent)
//       // });
//       chrome.storage.local.get('webContent', function (result) {
//         // document.getElementsByTagName("body")[0].innerHTML = "";
//         document.body.append(webPages);
//         // console.log(result.webContent[0].innards);
//         // webPage01.innerHTML = result.webContent[0].innards;
//         // webPage02.innerHTML = result.webContent[0].innards;
//         console.log(getOffset(webPage01));
//         console.log(getOffset(webPage01).top - getOffset(webPage01).height)
        
//       });
//   });
// });
// chrome.storage.local.clear(() => {
//   console.log('Everything was removed');
// }); //use this when the game is finished




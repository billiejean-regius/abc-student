// let display = document.getElementById("countDisplay")
// let button = document.getElementById("up");

// let count = 0;

// chrome.storage.sync.get(['myCount'], function(result) {
//   console.log('Value currently is ' + result.key);
//   count = result.count == undefined) {
//     count = 0;
//     chrome.storage.local.set({myCount: count})
//   }

// button.addEventListener("click", ()=> {
//   count++;
//   display.innerHTML = count;

//   //tell bkg script increased count
//   console.log("popup script: TELLING BGS about COUNT", count);
//   chrome.runtime.sendMessage({message: "count went up"});
// })


// //ask background for current count
// chrome.runtime.sendMessage({message: "remind me of the count"}, function(response) {
//   display.innerHTML = response.theCount;
//   count = response.theCount;
// });

//create calculator
// enter button triggers bug


let bugMessage = document.getElementById("bugged");
let calcBtn = document.getElementById("calcButton");
let answer = document.getElementById("answer");
let equal = document.getElementById('equal');

let count = 0; 

// button.addEventListener("click", ()=> {
//   count++;
//   display.innerHTML = count;
// });
let inputBtns = document.getElementsByClassName('inputValueButton');
console.log(inputBtns);





document.addEventListener('click', function handleClick(event) {
    thisValue = event.target.value;
    console.log("background script: GOT VALUE:", thisValue) 
  });

  //get calculation value => generate number of bugs?
  function preloadImage(url)
  {
      var img = new Image();
      img.src = "/test/example.jpg";
  }
  
let sw = screen.width;
let sh = screen.height;

  function getBugged(){
    for (let i = 0; i < thisValue ; i++) {
        (function(i) {
            setTimeout(function() {
                let ranX = Math.random()*sh;
                let ranY = Math.random()*sh;
                // let win1 = window.open("https://127.0.0.1:5500/abc-student/circus/mini-projects/04/popup/css/assets/index.html", "_blank", "width=500, height=500, left="+ranX+", top="+ranY);
        
            }, 3000 * i);
       
        })(i);
        
    }
}; 


equal.addEventListener("click", getBugged);
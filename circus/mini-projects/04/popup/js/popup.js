
let bugMessage = document.getElementById("bugged");
let calcBtn = document.getElementById("calcButton");
let answer = document.getElementById("answer");
let equal = document.getElementById('equal');


// button.addEventListener("click", ()=> {
//   count++;
//   display.innerHTML = count;
// });
let inputBtns = document.getElementsByClassName('inputValueButton');
console.log(inputBtns);

document.addEventListener('click', function handleClick(event) {
    thisValue = event.target.value;
    console.log("popup script: GOT VALUE:", thisValue) 
  });

var bugArray = [
    'css/assets/bugs/bug1.png', 
    'css/assets/bugs/bug2.png', 
    'css/assets/bugs/bug3.png', 
    'css/assets/bugs/bug4.png', 
    'css/assets/bugs/bug5.png', 
    'css/assets/bugs/bug6.png'
];

function randBug(bugArray) {
    return bugArray[Math.floor(Math.random()*bugArray.length)];
}

console.log(randBug(bugArray));



let sw = screen.width;
let sh = screen.height;

  function getBugged(){
    for (let i = 0; i < thisValue ; i++) {
        (function(i) {
            setTimeout(function() {
                let ranX = Math.random()*sh;
                let ranY = Math.random()*sh;
                // let win1 = window.open("https://127.0.0.1:5500/abc-student/circus/mini-projects/04/popup/css/assets/index.html", "_blank", "width=500, height=500, left="+ranX+", top="+ranY);
                let bug1 = window.open(randBug(bugArray), "_blank", "width=190, height=210, left="+ranX+", top="+ranY);
            }, 2000 * i);
       
        })(i);
        
    }
}; 


equal.addEventListener("click", getBugged);

// const calc = {
//     dispValue: '0',
//     firstInput: null,
//     waitForSecondInput: false,
//     operator: null,
//     };

// function updateCalcDisplay() {
//     const disp = document.querySelector('answer');
//     disp.value = calc.dispValue; 
// }
// updateCalcDisplay();


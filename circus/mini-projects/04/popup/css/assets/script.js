let swat = document.getElementById('swatBug');

function swatBug(){
    let chance = Math.random() * 100

    if (chance >= 0 && chance < 50) {
        alert("hi");
      }
      else if (chance >= 50 && chance <= 100) {
        alert("bye");
      }
    //if coackroach create two
    //% chance of kill
}; 

let displayBug = document.getElementById('displayBug');

// function preloadImg()
// {       
//     imbug = new Array();
//     // imbug[0] = "assets/bugs/bug1.png";
//     // imbug[1] = "css/assets/bugs/bug2.png";
//     // imbug[2] = "css/assets/bugs/bug3.png";
//     // imbug[3] = "css/assets/bugs/bug4.png";
//     // imbug[4] = "css/assets/bugs/bug5.png";
//     // imbug[5] = "css/assets/bugs/bug6.png";
   
//     // var i = 0;
//     for(i = 0; i < 6; i++) {
//         let image = new Image();
//         image.src = imbug[i];
//     }

    
//   }
//   preloadImg();'

// let image = document.createElement("img");
// image.src = chrome.runtime.getURL("css/assets/sbugs/bug1.jpg");
// displayBug.appendChild(image);

// var fullURL = chrome.runtime.getURL("bugs/bug1.png");
// console.log(fullURL);

// let test = chrome.extension.getURL('bugs/bug1.png');
// console.log(test);

document.addEventListener("DOMContentLoaded",function (){
  chrome.runtime.getURL("css/assets/bugs/bug");
});
  
  swat.addEventListener("click", swatBug);
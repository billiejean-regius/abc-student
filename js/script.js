let cardScale = 5.0;
let cardX = 5 * cardScale;
let cardY = 7 * cardScale;

console.log(cardX);
console.log(cardY);

let singleCard = document.getElementsByClassName('singleCard');
for (let i = 0; i < singleCard.length; i++) singleCard[i].setAttribute('id', i + 1);


let innerDiv = document.createElement('div');


        
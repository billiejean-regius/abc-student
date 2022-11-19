let sw = window.screen.availWidth; //screen.width;
let sh = window.screen.availHeight; //screen.height;

// window.screen.availWidth; 
// window.screen.availWidth; 

let cardWidth = 150
let cardHeight = 250

let handWidth = 225
let handHeight = 400

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      bottom: rect.bottom, 
    };
  };

//create elements
let card = document.createElement('div');
card.setAttribute('class', 'card');
card.setAttribute('id', 'card');

let hand = document.createElement('div');
hand.setAttribute('class', 'hand');
hand.setAttribute('id', 'hand');

let cardContainer = document.createElement('div');
cardContainer.setAttribute('id', 'cardContainer');

document.body.append(cardContainer);
cardContainer.append(hand, card);

card.style.width = cardWidth + 'px';
card.style.height = cardHeight + 'px';

hand.style.width = handWidth + 'px';
hand.style.height = handHeight + 'px';

// let dist = getOffset(hand).bottom - getOffset(card).bottom;
// let topOfCard = -(cardHeight + dist) + 'px';
// let topOfHand = -handHeight + 'px';

// hand.style.top = topOfHand;
// hand.style.setProperty("--topOfHand", topOfHand);
// hand.style.left = (sw * 0.5) - handWidth/2 + 'px';
hand.style.left = sw - 300 + 'px';


// card.style.top = topOfCard;
// card.style.setProperty("--topOfCard", topOfCard);
// card.style.left = (sw * 0.5) - cardWidth/2 + 'px';
card.style.left = getOffset(hand).left + ((handWidth - cardWidth)/2) + 'px';

// console.log(getOffset(hand).left)

// window.onresize = () => {
//     let sw = screen.width;
//     let sh = screen.height;

//     hand.style.left = sw - handWidth - 20 + 'px';
//     card.style.left = getOffset(hand).left + ((handWidth - cardWidth)/2) + 'px';
//   }

console.log(sw, sh)


const cards = document.querySelectorAll(".flip_card");

    function flipCard() {
    this.classList.toggle("flip");
    }
    cards.forEach((card) => card.addEventListener("click", flipCard));

// let random_card = new Array();  
//     random_card[0] = new Image();
//     random_card[0].src = 'tarot_01.png';

//     random_card[1] = new Image();
//     random_card[1].src = 'tarot_02.png';

//     random_card[2] = new Image();
//     random_card[2].src = 'tarot_03.png';

// let tarot01 = document.createElement("img");
// tarot01.src = 'tarot_01.png';
// let tarot02 = document.createElement("img");
// tarot02.src = 'tarot_01.png';
// let tarot03 = document.createElement("img");
// tarot03.src = 'tarot_01.png';

// let random_card = [
//     tarot01,
//     tarot02,
//     tarot03,
// ]

let random_card = new Array("tarot_01.png","tarot_02.png","tarot_03.png")

const getRandom = (random_card) => {
    return random_card[Math.floor(Math.random() * random_card.length)];
};

console.log(getRandom(random_card));
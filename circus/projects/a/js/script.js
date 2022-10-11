//////// NOTES

// state
// 0: out-of-play/destroyed/not-introduced
// 1: is somewhere in the game world but not found
// 2: had been handled by the player (taken then dropped)
// 3: is carried by the player

// rarity
// 0: common
// 1: uncommon 
// 2: rare
// 3: epic

//////// END NOTES

//////// GLOBAL VARIABLES
//////// END GLOBAL VARIABLES



class Item {
    constructor(name, state) {
        this.name = name;
        this.state = state;
    }
};
class Card extends Item { // extend: Card is a subclass of item 
    constructor (name, damage, state, rarity) {
        super(name, state); // super() refers to the parent class item. The arguments are fed into the parent item
        this.damage = damage; // do I need this?
        this.rarity = rarity;
    }
};
// class Deck extends Item { 
//     constructor(name, cards, state) {
//         super(name, state); 
//         this.cards = cards; 
//         this.common = common; 
//         this.uncommon = uncommon; 
//         this.rare = rare; 
//         this.epic = epic;
//     }
// };

// all collectible cards
const collectibles = [
    // creating card objects
    card01 = new Card ("card of death", 5, 1, 0),
    card02 = new Card ("two towers", 5, 1, 0),
    card03 = new Card ("lovers", 5, 1, 0),
    card04 = new Card ("king", 5, 1, 0),
    card05 = new Card ("queen", 5, 1, 0),
    card06 = new Card ("gates", 5, 1, 0),
    card07 = new Card ("name", 5, 1, 0),
    card08 = new Card ("thing", 5, 1, 0),
    card09 = new Card ("joker", 5, 1, 0),
    card10 = new Card ("jack", 5, 1, 0),
    card11 = new Card ("bridge", 5, 1, 1),
    card12 = new Card ("flower", 5, 1, 1),
    card13 = new Card ("test", 5, 1, 1),
    card14 = new Card ("ugh", 5, 1, 2),
    card15 = new Card ("okay", 5, 1, 3),
];

//card descriptions
card01.description = "Lorem ipsum";
card02.description = "something";
card03.description = "more random stuff";

// array for cards based on rarity 
// all common cards
var common = [];
// all uncommon cards
var uncommon = [];
// all rare cards
var rare = [];
// all epic cards
var epic = [];

// push to array based on rarity
for (let i of collectibles) {
    if (i.rarity == 0) {
        common.push(i.name);
    } else if (i.rarity == 1) {
        uncommon.push(i.name);
    } else if (i.rarity == 2) {
        rare.push(i.name);
    } else if (i.rarity == 3) {
        epic.push(i.name);
    }
}; 

// console.log(common);
// console.log(uncommon);
// console.log(rare);
// console.log(epic);

// var inventory = []; 
var cardCollection = []; 

// for (let i of collectibles) {
//     if (i.state == 3) {
//         cardCollection.push(i.name);
//     } 
// }; 

// console.log(inventory);
// console.log(cardCollection);

// document.getElementById("gachaCard").onclick = gachaCard;

let btn = document.getElementById("btn");
btn.addEventListener("click", gachaCard);

function gachaCard(name, state) {
    let random = collectibles[Math.floor(Math.random() * collectibles.length)];
    random.state = 3;
    cardCollection.push(random.name);
    console.log(random);
    console.log(cardCollection);
    // return random
};

console.log(collectibles)



// console.log(getNewCard());
console.log(cardCollection);

// Stringify 
// localStorage.setItem('cards', JSON.stringify(cardCollection));

// Parese after getting it
// JSON.parse(localStorage.getItem('cards'));
// console.log(JSON.parse(localStorage.getItem('cards')))

// function isLocalStorageAvailable(){
//     var test = 'test';
//     try {
//         localStorage.setItem(test, test);
//         localStorage.removeItem(test);
//         return true;
//     } catch(e) {
//         return false;
//     }
// }

// if(isLocalStorageAvailable()){
//     // available
// }else{
//     // unavailable
// }

 

//   console.log(cardStorage);

// function weightRarity(collectibles) {
//     var cumul = 100
//     var random = Math.floor(Math.random() * 100)
  
//     for(var i = 0; i < collectibles.length; i++) {
//       cumul -= collectibles[i].rarity
//       if (random >= cumul) {
//         return collectibles[i]
//       }
//     }
//   }

//   console.log(weightRarity(collectibles));


// for (let i of collectibles) {
//     if (i.state == 3) {
//         inventory.push(i.name);
//     } 
// }; 

// for each Card with a state equal to 3, push the Card name to inventory
// maybe use this same method to create "duplicates" or multiple quantities
// push an object into the cardDeck array if another is found

let btn = document.getElementById("button")

// if ( location.protocol != "https:" ) {
//     location.href = "https:" + window.location.href.substring( window.location.protocol.length );
// }
function permission () {
    // document.getElementById('doeSupported').innerText = 'asking';
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                document.getElementById('doeSupported').innerText = 'Yes!!';

                window.addEventListener('deviceorientation', (event) => {
                    document.getElementById("alpha").innerHTML = event.alpha;
                    document.getElementById("beta").innerHTML = event.beta;
                    document.getElementById("gamma").innerHTML = event.gamma;
                });
                window.addEventListener('devicemotion', (event) => {
                    // console.log(`${event.acceleration.x} m/s2`);
                    document.getElementById("acc_x").innerHTML = event.acceleration.x;
                    document.getElementById("acc_y").innerHTML = event.acceleration.y;


                });
            }
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
        document.getElementById('doeSupported').innerText = 'still no';
    }
}
btn.addEventListener( "click", permission );


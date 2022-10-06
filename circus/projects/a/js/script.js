// 0: out-of-play/destroyed/not-introduced
// 1: is somewhere in the game world but not found
// 2: had been handled by the player (taken then dropped)
// 3: is carried by the player

class Item {
    constructor(name, state) {
        this.name = name;
        this.state = state;
    }
};

// extend is a keyword to declare that the Card is a subclass of Item:
class Card extends Item {
    constructor (name, damage, state) {
        super(name, state); // super() refers to the parent class item. The arguments are fed into the parent item
        this.damage = damage;
    }
};
class Deck extends Item {
    constructor(name, cards, state) {
        super(name, state);
        this.cards = cards;
    }
};

var cardDeck = [
    card01 = new Card ("card of death", 5, 3),
    card02 = new Card ("two towers", 5, 1),
    card03 = new Card ("something", 5, 1),

];

card01.description = "Lorem ipsum";
card02.description = "something";
card03.description = "more random stuff";

var inventory = [];

for (let i of cardDeck) {
    if (i.state == 3) {
        inventory.push(i.name);
    }
};

console.log(inventory);

function countCards(obj) {
    let reply = 'Your ${obj.name} contains ';
    if (obj.cards) {
        reply = reply + '${obj.cards} cards';

    }
}
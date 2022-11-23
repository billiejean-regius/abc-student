const express = require('express');
const app = express()
const port = 3000

app.use(express.static('inject'));


// let random = riddles[Math.floor(Math.random() * riddles.length)];
// console.log(random.riddle);
function shuffle(riddles) {
    let currentIndex = riddles.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [riddles[currentIndex], riddles[randomIndex]] = [riddles[randomIndex], riddles[currentIndex]];
    }
    return riddles;
}
class Riddle {
    constructor(riddle, key) {
        this.riddle = riddle;
        this.key = key;
    }
};
let riddles = [
    ridd01 = new Riddle ("If you feed me, I will live, but if you make me drink, I will die. What am I?", "fire"),
    ridd02 = new Riddle ("I am wasted by a foolish man, spent by an average man, and invested by a wise man. Everyone succumbs to me. Who am I?", "time"),
    ridd03 = new Riddle ("You cannot enter this room. What room is it?", "mushroom"),
    ridd04 = new Riddle ("Names give the power to control, but what breaks by naming it?", "silence"),
];
shuffle(riddles);

app.get('/sendRiddles', (request, response) => {
    let query = request.query;
    let playerGuess = query.word;
    // let solved = riddles[0].key.includes(playerGuess);
    
    console.log(query.playerGuess.toLowerCase() == riddles[0].key, query.playerGuess, riddles[0].key);

    if (query.playerGuess.toLowerCase() == riddles[0].key){
        console.log("you shall pass");
        // response.redirect("/pass");
    } else {
        console.log("thrown into a volcanic pit");
        // response.redirect("/death");
    }     
});

app.get("/getRiddles", (request, response)=>{
    // console.log("someone asks for this info", riddles)
    // response.send("leonleon");
    response.json({data: riddles});
    // response.json({data: riddles, name: "jean"});
    // console.log(riddles[0], riddles[1]);
})

app.listen(port, () => {
    console.log(`Listening on http://localhost: ${port}`);
});


let clippy = document.createElement('div');
clippy.setAttribute('id', 'clippy');

let chatWithClippy = document.createElement('div');
chatWithClippy.setAttribute("id", "chatClient");
  
let inputForm = document.createElement('form');
inputForm.setAttribute("id", "inputForm");
  
let input = document.createElement('input');
input.setAttribute("type", "text");
input.setAttribute("placeholder", "What is your name");

let submit = document.createElement('input');
submit.setAttribute("type", "submit");

document.body.append(clippy, chatWithClippy);
  chatWithClippy.append(inputForm);
  inputForm.append(input, submit);

let inputValue = inputForm.innerHTML;
console.log(inputValue);


let nameKeys = [
  "william",
  "will",
  "william henry",
  "will henry",
  "william henry bray",
  "will henry bray",
  "william bray",
  "will bray",
];
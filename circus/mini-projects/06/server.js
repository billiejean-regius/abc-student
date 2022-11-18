const express = require('express');
const app = express()
const port = 3000

app.use(express.static('public'));


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

//define routers behaviors, what to return on which request
// "/"route
// app.get('/', (req, res) => {
//   res.send('Bye World!')
// })


// app.get('/inventory', (request, response) => {
//     console.log("This is your inventory");
//   });
let playerResponses = [];


app.get('/sendPlayerResponse', (request, response) => {

    let query = request.query;
    let playerResponse = query.word;
    // let solved = riddles[0].key.includes(playerGuess);
    
    console.log(query.playerResponse == riddles[0].key, query.playerResponse, riddles[0].key);

    playerResponses.push(query.playerResponse);
    console.log(playerResponses)
    if(playerResponses.length <= 1) {
        console.log("you shall pass");
        // response.redirect("/pass");
    // if (playerResponses.length > 1 && playerResponses[1] == riddles[0].key){
    //     console.log("you shall pass");
    //     // response.redirect("/pass");
    //     // if (query.playerResponse.toLowerCase() == riddles[1].key) {
    //     //     console.log("passed next riddle");
    //     //     // response.redirect("/pass");
    //     // }  
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

  // MY SOLUTION
// app.get('/sendRiddles', (request, response) => {
//     let query = request.query;
//     let playerGuess = query.word;
//     // let solved = riddles[0].key.includes(playerGuess);
    
//     console.log(query.playerGuess.toLowerCase() == riddles[0].key, query.playerGuess, riddles[0].key);

//     if (query.playerGuess.toLowerCase() == riddles[0].key){
//         console.log("you shall pass");
//         // response.redirect("/pass");
//     } else {
//         console.log("thrown into a volcanic pit");
//         // response.redirect("/death");
//     }     
// });

// app.get("/getRiddles", (request, response)=>{
//     // console.log("someone asks for this info", riddles)
//     // response.send("leonleon");
//     response.json({data: riddles});
//     // response.json({data: riddles, name: "jean"});
//     // console.log(riddles[0], riddles[1]);
// })

app.listen(port, () => {
    console.log(`Listening on http://localhost: ${port}`);
});
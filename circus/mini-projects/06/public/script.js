let riddleInput = document.getElementById("input");
let button = document.getElementById("button");
let displayRiddle = document.getElementById("displayRiddle");
let startButton = document.getElementById("startGame");

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('optionButtons')
const optionsInputElement = document.getElementById('optionInput')


let shuffledRiddles = [];
// console.log(shuffledRiddles);
let playerResponses = [];

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  if(textNode.riddle == 1) {
    console.log("State your riddle Brigekeeper");
    textElement.innerText = textNode.text + shuffledRiddles[0].riddle;
  } else if(textNode.riddle == 2) {
    console.log("State your second riddle Brigekeeper");
    textElement.innerText = textNode.text + shuffledRiddles[1].riddle;
  } else {
    textElement.innerText = textNode.text
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
 
  // for each option create a button
  // only show options where the required state is met
  // if an input is required, show input if relevant option is selected
  // store input, move to the next textnode 
  textNode.options.forEach(option => { 
    if (showOption(option)) {
      // create a button for each option
      const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        optionButtonsElement.appendChild(button)
        // console.log(option.input); 
        // console.log(option.input == null);
      button.addEventListener('click', () => selectOption(option));
    }
  })
}
function showOption(option) { // checking if there is a required state
  return option.requiredState == null || option.requiredState(state) 
}
// I think I want to say something like: 
// if the option contains an input requirement, 
// append the inputs => get the input and then
// go to the next node


function selectOption(option) {
  const nextTextNodeId = option.nextText
  // if ()
  if (nextTextNodeId <= 0) { // -1 restarts the node sequence 
    return startGame()
  } 
  if(option.input) {
    console.log("An input is required");
    const optionInput = document.createElement('input');
    const optionSubmit = document.createElement('button');
    optionInput.value = option.input
    optionSubmit.innerHTML = option.submit;
      optionButtonsElement.style.display = "none";
      optionsInputElement.style.display = "block";
      optionsInputElement.innerHTML = ""; // clear the div field
    optionsInputElement.append(optionInput, optionSubmit);

    optionSubmit.addEventListener("click", ()=>{
      let playerResponse = optionInput.value;
      console.log("player response:", playerResponse);
      playerResponses.push(playerResponse);
      // console.log(playerResponses[1]);
      //send this value to the server!
      let request = "sendPlayerResponse?playerResponse=" + playerResponse;
      fetch(request);
      optionSubmit.value = "";
      state = Object.assign(state, option.setState)
      showTextNode(nextTextNodeId) // show the next node
      optionButtonsElement.style.display = "block";
      optionsInputElement.style.display = "none";

      console.log(playerResponses.length)
      if(playerResponses.length == 2 && playerResponses[1] != shuffledRiddles[0].key ) {
        console.log("This is wrong");
      }
    });
  } else {
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId) // show the next node
  }
}



 // ask server for data
 fetch("getRiddles").then((responseFromServer)=>{
  return responseFromServer.json();
}).then((gotRiddles)=>{
//this is a shuffled array
//  console.log(gotRiddles.data);
let riddles = gotRiddles.data;
  riddles.forEach(riddle=>{
    shuffledRiddles.push(riddle);
    // console.log(JSON.stringify(riddle.riddle));
  })
}); 

function showData(){
  console.log(shuffledRiddles[0].riddle)
}
document.addEventListener("click", showData)

const textNodes = [
  {
    id: 1,
    text: 'Bridgekeeper: "What… is your name?"',
    options: [
      {
        text: 'Speak your name',
        input: "What is your name?",
        submit: '"My name is..."',
        nextText: 2
      },
      {
        text: 'Remain silent',
        nextText: -1
      }
    ]
  },
  {
    id: 2,
    text: 'Bridgekeeper: ',
    riddle: 1,
    options: [
      {
        text: 'You reply "..."',
        input: "Type your answer here",
        submit: '"..."',
        nextText: 3
      },
      {
        text: '"How am I to know?"',
        nextText: -1
      }
    ]
  },
  {
    id: 3,
    text: 'Bridgekeeper: "That... is "',
    options: [
      {
        text: 'You reply "..."',
        nextText: 4
      },
      {
        text: '"How am I to know?"',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'Bridgekeeper:',
    riddle: 2,
    options: [
      {
        text: 'You reply "..."',
        input: "Type your answer here",
        submit: '"..."',
        nextText: 4
      },
      {
        text: '"How am I to know?"',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Bridgekeeper: You may pass',
    riddle: 2,
    options: [
      {
        text: 'Cross the bridge',
        nextText: 4
      },
      {
        text: '"Jump into the valcano"',
        nextText: -1
      }
    ]
  },
]

console.log(textNodes[0].options[0].input)

startButton.addEventListener("click", startGame);


// console.log(textNodes[0].text);

// displayRiddle.innerHTML = textNodes[0].text;
// let name = riddleInput.value;

// console.log(name);



// MY WORKING SOLUTION
// ask server for data
// fetch("getRiddles").then((responseFromServer)=>{
//     return responseFromServer.json();
// }).then((shuffledRiddles)=>{
//     // console.log(processRiddles)
//     console.log(shuffledRiddles.data) //this is a shuffled array
//     // let shuffledRiddles = processRiddles.data;
//     // console.log(shuffledRiddles);
//     displayRiddle.innerHTML = "";
//     displayRiddle.innerHTML = shuffledRiddles.data[0].riddle;
// })

// button.addEventListener("click", ()=>{
//     let playerGuess = riddleInput.value;
//     console.log("player guess:", playerGuess)
    
//     //send this value to the server!
//     let request = "sendRiddles?playerGuess="+playerGuess;
//     fetch(request);
//     // window.location.href = "/riddle?word=" + playerGuess;
//     //  let request = "riddle?key=" + playerGuess;
//     //  fetch(request);
//     riddleInput.value = "";
// });

// Bridgekeeper: Stop. Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.

// You:  Ask me the questions, bridgekeeper. I am not afraid.

// Bridgekeeper: What… is your name?

// You: Name

// Bridgekeeper: [random array of riddles]

// riddles:
// If you feed me, I will live, but if you make me drink, I will die. What am I? Fire.
// I am wasted by a foolish man, spent by an average man, and invested by a wise man. Everyone succumbs to me. Who am I? Time.
// You cannot enter this room. What room is it? Mushroom.
// Names give the power to control, but what breaks by naming it? Silence.

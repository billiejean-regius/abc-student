let nameKeys = [
  "william",
  "will",
  "william henry",
  "will henry",
  // "william henry bray",
  // "will henry bray",
  // "william bray",
  // "will bray",
];

let verify = [
  
];

let clippy = document.createElement('div');
clippy.setAttribute('id', 'clippy');

let chatWithClippy = document.createElement('div');
chatWithClippy.setAttribute("id", "chatClient");
  
// let inputForm = document.createElement('form');
// inputForm.setAttribute("id", "inputForm");
  
let input = document.createElement('input');
input.setAttribute("type", "text");
input.setAttribute("placeholder", "What is your first name?");

let submit = document.createElement('button');
submit.setAttribute("id", "submit");
submit.innerHTML = "submit";

document.body.append(clippy, chatWithClippy);
  chatWithClippy.append(input, submit);
  // inputForm.append(input, submit);


submit.addEventListener("click", getInput);

function getInput() {
  let inputValue = input.value;
  let inputCase = inputValue.toLowerCase();
  console.log(inputCase);

  // if(nameKeys === nameKeys[0] || nameKeys === nameKeys[0]) {
  //   console.log("This is william");
  // }

  // first check, but with only will or william
  if(nameKeys.includes(inputCase)) {
    console.log("The input value matches");
    if(inputCase === nameKeys[0] || inputCase === nameKeys[1]) {
      if(inputCase === nameKeys[0]) {
        //william
        console.log("William, is it?");
      } else {
        //will
        console.log("Will, is it?");
      }
    } else {
      console.log("he entered his middle name")
    }
  } else { // wrong
    console.log("This gift is not for you")
  }

  // if(inputValue === nameKeys[0] || nameKeys[1]) {
    //   console.log("This is " + inputValue);
    //   console.log("but can I trust you are the right will?")
    // } else if(nameKeys.includes(inputValue) && inputValue === nameKeys[2] || nameKeys[3] || nameKeys[4] || nameKeys[5] || nameKeys[6] || nameKeys[7]) { // enters a detailed name so more trusting
    //   console.log("Gave a more detailed name")
    // } 

  
}






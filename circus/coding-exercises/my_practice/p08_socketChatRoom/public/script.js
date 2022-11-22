console.log("beans are cool");

//we can use a socket.io code because the library has been included
let socket = io(); 

let nameBox = document.getElementById('name');
let chatBox = document.getElementById('chat');
let messageBox = document.getElementById('message');
let sendButton = document.getElementById('send');

console.log(nameBox);


sendButton.addEventListener("click", () => {
    console.log("clicked");
})
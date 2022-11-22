console.log("beans are cool");

//we can use a socket.io code because the library has been included
let socket = io(); 

let nameBox = document.getElementById('name');
let chatBox = document.getElementById('chat');
let messageBox = document.getElementById('message');
let sendButton = document.getElementById('send');


sendButton.addEventListener("click", () => {
    console.log("clicked");
    let name = nameBox.value;
    console.log(name)
    if(name.trim() == "") {
        name = "anonymous";
    }
    let message = messageBox.value;
    console.log(message);
    if(message != "") {
        //send name and message to server
        let data = {name: name, message: message}
        socket.emit('message', data);
        console.log(data);
    }
    messageBox.value = "";
})

socket.on("incoming", (data) => {
    console.log(data);
    let name = data.name;
    let message = data.message;
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerHTML = "<span class='sender'>" + name + ":</span>" + message;
    li.appendChild(p);
    chatBox.appendChild(li);
})
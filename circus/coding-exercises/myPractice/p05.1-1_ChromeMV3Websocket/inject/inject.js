// <button type="submit" id="test">Click to test</button>

let socket = io("https://websocketmmo.glitch.me"); // "https://abc-socket-hackathon.glitch.me"

let connectButton = document.createElement('button');
connectButton.setAttribute("id", "connectButton");
connectButton.innerHTML = "Click to Connect";

let disconnectButton = document.createElement('button');
disconnectButton.setAttribute("id", "disconnectButton");
disconnectButton.innerHTML = "Click to Disconnect";

let sendMessage = document.createElement('button');
sendMessage.setAttribute("id", "sendMessage");
sendMessage.innerHTML = "Send Message";

document.body.append(connectButton, disconnectButton, sendMessage);
disconnectButton.style.display = "none";
sendMessage.style.display = "none";


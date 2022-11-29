// <button type="submit" id="test">Click to test</button>

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

// function toggleVisibility() {
//     let elem = document.getElementById("myDIV");
//     if (elem.style.display === "none") {
//         elem.style.display = "block";
//     } else {
//         elem.style.display = "none";
//     }
// }

const extension = {
    count: 0,
    disconnected: false,
    port: 3000,
    ws: null,
  };
  
//   let test = document.getElementById('test');
  connectButton.addEventListener('click', async () => {
    extension.ws = WebSocketClient();
    extension.ws.connect();

    disconnectButton.style.display = "block";
    sendMessage.style.display = "block";
    connectButton.style.display = "none";
});

function WebSocketClient() {
let instance = null;
const connect = () => {
    return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.getUniqueID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };

    ws.id = ws.getUniqueID();
    console.log(`New client connected with id: ${ws.id}`);
    //ws.sendText("test");

    
    
    const onOpen = () => {
        instance = ws;
        console.log('###websocket:connected', instance);
        ws.send('it works!');
        return resolve(ws);
    };

    const onError = (event) => {
        console.log('###INIT-FAILED', event);
        ws.close(1000, 'closing due to unknown error');
        return reject('failed to connect to websocket');
    };

    const onClose = () => {
        console.log('###websocket:disconnected');
        instance = null;
        // reconnect is happening in the alarm callback
    };

    const onMessage = () => {

    }
    

    disconnectButton.addEventListener('click', async () => {
        ws.close();
        instance = null;
        console.log(`Client ${ws.id} has disconnected!`);
        ws.clients.forEach(function each(client) {
        });
        
        disconnectButton.style.display = "none";
        connectButton.style.display = "block";
    });

    sendMessage.addEventListener('click', () => {
        ws.onmessage = ({data}) => {
            console.log(`Client ${ws.id}: ${data}`);
            ws.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(`${data}`);
                }
            });
        };
    });

    ws.onopen = onOpen;
    //ws.onerror = onError;
    ws.onclose = onClose;
    });
    
};

const getInstance = () => {
    return instance;
};

return {
    connect,
    getInstance,
};
}


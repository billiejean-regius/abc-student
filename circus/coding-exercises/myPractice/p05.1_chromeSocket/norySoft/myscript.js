let connection;

document.getElementById("id_connect").onclick = () => {
  connection = new WebSocket("ws://localhost:8080/");
};

document.getElementById("id_send").onclick = () => {
  connection.send("hoge");
};

document.getElementById("id_close").onclick = () => {
  connection.close();
};
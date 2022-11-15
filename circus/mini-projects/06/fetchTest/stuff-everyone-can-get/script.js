console.log("IM HERE");
let input = document.getElementById("input");
let button = document.getElementById("button");
let logData = document.getElementById("logData");

logData.addEventListener("click", ()=>{
    //ask server for data
    fetch("getData").then((responseFromServer)=>{
        return responseFromServer.json();
    })
    .then((processData)=> {
        console.log(processData);
    })
});
button.addEventListener("click", ()=>{
     let data = input.value;
     console.log(data);
     //send this value to the server!
     let request = "sendData?data="+data;
     fetch(request);

     input.value = "";
})
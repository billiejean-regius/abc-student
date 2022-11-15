const express = require('express');
const app = express()
const port = 3000


let collectedData = [];

app.use(express.static('stuff-everyone-can-get'));

app.get("/sendData", (req, res) => {
    console.log("got new data")
    let info = req.query;
    let newData = info.data;
    console.log(info);
    collectedData.push(newData);
    console.log(collectedData);
    // res.sendFile("special.html")
})

app.get("/getData", (req, res) => {
    console.log("someone asked for this info")
    res.json({data: collectedData, name: "jean"});
})

app.listen(port, () => {
    console.log('Example app listening on port ${port')
})
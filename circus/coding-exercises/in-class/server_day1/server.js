const express = require('express')
const app = express()
const port = 3000


// different routes: url/something/something

app.get('/', (req, res) => {
  res.send('Bye World!')
})

app.get('/swimmingpool', (req, res) => {
    res.send('~~~~~~~~~~')
  })

  app.get('/treehouse', (req, res) => {
    res.sendFile(__dirname+"/treehouse/index.html")
  })

  console.log("What is", __dirname)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

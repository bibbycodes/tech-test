const express = require('express')
const app = express()
const port = 3100

app.enable('trust proxy')

app.get('/api/users', (req, res) => {
    res.json([{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"}])
})

app.get('/api/unknown', (req, res) => {
  res.status(404).json({"error":"not found","status":404})
})

app.get('/index', (req, res) => {
  res.status(200).sendFile('./fixtures/index.html', {root: __dirname })
})
  
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use(function(err, req, res, next) {
  res.send(404, { error: 'Not Found' });
})
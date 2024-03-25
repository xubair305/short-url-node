const express = require('express')
const app = express()

const urlRoute = require('./routes/url')

app.use(express.json()) // for parsing application/json

app.use(urlRoute)

const URL = require('./models/url')
const {connectDb} = require('./connect')

const port = 3001
connectDb("mongodb://127.0.0.1:27017/short-url");
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Short-URL app listening on port ${port}!`))
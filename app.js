const express = require('express')
const app = express()

const path =  require('path')
const port = 3001

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for  parsing application/x-www-form-url

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


const urlRoute = require('./routes/url')
const staticRouter = require('./routes/static_router')
const {connectDb} = require('./connect')

connectDb("mongodb://127.0.0.1:27017/short-url");

// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/', staticRouter)
app.use('/r', urlRoute)


app.listen(port, () => console.log(`Short-URL app listening on port ${port}!`))
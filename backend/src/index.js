const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const routers = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)
setupWebsocket(server)

mongoose.connect('mongodb://localhost:27017/week10', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use(routers)

server.listen(3333)

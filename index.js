const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()


var account = require('./routes/account')

mongoose.connect('mongodb://localhost/auth', function(err, db){
  if(err){
    console.log('db conn failed')
    return
  }
  console.log('db conn success')
})

// app set up

app.use(morgan('combined'))
app.use(bodyParser.json({type: 'application/json'}))


app.use('/', account)

//server setup

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, function(){
  console.log('server listening on port '+port)
})

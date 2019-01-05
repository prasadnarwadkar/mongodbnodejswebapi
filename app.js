"use strict";
const express = require('express')
const heroesService  = require('./services/heroesService')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

var port = process.env.PORT || 1337;

app.post('/api/addHero', function (req, res) {
  let heroesServiceObj = new heroesService(req, res)
  heroesServiceObj.addHero()
})

app.post('/api/updateHero', function (req, res) {
  let heroesServiceObj = new heroesService(req, res)
  heroesServiceObj.updateHero()
})

app.get('/api/getHero', function (req, res) {
  let heroesServiceObj = new heroesService(req, res)
  heroesServiceObj.getHero()
})

app.listen(port, function () {
  console.log('Heroes Web app service listening on port '+ port+ '!')
})
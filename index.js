/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */
const PORT = 3484;
var http = require('http');
var express = require('express');
var appServer = express();
var server = http.Server(appServer);
var apiai = require("apiai")
var app = apiai("33371b1bd65149429018582c7b7f8b6b");
var options = {
    sessionId: '1134225d-519b-4ce2-b389-0033b129dbba'
};

appServer.get('/', function (req, res) {
  console.log("Nhan ban tin GET");
})
//---------
appServer.post('/', function (req, res) {
  console.log("Nhan ban tin POST");
  console.log(req);
})

server.listen(process.env.PORT || PORT);

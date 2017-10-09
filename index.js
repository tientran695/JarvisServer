'use strict';
const PORT = 3484;

var express = require('express');
const bodyParser = require('body-parser');

var appServer = express();

appServer.use(bodyParser.urlencoded({
    extended: true
}));

appServer.use(bodyParser.json());

appServer.post('/echo', function(req, res) {
    var device = req.body.result.parameters.device;
    var location = req.body.result.parameters.location;
    var state = req.body.result.parameters.state;
    console.log(device);
    console.log(location);
    console.log(state);
    // return res.json({
    //     speech: req,
    //     displayText: req,
    // });
});

appServer.listen(process.env.PORT || PORT);

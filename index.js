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
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.device ? req.body.result.parameters.device : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
    });
});

appServer.listen(process.env.PORT || PORT);

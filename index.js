/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */
const PORT = 3484;
var http = require('http');
// var apiai = require("../module/apiai");
var apiai = require("apiai")

var app = apiai("33371b1bd65149429018582c7b7f8b6b");

var server = http.createServer(function(request, response) {
    if (request.method = 'POST' && request.url == '/upload') {
        // var outStream = fs.createWriteStream('qwe.wav');
        var voiceRequest = app.voiceRequest();

        voiceRequest.on('response', function(_response) {
            response.end(JSON.stringify(_response));
            // var json = JSON.stringify({'resolvedQuery': _response['result']['resolvedQuery']})
            // response.end(json);
        });

        voiceRequest.on('error', function(error) {
            console.log(error);
            response.end();
        });

        request.on('data', function(chunk) {
            voiceRequest.write(chunk);
        });

        request.on('end', function() {
            voiceRequest.end();
        });
    } else {
        response.writeHead(code, {});
        response.end();
    }

    console.log(request.headers);
});

server.listen(process.env.PORT || PORT);

// cat ann_smith.wav | curl -v -X POST --data-binary @- -H "Transfer-Encoding: chunked" -H "Content-Type: audio/wav" http://localhost:8000/upload

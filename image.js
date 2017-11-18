var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

//Mang luu dia chi cac file
var arrayImage = new Array();
fs.readdir("image/", function(err, files){
  if(err){
    return;
  }else{
    files.forEach(function(f){
      arrayImage.push("image/" + f)
    })
  }
})

io.sockets.on('connection', function(client){
  console.log("Co nguoi ket noi!");

  client.on('GETIMAGE', function(data){
    fs.readFile(getRandomFileName(arrayImage), function(err, data){
      if(!err){
        io.emit('SERVER',data);
        console.log('Da gui hinh');
      }else{
        console.log('That bai');
      }
    })
  })
})

//Ham random mot phan tu trong mang
function getRandomFileName(array){
  return array[Math.floor(Math.random()*array.length)];
}

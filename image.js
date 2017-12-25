var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var mongoose = require('mongoose');
server.listen(process.env.PORT || 3000);

//CSDL MogoDB
let options = {
  db: {native_parser: true},
  server: {poolSize: 5},
  user: 'tientran695',
  pass: 'familyofme36'
};
var mongoUri = 'mongodb://tientran695:familyofme36@ds141175.mlab.com:41175/iot';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, options).then(
  () => {
    console.log("Connect DB successfully");
  },
  err => {
    console.log('Connect failed. Error: ${err}');
  }
);
var userSchema = new mongoose.Schema({
  username: String,
  pass: String
});
var db = mongoose.model('users', userSchema);

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
        io.emit('SERVER SEND IMAGE',data);
        console.log('Da gui hinh');
      }else{
        console.log('That bai');
      }
    })
  })

  client.on("LOGIN", function(user){
    let name = user.username;
    let pass = user.pass;
    db.find({username : name, pass : pass}, function(err, user){
      if(user.length == 1){
        io.emit("SERVER SEND LOGIN", {isLogin : true});
      }else{
        io.emit("SERVER SEND LOGIN", {isLogin : false});
      }
    })
  })

})

//Ham random mot phan tu trong mang
function getRandomFileName(array){
  return array[Math.floor(Math.random()*array.length)];
}

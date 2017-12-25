var PORT = 3000;
var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var appServer = express();


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
//db.create({username: "tientran695", pass: "123456"});
// db.find().exec((err, users) => {
//   console.log(users);
// })
var name = "tientran695";
var pass = "123456";
db.find({username : name, pass : pass}, function(err, user){
  //console.log(err);
  console.log(user);
})

appServer.use(bodyParser.urlencoded({
    extended: true
}));
appServer.use(bodyParser.json());
appServer.post('/echo', function(req, res) {
    var device = req.body.result.parameters.device;
    var location = req.body.result.parameters.location;
    var state = req.body.result.parameters.state;
    //update on mongodb
    //.................
});

appServer.listen(process.env.PORT || PORT);

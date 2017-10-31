var express = require('express');
const bodyParser = require('body-parser');

var appServer = express();

//mongodb
var mongoose = require('mongoose');
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
)

const userSchema = new mongoose.Schema({
  device: String,
  location: String,
  state: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const db = mongoose.model('Status', userSchema)
//-----------------------------------------------------


appServer.use(bodyParser.urlencoded({
    extended: true
}));

appServer.use(bodyParser.json());

appServer.post('/echo', function(req, res) {
    var device = req.body.result.parameters.device;
    var location = req.body.result.parameters.location;
    var state = req.body.result.parameters.state;
    //update on mongodb
    db.create({
      device: device,
      location: location,
      state: state
    })

    console.log(device);
    console.log(location);
    console.log(state);
});

appServer.listen(process.env.PORT);

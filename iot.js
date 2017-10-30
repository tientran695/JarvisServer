var mongoose = require('mongoose');

let options = {
  db: {native_parser: true},
  server: {poolSize: 5},
  user: 'tientran695',
  pass: 'familyofme36'
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tientran695:familyofme36@ds141175.mlab.com:41175/iot', options).then(
  () => {
    console.log("Connect DB successfully");
  },
  err => {
    console.log('Connect failed. Error: ${err}');
  }
)

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  date: {
    type: Date,
    default: Date.now
  }
})

const user = mongoose.model('infomation', userSchema)

// user.create({
//   name: "tien",
//   age: 23
// })

user.find().exec((err, users) => {
  console.log(users);
})

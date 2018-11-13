var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var AthleteSchema = new mongoose.Schema({
    coach: {
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
  },
  activity: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: String,
    required: false,
  },
  sport: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  active: {
    type: String,
    required: false,
  },
});


var Athlete = mongoose.model('Athlete', AthleteSchema);
module.exports = Athlete;


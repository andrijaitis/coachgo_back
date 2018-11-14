const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var AthleteSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    email: {
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


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var BasketballSchema = new mongoose.Schema({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true
      },
    mpg: {
        type: Number,
        required: true,
  },
    fg: {
        type: Number,
        required: true,
  },
  threep: {
        type: Number,
        required: true,
  },
  ft: {
        type: Number,
        required: true,
  },
  ppg: {
        type: Number,
        required: true,
  },
  rpg: {
        type: Number,
        required: true,
  },
  apg: {
        type: Number,
        required: true,
  },
  bpg: {
        type: Number,
        required: true,
  },
  trainingdate: {
        type: Date,
        required: true,
  },
  
});


var Basketball = mongoose.model('Basketball', BasketballSchema);
module.exports = Basketball;


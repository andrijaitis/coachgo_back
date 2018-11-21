const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var FootballSchema = new mongoose.Schema({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true
      },
      creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          aerialswon: {
        type: Number,
        required: true,
  },
  assists: {
        type: Number,
        required: true,
  },
  goals: {
        type: Number,
        required: true,
  },
  mins: {
        type: Number,
        required: true,
  },
  motm: {
        type: Number,
        required: true,
  },
  red: {
        type: Number,
        required: true,
  },
  spg: {
        type: Number,
        required: true,
  },
  yel: {
        type: Number,
        required: true,
  },
  trainingdate: {
        type: Date,
        required: true,
  },
  training: {
        type: String,
        required: false,
  },
  
});


var Football = mongoose.model('Football', FootballSchema);
module.exports = Football;


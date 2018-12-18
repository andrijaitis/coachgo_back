const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var SwimmingSchema = new mongoose.Schema({
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

   
  time: {
        type: Number,
        required: true,
  },
  rounds: {
        type: Number,
        required: true,
  },
  technique: {
        type: String,
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


var Swimming = mongoose.model('Swimming', SwimmingSchema);
module.exports = Swimming;


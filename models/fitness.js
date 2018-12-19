const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var FitnessSchema = new mongoose.Schema({
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
    squats: {
        type: Number,
        required: true,
  },
  pull: {
        type: Number,
        required: true,
  },
  push: {
        type: Number,
        required: true,
  },
  kmr: {
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
  notes: {
      type: String,
      required: false,
},
done: {
      type: String,
      required: false,
},
equipment: {
      type: String,
      required: false,
},
  
});


var Fitness = mongoose.model('Fitness', FitnessSchema);
module.exports = Fitness;


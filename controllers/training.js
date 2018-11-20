
const Athlete = require('../models/athlete');
const User = require('../models/user');
const Basketball = require('../models/basketball');
const { validationResult } = require('express-validator/check');


// exports.createTraining = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error('Validation failed, entered data is incorrect.');
//       error.statusCode = 422;
//       throw error;
//     }
// console.log(req.body);
    
//   };



exports.createTraining = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const basketball = new Basketball({
        athlete: req.body.id,
        mpg: req.body.mpg,
        fg: req.body.fg,
        threep: req.body.threep,
        ft: req.body.ft,
        ppg: req.body.ppg,
        rpg: req.body.rpg,
        apg: req.body.apg,
        bpg: req.body.bpg,
        trainingdate: req.body.trainingdate,
    });
    basketball
      .save()
      .then(result => {
        
        return User.findById(req.userId);
      })
      .then(user => {
      
       return Athlete.findById(req.body.id)
      })
      .then(athlete => {
        athlete.trainings.push(basketball);
        return athlete.save();
      })
      .then(result => {
        res.status(201).json({
          message: 'Athlete created successfully!',
          basketball: basketball,
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };


// exports.getAthletes = (req, res, next) => {

//   console.log(req.userId);

//   Athlete.find({ 'creator': req.userId })
//     .then(athletes => {
//       res.status(200).json(athletes);
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };




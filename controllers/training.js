
const Athlete = require('../models/athlete');
const User = require('../models/user');
const Basketball = require('../models/basketball');
const Fitness = require('../models/fitness');
const Football = require('../models/football');
const Swimming = require('../models/swimming');
const { validationResult } = require('express-validator/check');



  //   const fitness = new Fitness({
  //       athlete: req.body.id,
  //       creator: req.userId,
  //       squats: req.body.squats,
  //       pull: req.body.pull,
  //       push: req.body.push,
  //       kmr: req.body.kmr,
  //       trainingdate: req.body.trainingdate,
  //       training: req.body.training,

exports.createTrainingBasket = (req, res, next) => {
  const errors = validationResult(req);
  const trainingType = req.body.training;
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const basketball = new Basketball({
    athlete: req.body.id,
    creator: req.userId,
    mpg: req.body.mpg,
    fg: req.body.fg,
    threep: req.body.threep,
    ft: req.body.ft,
    ppg: req.body.ppg,
    rpg: req.body.rpg,
    apg: req.body.apg,
    bpg: req.body.bpg,
    trainingdate: req.body.trainingdate,
    training: req.body.training,
  });
  const fitness = new Fitness({
    athlete: req.body.id,
    creator: req.userId,
    squats: req.body.squats,
    pull: req.body.pull,
    push: req.body.push,
    kmr: req.body.kmr,
    trainingdate: req.body.trainingdate,
    training: req.body.training,
  });
  const swimming = new Swimming({
    athlete: req.body.id,
    creator: req.userId,
    technique: req.body.technique,
    rounds: req.body.rounds,
    time: req.body.time,
    technique: req.body.technique,

    trainingdate: req.body.trainingdate,
    training: req.body.training,
  });
  const football = new Football({
    athlete: req.body.id,
    creator: req.userId,
    mpg: req.body.mpg,
    mins: req.body.mins,
    goals: req.body.goals,
    assists: req.body.assists,
    yel: req.body.yel,
    red: req.body.red,
    spg: req.body.spg,
    aerialswon: req.body.aerialswon,
    motm: req.body.motm,
    trainingdate: req.body.trainingdate,
    training: req.body.training,
  });
  let newTraining = basketball;
  if (trainingType === 'fitness') {
    newTraining = fitness;
  } else if (trainingType === 'football') {
    newTraining = football;
  
  } else if (trainingType === 'swimming') {
    newTraining = swimming;
  }

  Athlete.findById(req.body.id)
    .then(athlete => {
      athlete.trainings.push(newTraining);
      return athlete.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Athlete created successfully!',
        training: newTraining,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getTrainings = (req, res, next) => {
  Basketball.find({  'creator': req.userId})
    .then(trainings => {
      res.status(200).json(trainings);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllTrainings = (req, res, next) => {
  
  Basketball.find({ 'creator': req.userId})
    .then(trainings => {
      res.status(200).json(trainings);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



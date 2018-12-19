
const Athlete = require('../models/athlete');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');



exports.createAthlete = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    // const title = req.body.title;
    // const content = req.body.content;
    let creator;
    const athlete = new Athlete({
        creator: req.userId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        height: req.body.height,
        dateCreated: 123,
        sport: req.body.sport,
        phone:req.body.phone,
        active: req.body.active,
        gender: req.body.gender
    });
    athlete
      .save()
      .then(result => {
        
        return User.findById(req.userId);
      })
      .then(user => {
          console.log(req.userId)
        creator = user;
        user.athletes.push(athlete);
        return user.save();
      })
      .then(result => {
        res.status(201).json({
          message: 'Athlete created successfully!',
          athlete: athlete,
          creator: { _id: creator._id, name: creator.firstName }
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

exports.getAthletes = (req, res, next) => {

  console.log(req.userId);

  Athlete.find({ 'creator': req.userId })
    .then(athletes => {
      res.status(200).json(athletes);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteAthlete = (req, res, next) => {
  const athleteId = req.params.athleteId;
  Athlete.findById(athleteId)
    .then(athlete => {
      if (!athlete) {
        const error = new Error('Could not find athlete.');
        error.statusCode = 404;
        throw error;
      }
      if (athlete.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      console.log('mofo remowed');
      return Athlete.findByIdAndRemove(athleteId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.athletes.pull(athleteId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted athlete.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getAthlete = (req, res, next) => {
  const athleteId = req.params.athleteId;
  Athlete.findById(athleteId)
    .then(athlete => {
      if (!athlete) {
        const error = new Error('Could not find athlete.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json( athlete );
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateAthlete = (req, res, next) => {
  console.log(req.body);
  const athleteId = req.params.athleteId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const height = req.body.height;
  const sport = req.body.sport;
  const phone = req.body.phone;
  const active = req.body.active;
  const gender = req.body.gender;

 
  Athlete.findById(athleteId)
    .then(athlete => {
      if (!athlete) {
        const error = new Error('Could not find athlete.');
        error.statusCode = 404;
        throw error;
      }
      if (athlete.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      athlete.email = email;
      athlete.firstName = firstName;
      athlete.lastName = lastName;
      athlete.age = age;
      athlete.height = height;
      athlete.sport = sport;
      athlete.phone = phone;
      athlete.active = active;
      athlete.gender = gender;
      return athlete.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Athlete updated!', athlete: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};




exports.athleteInjury = (req, res, next) => {
  console.log(req.body);
  const athleteId = req.params.athleteId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
 
  const injury = req.body.injury;
 
  Athlete.findById(athleteId)
    .then(athlete => {
      if (!athlete) {
        const error = new Error('Could not find athlete.');
        error.statusCode = 404;
        throw error;
      }
      if (athlete.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      athlete.injuries.push({type:injury.type,description:injury.description,activity:injury.activity});
      return athlete.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Athlete updated!', athlete: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTraining = (req, res, next) => {
  const athleteId = req.params.athleteId;

  const _id = req.body._id;

  Athlete.findById(athleteId)
  .then(athlete => {
    if (!athlete) {
      const error = new Error('Could not find athlete.');
      error.statusCode = 404;
      throw error;
    }
    if (athlete.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    const training = athlete.trainings.shift( training => training._id == _id );
    athlete.trainings.push(req.body)
    athlete.save();

      return training
  })
  .then(training => {
   
    res.status(200).json({ message: 'Athlete trainings updated!', training: training });
  })



  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });


};


exports.getinjured = (req, res, next) => {

  console.log(req.userId);

  Athlete.find({ 'creator': req.userId })
    .then(athletes => {
      // console.log(athletes[2].injuries.length)
     const injuryResults= []
      for (var i = 0; i < athletes.length; i++) {
        injuryResults.push({
          firstName: athletes[i].firstName,
          numberOfIjuries: athletes[i].injuries.length
        });
      }

      
      res.status(200).json(injuryResults);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
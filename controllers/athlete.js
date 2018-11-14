
const Athlete = require('../models/athlete');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

// exports.createAthlete = (req, res, next) => {
//     newAthlete = {
//         creator: req.userId,
//         email: req.body.email,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age,
//         height: 'undefined',
//         dateCreated: req.body.dateCreated,
//         sport: req.body.sport,
//         phone:'undefined',
//         active: 'false'
//     }
//       Athlete.create(newAthlete, function (error, athlete) {
//         athlete => {
//             console.log('hello');
//             user.athlete.push(athlete);
//             user.save();
//         }
//        });
//       return res.json({ status: true });
//   };


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
        height: 'undefined',
        dateCreated: req.body.dateCreated,
        sport: req.body.sport,
        phone:req.body.phone,
        active: 'false'
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

// exports.getAthletes = (req, res, next) => {
//     return res.send([{
//       id: '1',
//       email: 'bybis@dd.t',
//       activity: 'Football',
//       firstName: 'Hansas',
//       lastName: 'Andersenas',
//       age: '24',
//       height: '181',
//       dateCreated: '20140313T00:00:00',
//       sport: 'football',
//       phone: '123456',
//       active: 'true'
//     },
//     {
//       id: '2',
//       email: 'hans@gmail.com',
//       activity: 'Basketball',
//       firstName: 'Endeman',
//       lastName: 'Skrautenwagen',
//       age: '32',
//       height: '200',
//       dateCreated: '20140313T00:00:00',
//       sport: 'Basketball',
//       phone: '84654',
//       active: 'false'
//     },
//     {
//       id: '2',
//       email: 'hans@gmail.com',
//       activity: 'Cricket',
//       firstName: 'Mantas',
//       lastName: 'Lopas',
//       age: '32',
//       height: '200',
//       dateCreated: '20140313T00:00:00',
//       sport: 'Basketball',
//       phone: '84654',
//       active: 'false'
//     }]);
//   }

exports.getAthletes = (req, res, next) => {

  Athlete.find()
    .then(athletes => {
      res.status(200).json({
        message: 'Fetched athletes successfully.',
        athletes: athletes,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
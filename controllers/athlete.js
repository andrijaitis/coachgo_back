
const Athlete = require('../models/athlete');

exports.createAthlete = (req, res, next) => {
    newAthlete = {
        userId: req.userId,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        height: 'undefined',
        dateCreated: req.body.dateCreated,
        sport: req.body.sport,
        phone:'undefined',
        active: 'false'
    }
      Athlete.create(newAthlete, function (error, athlete) {
       });
      return res.json({ status: true });
  };


exports.getAthletes = (req, res, next) => {
    return res.send([{
      id: '1',
      email: 'bybis@dd.t',
      activity: 'Football',
      firstName: 'Hansas',
      lastName: 'Andersenas',
      age: '24',
      height: '181',
      dateCreated: '20140313T00:00:00',
      sport: 'football',
      phone: '123456',
      active: 'true'
    },
    {
      id: '2',
      email: 'hans@gmail.com',
      activity: 'Basketball',
      firstName: 'Endeman',
      lastName: 'Skrautenwagen',
      age: '32',
      height: '200',
      dateCreated: '20140313T00:00:00',
      sport: 'Basketball',
      phone: '84654',
      active: 'false'
    },
    {
      id: '2',
      email: 'hans@gmail.com',
      activity: 'Cricket',
      firstName: 'Mantas',
      lastName: 'Lopas',
      age: '32',
      height: '200',
      dateCreated: '20140313T00:00:00',
      sport: 'Basketball',
      phone: '84654',
      active: 'false'
    }]);
  }
var express = require('express');
var router = express.Router();
var Athlete = require('../models/athlete');
const isAuth = require('../middleware/isAuth');

router.post('/athlete', isAuth, function (req, res) {
  
    newAthlete = req.body;
      Athlete.create(newAthlete, function (error, athlete) {
   
    });
  
    return res.json({ status: true });
  });
  
  router.get('/athletes', isAuth, function (req, res) {
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
      firstName: 'Roplys',
      lastName: 'Lopas',
      age: '32',
      height: '200',
      dateCreated: '20140313T00:00:00',
      sport: 'Basketball',
      phone: '84654',
      active: 'false'
    }]);
  });

  module.exports = router;